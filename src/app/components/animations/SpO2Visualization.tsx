/**
 * SpO2Visualization - 2D animated SpO₂ (blood oxygen saturation) chart using Three.js
 * Renders a continuous looping plethysmography waveform with pulsing indicator
 */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SpO2VisualizationProps {
  /**
   * Height of the canvas in pixels (width uses full page width)
   * @default 300
   */
  height?: number;

  /**
   * Respiratory rate in breaths per minute
   * @default 15
   */
  respiratoryRate?: number;

  /**
   * Current SpO₂ percentage (95-100)
   * @default 98
   */
  spO2Value?: number;

  /**
   * CSS class for additional styling
   */
  className?: string;

  /**
   * Show reference line at 95% threshold
   * @default true
   */
  showThresholdLine?: boolean;
}

export function SpO2Visualization({
  height = 300,
  respiratoryRate = 15,
  spO2Value = 98,
  className = '',
  showThresholdLine = true,
}: SpO2VisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const lineRef = useRef<THREE.Line | null>(null);
  const pulseGroupRef = useRef<THREE.Group | null>(null);
  const offsetRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const minSpO2 = 0.95; // 95%
    const maxSpO2 = 0.99; // 99%
    const centerSpO2 = (minSpO2 + maxSpO2) / 2;
    const rangeSpO2 = maxSpO2 - minSpO2;

    // Initialize Three.js scene with transparent background
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;
    scene.fog = null;

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

    // Create reference line at 95% threshold
    if (showThresholdLine) {
      const lineGeometry = new THREE.BufferGeometry();
      const lineY = height - (minSpO2 - minSpO2) / rangeSpO2 * (height * 0.8);
      const linePoints = [
        0, lineY, 0,
        width, lineY, 0,
      ];
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePoints), 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0xff4d6d),
        transparent: true,
        opacity: 0.2,
        linewidth: 1,
      });

      // Create dashed line with shader or using a repeating dash pattern
      const dashGeometry = new THREE.BufferGeometry();
      const dashPoints: number[] = [];
      const dashLength = 20;
      const gapLength = 10;

      for (let x = 0; x < width; x += dashLength + gapLength) {
        dashPoints.push(x, lineY, 0);
        dashPoints.push(Math.min(x + dashLength, width), lineY, 0);
      }

      dashGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(dashPoints), 3));
      const dashMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0xff4d6d),
        transparent: true,
        opacity: 0.2,
        linewidth: 1,
      });
      const dashLine = new THREE.LineSegments(dashGeometry, dashMaterial);
      scene.add(dashLine);
    }

    // Generate plethysmography waveform
    const generateWaveform = (offset: number): Float32Array => {
      const points: number[] = [];
      const timeWindow = Math.ceil(width);
      const samplesPerSecond = 100;
      const cycleDuration = 60 / respiratoryRate; // seconds per breath

      for (let x = 0; x < timeWindow; x++) {
        const t = (offset + x) / samplesPerSecond;
        const cyclePhase = (t % cycleDuration) / cycleDuration;

        // Smooth sinusoidal waveform
        const waveAmplitude = Math.sin(cyclePhase * Math.PI * 2);

        // SpO₂ value oscillates between minSpO2 and maxSpO2
        const spO2Normalized = centerSpO2 + (waveAmplitude * rangeSpO2) / 2;

        // Map to canvas coordinates (inverted Y-axis)
        const canvasY = height - ((spO2Normalized - minSpO2) / rangeSpO2) * (height * 0.8) - height * 0.1;

        points.push(x, canvasY, 0);
      }

      return new Float32Array(points);
    };

    // Create waveform geometry
    const waveGeometry = new THREE.BufferGeometry();
    const initialPoints = generateWaveform(0);
    waveGeometry.setAttribute('position', new THREE.BufferAttribute(initialPoints, 3));

    // Create waveform material with vivid red-orange
    const waveMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xff4d6d),
      linewidth: 2,
      transparent: true,
      opacity: 0.95,
    });

    const waveform = new THREE.Line(waveGeometry, waveMaterial);
    scene.add(waveform);

    // Create pulsing circular indicator in top-left
    const pulseGroup = new THREE.Group();
    pulseGroupRef.current = pulseGroup;
    pulseGroup.position.set(50, height - 50, 0);

    // Background circle
    const circleBgGeometry = new THREE.CircleGeometry(20, 32);
    const circleBgMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xff4d6d),
      transparent: true,
      opacity: 0.15,
    });
    const circleBg = new THREE.Mesh(circleBgGeometry, circleBgMaterial);
    pulseGroup.add(circleBg);

    // Pulsing circle (animated)
    const pulseGeometry = new THREE.CircleGeometry(15, 32);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xff4d6d),
      transparent: true,
      opacity: 0.8,
    });
    const pulseCircle = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pulseGroup.add(pulseCircle);

    // SpO₂ label using canvas texture
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 200;
    labelCanvas.height = 60;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, 200, 60);
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#ff4d6d';
      ctx.textAlign = 'right';
      ctx.fillText(`SpO₂: ${spO2Value}%`, 190, 35);
    }

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelGeometry = new THREE.PlaneGeometry(200, 60);
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
    });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.set(width - 120, height - 30, 0.5);
    scene.add(labelMesh);

    scene.add(pulseGroup);

    // Animation loop
    const scrollSpeed = (respiratoryRate / 15) * 0.4; // Relative to 15 BPM baseline
    let pulsePhase = 0;

    const animate = () => {
      offsetRef.current += scrollSpeed;

      // Update waveform
      const newPoints = generateWaveform(offsetRef.current);
      waveGeometry.setAttribute('position', new THREE.BufferAttribute(newPoints, 3));
      waveGeometry.attributes.position.needsUpdate = true;

      // Animate pulsing circle
      pulsePhase += 0.05;
      const pulseScale = 1 + Math.sin(pulsePhase) * 0.3;
      pulseCircle.scale.set(pulseScale, pulseScale, 1);
      pulseMaterial.opacity = 0.6 + Math.sin(pulsePhase) * 0.3;

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
      waveGeometry.dispose();
      waveMaterial.dispose();
      circleBgMaterial.dispose();
      pulseMaterial.dispose();
      labelMaterial.dispose();
      labelTexture.dispose();
      renderer.dispose();
    };
  }, [height, respiratoryRate, spO2Value, showThresholdLine]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}
