/**
 * ECGVisualization - 2D animated ECG visualization using Three.js
 * Renders a continuous scrolling ECG waveform with realistic cardiac signal
 * Can be used as a full-width background decoration
 */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ECGVisualizationProps {
  /**
   * Height of the canvas in pixels (width uses full page width)
   * @default 300
   */
  height?: number;

  /**
   * Heart rate in BPM (affects scroll speed)
   * @default 72
   */
  heartRate?: number;

  /**
   * Stroke color (CSS color or hex)
   * @default '#00ffaa' (neon green)
   */
  strokeColor?: string;

  /**
   * CSS class for additional styling
   */
  className?: string;

  /**
   * Show grid overlay
   * @default true
   */
  showGrid?: boolean;
}

export function ECGVisualization({
  height = 300,
  heartRate = 72,
  strokeColor = '#00ffaa',
  className = '',
  showGrid = true,
}: ECGVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const lineRef = useRef<THREE.Line | null>(null);
  const offsetRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;

    // Initialize Three.js scene with transparent background
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // Transparent background
    scene.fog = null;

    const camera = new THREE.OrthographicCamera(0, width, 0, height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, // Enable transparency
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent
    containerRef.current.appendChild(renderer.domElement);

    // Create grid overlay if enabled
    if (showGrid) {
      const gridGeometry = new THREE.BufferGeometry();
      const gridPoints: number[] = [];
      const gridSpacing = 40;

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSpacing) {
        gridPoints.push(0, y, 0);
        gridPoints.push(width, y, 0);
      }

      // Vertical lines
      for (let x = 0; x <= width; x += gridSpacing) {
        gridPoints.push(x, 0, 0);
        gridPoints.push(x, height, 0);
      }

      gridGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(gridPoints), 3));

      const gridMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0x1a4d4d),
        transparent: true,
        opacity: 0.15,
        linewidth: 0.5,
      });

      const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
      scene.add(grid);
    }

    // Generate ECG waveform with major variation across viewport
    const generateECGSegment = (startX: number): Float32Array => {
      const points: number[] = [];
      const baselineY = height / 2;
      const timeWindow = Math.ceil(width);
      const samplesPerSecond = 500;
      const cycleDuration = 60 / heartRate;
      const cycleTimeWindow = cycleDuration * samplesPerSecond;

      // Define beat generation with major variations for 3 distinct shapes
      const generateBeat = (phase: number, shapeIndex: number): number => {
        const baselineY_offset = baselineY;
        
        // Shape 1: Normal heartbeat (shapeIndex 0)
        // Shape 2: Exaggerated heartbeat (shapeIndex 1)
        // Shape 3: Subtle heartbeat (shapeIndex 2)
        const shapeFactor = [1, 1.6, 0.6][shapeIndex] || 1;
        
        if (phase < 0.1) {
          return baselineY_offset;
        } else if (phase < 0.15) {
          const ph = (phase - 0.1) / 0.05;
          const pWaveAmp = 15 * shapeFactor;
          return baselineY_offset - Math.sin(ph * Math.PI) * pWaveAmp;
        } else if (phase < 0.20) {
          return baselineY_offset;
        } else if (phase < 0.22) {
          const ph = (phase - 0.20) / 0.02;
          const qWaveAmp = 10 * shapeFactor;
          return baselineY_offset + Math.sin(ph * Math.PI) * qWaveAmp;
        } else if (phase < 0.30) {
          const ph = (phase - 0.22) / 0.08;
          const qrsAmp = 100 * shapeFactor;
          if (ph < 0.3) {
            return baselineY_offset - (ph / 0.3) * qrsAmp;
          } else if (ph < 0.7) {
            return baselineY_offset - qrsAmp;
          } else {
            return baselineY_offset - ((1 - ph) / 0.3) * qrsAmp;
          }
        } else if (phase < 0.42) {
          const ph = (phase - 0.30) / 0.12;
          const tWaveAmp = 25 * shapeFactor;
          return baselineY_offset - Math.sin(ph * Math.PI) * tWaveAmp;
        } else {
          return baselineY_offset;
        }
      };

      for (let x = 0; x < timeWindow; x++) {
        const wrappedOffset = startX % cycleTimeWindow;
        const t = (wrappedOffset + x) / samplesPerSecond;
        const cyclePhase = (t % cycleDuration) / cycleDuration;
        
        // Create 3 distinct regions across the viewport
        const shapeIndex = Math.floor((x / timeWindow) * 3) % 3;
        
        const y = generateBeat(cyclePhase, shapeIndex);
        points.push(x, y, 0);
      }

      return new Float32Array(points);
    };

    // Create initial line geometry
    const lineGeometry = new THREE.BufferGeometry();
    const initialPoints = generateECGSegment(0);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(initialPoints, 3));

    // Create neon glow material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(strokeColor),
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
    });

    const line = new THREE.Line(lineGeometry, lineMaterial);
    lineRef.current = line;
    scene.add(line);

    // Animation loop
    const scrollSpeed = (heartRate / 72) * 0.8;
    const animate = () => {
      offsetRef.current += scrollSpeed;

      const newPoints = generateECGSegment(offsetRef.current);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(newPoints, 3));
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && renderer) {
        const newWidth = containerRef.current.clientWidth;
        renderer.setSize(newWidth, height);
        camera.right = newWidth;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
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
  }, [height, heartRate, strokeColor, showGrid]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}
