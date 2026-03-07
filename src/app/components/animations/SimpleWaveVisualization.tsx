/**
 * SimpleWaveVisualization - 2D animated sine wave for health metrics
 * Smooth, minimalist oscillating line visualization
 */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SimpleWaveVisualizationProps {
  /**
   * Height of the canvas in pixels (width uses full page width)
   * @default 200
   */
  height?: number;

  /**
   * Wave color (CSS color or hex)
   * @default '#ffffff' (white)
   */
  strokeColor?: string;

  /**
   * Frequency of oscillation in Hz
   * @default 1
   */
  frequency?: number;

  /**
   * Show grid overlay
   * @default true
   */
  showGrid?: boolean;

  /**
   * CSS class for additional styling
   */
  className?: string;
}

export function SimpleWaveVisualization({
  height = 200,
  strokeColor = '#ffffff',
  frequency = 1,
  showGrid = true,
  className = '',
}: SimpleWaveVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const lineRef = useRef<THREE.Line | null>(null);
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const centerY = height / 2;
    const amplitude = height * 0.3;

    // Initialize Three.js
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // Transparent

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

    // Create grid overlay if enabled
    if (showGrid) {
      const gridGeometry = new THREE.BufferGeometry();
      const gridPoints: number[] = [];
      const gridSpacingX = 40;
      const gridSpacingY = 30;

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSpacingY) {
        gridPoints.push(0, y, 0);
        gridPoints.push(width, y, 0);
      }

      // Vertical lines
      for (let x = 0; x <= width; x += gridSpacingX) {
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

    // Generate smooth sine wave
    const generateWave = (offset: number): Float32Array => {
      const points: number[] = [];

      for (let x = 0; x < Math.ceil(width); x++) {
        const t = (offset + x) / (width / (frequency * Math.PI * 2));
        const y = centerY + Math.sin(t) * amplitude;
        points.push(x, y, 0);
      }

      return new Float32Array(points);
    };

    // Create line geometry
    const lineGeometry = new THREE.BufferGeometry();
    const initialPoints = generateWave(0);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(initialPoints, 3));

    // Create line material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(strokeColor),
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });

    const line = new THREE.Line(lineGeometry, lineMaterial);
    lineRef.current = line;
    scene.add(line);

    // Animation loop with faster scrolling
    const scrollSpeed = 2; // Increased from 0.5 to 2 for faster movement
    const animate = () => {
      timeRef.current += scrollSpeed;

      const newPoints = generateWave(timeRef.current);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(newPoints, 3));
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle resize
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
  }, [height, strokeColor, frequency, showGrid]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}
