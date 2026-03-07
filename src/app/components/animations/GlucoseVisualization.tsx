/**
 * GlucoseVisualization - 2D animated glucose level chart using Three.js
 * Shows a daily glucose pattern cycling from fasting baseline through post-meal spike and decline
 */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GlucoseVisualizationProps {
  /**
   * Height of the canvas in pixels (width uses full page width)
   * @default 300
   */
  height?: number;

  /**
   * Loop duration in seconds
   * @default 8
   */
  loopDuration?: number;

  /**
   * CSS class for additional styling
   */
  className?: string;

  /**
   * Show reference zones
   * @default true
   */
  showReferenceZones?: boolean;
}

export function GlucoseVisualization({
  height = 300,
  loopDuration = 8,
  className = '',
  showReferenceZones = true,
}: GlucoseVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const lineRef = useRef<THREE.Line | null>(null);
  const fillRef = useRef<THREE.Mesh | null>(null);
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;

    const minGlucose = 60;
    const maxGlucose = 200;
    const rangeGlucose = maxGlucose - minGlucose;

    // Map glucose value to canvas Y position
    const glucoseToY = (glucose: number): number => {
      const normalized = (glucose - minGlucose) / rangeGlucose;
      return height * 0.1 + normalized * height * 0.8; // Padding top and bottom
    };

    // Initialize Three.js
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // Transparent background

    const camera = new THREE.OrthographicCamera(0, width, 0, height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent
    containerRef.current.appendChild(renderer.domElement);

    // Draw reference zones
    if (showReferenceZones) {
      // Safe zone (70-140 mg/dL) - green
      const safeZoneY1 = glucoseToY(70);
      const safeZoneY2 = glucoseToY(140);
      const safeGeometry = new THREE.BufferGeometry();
      safeGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array([
            0, safeZoneY1, 0,
            width, safeZoneY1, 0,
            width, safeZoneY2, 0,
            0, safeZoneY2, 0,
          ]),
          3,
        ),
      );
      const safeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x90ee90),
        transparent: true,
        opacity: 0.1,
      });
      const safeZone = new THREE.Mesh(safeGeometry, safeMaterial);
      scene.add(safeZone);

      // Safe zone border lines
      const safeLineGeometry = new THREE.BufferGeometry();
      safeLineGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array([0, safeZoneY1, 0, width, safeZoneY1, 0, 0, safeZoneY2, 0, width, safeZoneY2, 0]),
          3,
        ),
      );
      const safeLineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0x228b22),
        transparent: true,
        opacity: 0.3,
        linewidth: 1,
      });
      const safeLines = new THREE.LineSegments(safeLineGeometry, safeLineMaterial);
      scene.add(safeLines);

      // Warning zone (>140 mg/dL) - red
      const warningZoneY = glucoseToY(140);
      const warningGeometry = new THREE.BufferGeometry();
      warningGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array([
            0, warningZoneY, 0,
            width, warningZoneY, 0,
            width, glucoseToY(maxGlucose), 0,
            0, glucoseToY(maxGlucose), 0,
          ]),
          3,
        ),
      );
      const warningMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff6b6b),
        transparent: true,
        opacity: 0.08,
      });
      const warningZone = new THREE.Mesh(warningGeometry, warningMaterial);
      scene.add(warningZone);

      // Warning zone border line
      const warningLineGeometry = new THREE.BufferGeometry();
      warningLineGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array([0, warningZoneY, 0, width, warningZoneY, 0]), 3),
      );
      const warningLineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0xff0000),
        transparent: true,
        opacity: 0.3,
        linewidth: 1,
      });
      const warningLines = new THREE.Line(warningLineGeometry, warningLineMaterial);
      scene.add(warningLines);
    }

    // Draw Y-axis with labels (hidden for clean visualization)
    const axisGeometry = new THREE.BufferGeometry();
    axisGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        new Float32Array([
          40, height * 0.1, 0,
          40, height * 0.9, 0,
          40, height * 0.1, 0,
          30, height * 0.1 + 10, 0,
          40, height * 0.1, 0,
          50, height * 0.1 + 10, 0,
        ]),
        3,
      ),
    );
    const axisMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x333333),
      transparent: true,
      opacity: 0, // Hidden for clean visualization
      linewidth: 1,
    });
    const axis = new THREE.LineSegments(axisGeometry, axisMaterial);
    scene.add(axis);

    // Generate glucose curve using Catmull-Rom interpolation
    const generateGlucoseCurve = (progress: number): Float32Array => {
      const points: number[] = [];
      const numSegments = Math.ceil(width);

      // Define key points in the glucose pattern
      const glucosePattern = [
        { x: 0, glucose: 85 }, // Fasting baseline
        { x: 0.15, glucose: 95 }, // Slight rise
        { x: 0.35, glucose: 160 }, // Post-meal spike
        { x: 0.5, glucose: 145 }, // Declining
        { x: 0.75, glucose: 100 }, // Further decline
        { x: 0.95, glucose: 80 }, // Back to baseline
        { x: 1.0, glucose: 85 }, // Loop point
      ];

      for (let i = 0; i < numSegments; i++) {
        const xNorm = ((i / numSegments + progress) % 1.0); // Looping progress
        const scaledX = xNorm * width;

        // Find surrounding pattern points
        let glucose = 85;
        for (let j = 0; j < glucosePattern.length - 1; j++) {
          const p1 = glucosePattern[j];
          const p2 = glucosePattern[j + 1];

          if (xNorm >= p1.x && xNorm <= p2.x) {
            // Linear interpolation between points
            const t = (xNorm - p1.x) / (p2.x - p1.x);
            glucose = p1.glucose + (p2.glucose - p1.glucose) * t;
            break;
          }
        }

        const y = glucoseToY(glucose);
        points.push(scaledX, y, 0);
      }

      return new Float32Array(points);
    };

    // Create line geometry
    const lineGeometry = new THREE.BufferGeometry();
    const initialCurve = generateGlucoseCurve(0);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(initialCurve, 3));

    // Create line material with cobalt blue
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x1a3cff),
      linewidth: 3,
      transparent: true,
      opacity: 1,
    });

    const line = new THREE.Line(lineGeometry, lineMaterial);
    lineRef.current = line;
    scene.add(line);

    // Create filled area under the curve
    const createFillArea = (curvePoints: Float32Array) => {
      const fillPoints: number[] = [];

      // Add curve points
      for (let i = 0; i < curvePoints.length; i += 3) {
        fillPoints.push(curvePoints[i], curvePoints[i + 1], curvePoints[i + 2]);
      }

      // Add baseline points (reversed)
      const baselineY = glucoseToY(minGlucose);
      for (let i = curvePoints.length - 3; i >= 0; i -= 3) {
        fillPoints.push(curvePoints[i], baselineY, curvePoints[i + 2]);
      }

      const fillGeometry = new THREE.BufferGeometry();
      fillGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(fillPoints), 3));

      // Create triangle strip for fill
      const indices: number[] = [];
      const numPoints = curvePoints.length / 3;
      for (let i = 0; i < numPoints - 1; i++) {
        indices.push(i, i + 1, numPoints + i + 1);
        indices.push(i + 1, numPoints + i, numPoints + i + 1);
      }

      fillGeometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));

      const fillMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x1a3cff),
        transparent: true,
        opacity: 0.1,
      });

      return new THREE.Mesh(fillGeometry, fillMaterial);
    };

    let fill = createFillArea(initialCurve);
    fillRef.current = fill;
    scene.add(fill);

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016 / loopDuration; // Increment by frame / loop duration
      if (timeRef.current > 1) timeRef.current = 0;

      // Update curve
      const newCurve = generateGlucoseCurve(timeRef.current);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(newCurve, 3));
      lineGeometry.attributes.position.needsUpdate = true;

      // Update fill
      if (fill) {
        scene.remove(fill);
        fill.geometry.dispose();
        fill.material.dispose();
      }
      fill = createFillArea(newCurve);
      fillRef.current = fill;
      scene.add(fill);

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [height, loopDuration, showReferenceZones]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}
