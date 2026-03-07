/**
 * NutrientRadar - 2D animated radial/spider chart visualizing nutrient concentration levels
 * Shows fluctuating nutrient indices with smooth polygon morphing
 */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NutrientRadarProps {
  /**
   * Size of the radar chart in pixels
   * @default 500
   */
  size?: number;

  /**
   * Height for full-width visualization
   * @default 400
   */
  height?: number;

  /**
   * Loop duration in seconds
   * @default 10
   */
  loopDuration?: number;

  /**
   * CSS class for additional styling
   */
  className?: string;
}

export function NutrientRadar({
  size = 500,
  height = 400,
  loopDuration = 10,
  className = '',
}: NutrientRadarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const polygonRef = useRef<THREE.Mesh | null>(null);
  const timeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || size;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;

    // Nutrient data
    const nutrients = [
      { name: 'Iron', color: 0xc97b7b }, // Terracotta
      { name: 'Vitamin D', color: 0x9aba9a }, // Sage green
      { name: 'Calcium', color: 0xd4a574 }, // Dusty gold
      { name: 'B12', color: 0x6b7ea8 }, // Slate blue
      { name: 'Omega-3', color: 0xb89968 }, // Warm brown
    ];

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

    // Draw radial grid (concentric circles)
    const gridGeometry = new THREE.BufferGeometry();
    const gridPoints: number[] = [];
    const numCircles = 3;
    const numSegments = 64;

    for (let c = 1; c <= numCircles; c++) {
      const r = (radius / numCircles) * c;
      for (let i = 0; i <= numSegments; i++) {
        const angle = (i / numSegments) * Math.PI * 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        gridPoints.push(x, y, 0);
      }
    }

    gridGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(gridPoints), 3));
    const gridMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xcccccc),
      transparent: true,
      opacity: 0.15,
      linewidth: 1,
    });
    const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(gridLines);

    // Draw axis spokes
    const axisGeometry = new THREE.BufferGeometry();
    const axisPoints: number[] = [];

    for (let i = 0; i < nutrients.length; i++) {
      const angle = (i / nutrients.length) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      axisPoints.push(centerX, centerY, 0);
      axisPoints.push(x, y, 0);
    }

    axisGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(axisPoints), 3));
    const axisMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xaaaaaa),
      transparent: true,
      opacity: 0.3,
      linewidth: 1,
    });
    const axisLines = new THREE.LineSegments(axisGeometry, axisMaterial);
    scene.add(axisLines);

    // Draw nutrient labels with colored dots
    nutrients.forEach((nutrient, idx) => {
      const angle = (idx / nutrients.length) * Math.PI * 2;
      const labelDist = radius * 1.15;
      const labelX = centerX + labelDist * Math.cos(angle);
      const labelY = centerY + labelDist * Math.sin(angle);

      // Create label canvas
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 120;
      labelCanvas.height = 40;
      const ctx = labelCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, 120, 40);

        // Colored dot
        ctx.fillStyle = `#${nutrient.color.toString(16).padStart(6, '0')}`;
        ctx.beginPath();
        ctx.arc(8, 20, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label text
        ctx.font = '11px Georgia, serif';
        ctx.fillStyle = `#${nutrient.color.toString(16).padStart(6, '0')}`;
        ctx.fillText(nutrient.name, 18, 24);
      }

      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const labelGeometry = new THREE.PlaneGeometry(120, 40);
      const labelMaterial = new THREE.MeshBasicMaterial({
        map: labelTexture,
        transparent: true,
      });
      const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
      labelMesh.position.set(labelX, labelY, 0.5);
      scene.add(labelMesh);
    });

    // Center title
    const titleCanvas = document.createElement('canvas');
    titleCanvas.width = 200;
    titleCanvas.height = 60;
    const titleCtx = titleCanvas.getContext('2d');
    if (titleCtx) {
      titleCtx.fillStyle = 'transparent';
      titleCtx.fillRect(0, 0, 200, 60);
      titleCtx.font = 'bold 18px Georgia, serif';
      titleCtx.fillStyle = '#666666';
      titleCtx.textAlign = 'center';
      titleCtx.fillText('Nutrition', 100, 20);
      titleCtx.fillText('Panel', 100, 42);
    }

    const titleTexture = new THREE.CanvasTexture(titleCanvas);
    const titleGeometry = new THREE.PlaneGeometry(200, 60);
    const titleMaterial = new THREE.MeshBasicMaterial({
      map: titleTexture,
      transparent: true,
    });
    const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
    titleMesh.position.set(centerX, centerY, 0.5);
    scene.add(titleMesh);

    // Generate polygon with pulsing values
    const generatePolygon = (progress: number): Float32Array => {
      const points: number[] = [];

      nutrients.forEach((nutrient, idx) => {
        const angle = (idx / nutrients.length) * Math.PI * 2;
        // Oscillate between 0.6 and 1.0 (60% to 100% of max)
        const oscillation = 0.6 + 0.4 * Math.sin(progress * Math.PI * 2);
        const r = radius * oscillation;

        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        points.push(x, y, 0);
      });

      return new Float32Array(points);
    };

    // Create polygon geometry
    const polygonGeometry = new THREE.BufferGeometry();
    const initialPoints = generatePolygon(0);
    polygonGeometry.setAttribute('position', new THREE.BufferAttribute(initialPoints, 3));

    // Create indices for polygon fill
    const indices: number[] = [];
    for (let i = 1; i < nutrients.length - 1; i++) {
      indices.push(0, i, i + 1);
    }
    polygonGeometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));

    // Create polygon material with fill
    const polygonMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x9aba9a),
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });

    const polygon = new THREE.Mesh(polygonGeometry, polygonMaterial);
    polygonRef.current = polygon;
    scene.add(polygon);

    // Create polygon outline
    const outlineGeometry = new THREE.BufferGeometry();
    const outlineIndices: number[] = [];
    for (let i = 0; i < nutrients.length; i++) {
      outlineIndices.push(i, (i + 1) % nutrients.length);
    }
    outlineGeometry.setAttribute('position', new THREE.BufferAttribute(initialPoints, 3));
    outlineGeometry.setIndex(new THREE.BufferAttribute(new Uint32Array(outlineIndices), 1));

    const outlineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x888888),
      transparent: true,
      opacity: 0.5,
      linewidth: 2,
    });

    const outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    scene.add(outline);

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016 / loopDuration;
      if (timeRef.current > 1) timeRef.current = 0;

      // Update polygon
      const newPoints = generatePolygon(timeRef.current);
      polygonGeometry.setAttribute('position', new THREE.BufferAttribute(newPoints, 3));
      polygonGeometry.attributes.position.needsUpdate = true;

      outlineGeometry.setAttribute('position', new THREE.BufferAttribute(newPoints, 3));
      outlineGeometry.attributes.position.needsUpdate = true;

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
      polygonGeometry.dispose();
      outlineGeometry.dispose();
      gridGeometry.dispose();
      polygonMaterial.dispose();
      outlineMaterial.dispose();
      gridMaterial.dispose();
      axisMaterial.dispose();
      renderer.dispose();
    };
  }, [height, loopDuration]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}
