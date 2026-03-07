/**
 * MedicalDashboard - 2D animated medical monitoring dashboard with three waveforms
 * Displays ECG, Respiration, and Blood Pressure waveforms with independent scrolling speeds
 */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MedicalDashboardProps {
  /**
   * Height of the canvas in pixels (width uses full page width)
   * @default 400
   */
  height?: number;

  /**
   * CSS class for additional styling
   */
  className?: string;
}

export function MedicalDashboard({
  height = 400,
  className = '',
}: MedicalDashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const offsetsRef = useRef({ ecg: 0, resp: 0, bp: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const panelHeight = height / 3;
    const panelPadding = 10;

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

    // Create panel backgrounds and labels
    const createPanel = (
      yOffset: number,
      label: string,
      color: THREE.Color,
    ) => {
      const group = new THREE.Group();

      // Dark background
      const bgGeometry = new THREE.BufferGeometry();
      bgGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array([
            0, yOffset, 0,
            width, yOffset, 0,
            width, yOffset + panelHeight, 0,
            0, yOffset + panelHeight, 0,
          ]),
          3,
        ),
      );
      const bgMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x111827),
        transparent: true,
        opacity: 0.4,
      });
      const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
      group.add(bgMesh);

      // Scanline texture (simple horizontal lines)
      const scanlineGeometry = new THREE.BufferGeometry();
      const scanlinePoints: number[] = [];
      for (let y = yOffset; y < yOffset + panelHeight; y += 4) {
        scanlinePoints.push(0, y, 0);
        scanlinePoints.push(width, y, 0);
      }
      scanlineGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(scanlinePoints), 3),
      );
      const scanlineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0x333333),
        transparent: true,
        opacity: 0.1,
        linewidth: 1,
      });
      const scanlines = new THREE.LineSegments(scanlineGeometry, scanlineMaterial);
      group.add(scanlines);

      // Panel label with colored dot
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 150;
      labelCanvas.height = 40;
      const ctx = labelCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, 150, 40);

        // Colored dot
        ctx.fillStyle = color.getStyle();
        ctx.beginPath();
        ctx.arc(10, 20, 5, 0, Math.PI * 2);
        ctx.fill();

        // Label text
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = color.getStyle();
        ctx.fillText(label, 25, 24);
      }

      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const labelGeometry = new THREE.PlaneGeometry(150, 40);
      const labelMaterial = new THREE.MeshBasicMaterial({
        map: labelTexture,
        transparent: true,
      });
      const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
      labelMesh.position.set(85, yOffset + panelHeight - 20, 0.5);
      group.add(labelMesh);

      scene.add(group);
      return group;
    };

    // Create panels
    createPanel(height * 2 / 3, 'ECG', new THREE.Color(0x00ff88)); // Electric green
    createPanel(height / 3, 'RESP', new THREE.Color(0x00ccff)); // Sky blue
    createPanel(0, 'BP', new THREE.Color(0xffa500)); // Amber

    // Waveform generators
    const generateECG = (offset: number): Float32Array => {
      const points: number[] = [];
      const baselineY = height * 2 / 3 + panelHeight / 2;
      const amplitude = panelHeight * 0.35;

      for (let x = 0; x < Math.ceil(width); x++) {
        const t = (offset + x) / 100; // ECG frequency
        const cyclePhase = (t % 1) * Math.PI * 2; // Full cycle
        let y: number;

        // ECG pattern
        if (cyclePhase < Math.PI * 0.2) {
          y = baselineY;
        } else if (cyclePhase < Math.PI * 0.35) {
          y = baselineY - Math.sin((cyclePhase - Math.PI * 0.2) / (Math.PI * 0.15)) * amplitude * 0.3;
        } else if (cyclePhase < Math.PI * 0.5) {
          y = baselineY - Math.sin((cyclePhase - Math.PI * 0.35) / (Math.PI * 0.15)) * amplitude;
        } else if (cyclePhase < Math.PI * 0.7) {
          y = baselineY + Math.sin((cyclePhase - Math.PI * 0.5) / (Math.PI * 0.2)) * amplitude * 0.5;
        } else {
          y = baselineY;
        }

        points.push(x, y, 0);
      }

      return new Float32Array(points);
    };

    const generateRespiration = (offset: number): Float32Array => {
      const points: number[] = [];
      const baselineY = height / 3 + panelHeight / 2;
      const amplitude = panelHeight * 0.35;

      for (let x = 0; x < Math.ceil(width); x++) {
        const t = (offset + x) / 200; // Slower respiration
        const y = baselineY + Math.sin(t * Math.PI * 2) * amplitude;
        points.push(x, y, 0);
      }

      return new Float32Array(points);
    };

    const generateBloodPressure = (offset: number): Float32Array => {
      const points: number[] = [];
      const baselineY = panelHeight / 2;
      const amplitude = panelHeight * 0.35;

      for (let x = 0; x < Math.ceil(width); x++) {
        const t = (offset + x) / 150; // Medium speed
        // Double peak pattern (systolic/diastolic)
        const wave = Math.sin(t * Math.PI * 2);
        const y = baselineY + wave * amplitude + Math.sin(t * Math.PI * 4) * amplitude * 0.3;
        points.push(x, y, 0);
      }

      return new Float32Array(points);
    };

    // Create waveform geometries
    const ecgGeometry = new THREE.BufferGeometry();
    const respGeometry = new THREE.BufferGeometry();
    const bpGeometry = new THREE.BufferGeometry();

    const ecgPoints = generateECG(0);
    const respPoints = generateRespiration(0);
    const bpPoints = generateBloodPressure(0);

    ecgGeometry.setAttribute('position', new THREE.BufferAttribute(ecgPoints, 3));
    respGeometry.setAttribute('position', new THREE.BufferAttribute(respPoints, 3));
    bpGeometry.setAttribute('position', new THREE.BufferAttribute(bpPoints, 3));

    // Create materials with glow effect
    const ecgMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x00ff88),
      linewidth: 2,
      transparent: true,
      opacity: 0.95,
    });

    const respMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x00ccff),
      linewidth: 2,
      transparent: true,
      opacity: 0.95,
    });

    const bpMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xffa500),
      linewidth: 2,
      transparent: true,
      opacity: 0.95,
    });

    const ecgLine = new THREE.Line(ecgGeometry, ecgMaterial);
    const respLine = new THREE.Line(respGeometry, respMaterial);
    const bpLine = new THREE.Line(bpGeometry, bpMaterial);

    scene.add(ecgLine);
    scene.add(respLine);
    scene.add(bpLine);

    // Animation loop with independent speeds
    const animate = () => {
      const speeds = { ecg: 0.8, resp: 0.3, bp: 0.5 }; // Independent scroll speeds
      offsetsRef.current.ecg += speeds.ecg;
      offsetsRef.current.resp += speeds.resp;
      offsetsRef.current.bp += speeds.bp;

      // Update ECG
      const ecgNewPoints = generateECG(offsetsRef.current.ecg);
      ecgGeometry.setAttribute('position', new THREE.BufferAttribute(ecgNewPoints, 3));
      ecgGeometry.attributes.position.needsUpdate = true;

      // Update Respiration
      const respNewPoints = generateRespiration(offsetsRef.current.resp);
      respGeometry.setAttribute('position', new THREE.BufferAttribute(respNewPoints, 3));
      respGeometry.attributes.position.needsUpdate = true;

      // Update Blood Pressure
      const bpNewPoints = generateBloodPressure(offsetsRef.current.bp);
      bpGeometry.setAttribute('position', new THREE.BufferAttribute(bpNewPoints, 3));
      bpGeometry.attributes.position.needsUpdate = true;

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
      ecgGeometry.dispose();
      respGeometry.dispose();
      bpGeometry.dispose();
      ecgMaterial.dispose();
      respMaterial.dispose();
      bpMaterial.dispose();
      renderer.dispose();
    };
  }, [height]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}
