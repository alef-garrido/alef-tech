"use client";

import { useEffect, useRef } from 'react';
import * as THREE from "three";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if ((canvas as unknown as Record<string, unknown>).__three_initialized) return;
    (canvas as unknown as Record<string, unknown>).__three_initialized = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setClearColor(0x0a0c0f);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Responsive horizontal offset to move center of animation to the right of the viewport
    let offsetX = 0;
    const updateScenePosition = () => {
      if (window.innerWidth >= 1280) {
        offsetX = 3.2;
      } else if (window.innerWidth >= 1024) {
        offsetX = 2.4;
      } else if (window.innerWidth >= 768) {
        offsetX = 1.5;
      } else {
        offsetX = 0;
      }
      scene.position.x = offsetX;
    };
    updateScenePosition();
    camera.position.set(offsetX, 0, 10);

    const setRendererSize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width || window.innerWidth));
      const height = Math.max(1, Math.floor(rect.height || window.innerHeight));

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      updateScenePosition();

      return { width, height };
    };
    const initial = setRendererSize();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enabled = false;
    controls.dampingFactor = 0.05;

    const angleLimit = Math.PI / 7;
    controls.minPolarAngle = Math.PI / 2 - angleLimit;
    controls.maxPolarAngle = Math.PI / 2 + angleLimit;

    scene.fog = new THREE.FogExp2(0x0a0c0f, 0.07);

    // ──────────────────────────────────────────
    // 3D Technical Blueprint Lighting & Color System
    // ──────────────────────────────────────────
    const whiteKeyLight = new THREE.DirectionalLight(0xF4F8FB, 2.5);
    whiteKeyLight.position.set(5, 5, 5);
    scene.add(whiteKeyLight);

    const cyanSpecLight = new THREE.DirectionalLight(0x2FD9E3, 1.8);
    cyanSpecLight.position.set(-5, 5, 5);
    scene.add(cyanSpecLight);

    const orangeRimLight = new THREE.DirectionalLight(0xFF6B1A, 1.6);
    orangeRimLight.position.set(-5, -3, -5);
    scene.add(orangeRimLight);

    const ambientLight = new THREE.AmbientLight(0x10161E, 1.2);
    scene.add(ambientLight);

    // ──────────────────────────────────────────
    // 3D Isometric Blueprint Particle Lattice Grid
    // ──────────────────────────────────────────
    const gridRows = 36;
    // ──────────────────────────────────────────
    // Procedural Wireframe Core & Concentric Blueprint Rings
    // ──────────────────────────────────────────
    const wireframeGroup = new THREE.Group();

    // Outer Blueprint Icosahedron Wireframe
    const icoGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x2FD9E3,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const icoWire = new THREE.LineSegments(new THREE.WireframeGeometry(icoGeo), icoMat);
    wireframeGroup.add(icoWire);

    // Orbital Spec Ring 1 (Ultra-thin Orange Accent)
    const torusGeo1 = new THREE.TorusGeometry(3.2, 0.005, 16, 100);
    const torusMat1 = new THREE.LineBasicMaterial({
      color: 0xFF6B1A,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const torusWire1 = new THREE.LineSegments(new THREE.WireframeGeometry(torusGeo1), torusMat1);
    torusWire1.rotation.x = Math.PI / 3;
    wireframeGroup.add(torusWire1);

    // Orbital Spec Ring 2 (Ultra-thin Capsule White)
    const torusGeo2 = new THREE.TorusGeometry(2.8, 0.005, 16, 100);
    const torusMat2 = new THREE.LineBasicMaterial({
      color: 0xF4F8FB,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const torusWire2 = new THREE.LineSegments(new THREE.WireframeGeometry(torusGeo2), torusMat2);
    torusWire2.rotation.y = Math.PI / 4;
    wireframeGroup.add(torusWire2);

    scene.add(wireframeGroup);

    // ──────────────────────────────────────────
    // FBX 3D Model with Blueprint Wireframe Overlay
    // ──────────────────────────────────────────
    const surfaceImperfection = new THREE.TextureLoader().load(
      "https://miroleon.github.io/daily-assets/surf_imp_02.jpg"
    );
    surfaceImperfection.wrapT = THREE.RepeatWrapping;
    surfaceImperfection.wrapS = THREE.RepeatWrapping;

    const hands_mat = new THREE.MeshPhysicalMaterial({
      color: 0x303846,
      roughness: 0.25,
      metalness: 0.9,
      roughnessMap: surfaceImperfection,
      envMapIntensity: 1.8,
    });

    const wireOverlayMat = new THREE.LineBasicMaterial({
      color: 0x2FD9E3,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });

    const hdrLoader = new HDRLoader().setPath("https://miroleon.github.io/daily-assets/");
    hdrLoader.load(
      "GRADIENT_01_01_comp.hdr",
      function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        hands_mat.envMap = texture;
        hands_mat.needsUpdate = true;
      },
      undefined,
      (err) => console.warn('[ThreeAnimation] HDR load error:', err)
    );

    const fbxloader = new FBXLoader();
    const fbxUrl = "https://miroleon.github.io/daily-assets/two_hands_01.fbx";
    fbxloader.load(
      fbxUrl,
      function (object) {
        object.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = hands_mat;

            // Attach ultra-thin structural contour edges overlay lines to the 3D model
            if (mesh.geometry) {
              const wireGeo = new THREE.EdgesGeometry(mesh.geometry, 18);
              const wireLines = new THREE.LineSegments(wireGeo, wireOverlayMat);
              mesh.add(wireLines);
            }
          }
        });
        object.position.set(0, 0, 0);
        object.scale.setScalar(0.05);
        scene.add(object);
      },
      undefined,
      (err) => console.warn('[ThreeAnimation] FBX load error:', err)
    );

    // ──────────────────────────────────────────
    // Post Processing Pipeline
    // ──────────────────────────────────────────
    const renderScene = new RenderPass(scene, camera);
    const afterimagePass = new AfterimagePass();
    afterimagePass.uniforms["damp"].value = 0.88;

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.25,
      0.45,
      0.85
    );
    bloomPass.threshold = 0.14;
    bloomPass.strength = 1.25;
    bloomPass.radius = 0.85;

    const displacementShader = {
      uniforms: {
        tDiffuse: { value: null },
        displacement: { value: null },
        scale: { value: 0.02 },
        tileFactor: { value: 2 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler2D displacement;
        uniform float scale;
        uniform float tileFactor;
        varying vec2 vUv;
        void main() {
            if (vUv.x < 0.8 && vUv.x > 0.2 && vUv.y < 0.8 && vUv.y > 0.2) {
                vec2 tiledUv = mod(vUv * tileFactor, 1.0);
                vec2 disp = texture2D(displacement, tiledUv).rg * scale;
                vec2 distUv = vUv + disp;
                gl_FragColor = texture2D(tDiffuse, distUv);
            } else {
                gl_FragColor = texture2D(tDiffuse, vUv);
            }
        }
      `,
    };

    const displacementUrl = "https://raw.githubusercontent.com/miroleon/displacement_texture_freebie/main/assets/1K/jpeg/normal/ml-dpt-21-1K_normal.jpeg";
    const displacementTexture = new THREE.TextureLoader().load(
      displacementUrl,
      (texture) => { texture.minFilter = THREE.NearestFilter; },
      undefined,
      (err) => console.warn('[ThreeAnimation] displacement error:', err)
    );

    const displacementPass = new ShaderPass(displacementShader);
    displacementPass.uniforms["displacement"].value = displacementTexture;
    displacementPass.uniforms["scale"].value = 0.02;
    displacementPass.uniforms["tileFactor"].value = 2;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(afterimagePass);
    composer.addPass(bloomPass);
    composer.addPass(displacementPass);

    try {
      if (initial) composer.setSize(initial.width, initial.height);
    } catch (e) {
      console.warn('[ThreeAnimation] composer setSize failed:', e);
    }

    // ──────────────────────────────────────────
    // Animation Loop
    // ──────────────────────────────────────────
    let isUserInteracting = false;
    let transitionProgress = 0;
    const transitionTime = 2;
    const transitionIncrement = 1 / (60 * transitionTime);
    const transitionStartCameraPosition = new THREE.Vector3();
    const transitionStartCameraQuaternion = new THREE.Quaternion();

    let rafId: number;
    let theta = 0;

    function easeInOutCubic(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function update() {
      const speedMultiplier = prefersReducedMotion ? 0.2 : 1.0;
      theta += 0.005 * speedMultiplier;

      // Animate Procedural Wireframe Assembly
      wireframeGroup.rotation.y += 0.003 * speedMultiplier;
      wireframeGroup.rotation.x += 0.0015 * speedMultiplier;

      const targetPosition = new THREE.Vector3(
        offsetX + Math.sin(theta) * 2.8,
        Math.sin(theta * 0.5) * 0.8,
        Math.cos(theta) * 2.8
      );
      const targetQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, -theta, 0)
      );

      if (isUserInteracting) {
        if (transitionProgress > 0) transitionProgress = 0;
        transitionStartCameraPosition.copy(camera.position);
        transitionStartCameraQuaternion.copy(camera.quaternion);
      } else {
        if (transitionProgress < 1) {
          transitionProgress += transitionIncrement;
          const easedProgress = easeInOutCubic(transitionProgress);
          camera.position.lerpVectors(
            transitionStartCameraPosition,
            targetPosition,
            easedProgress
          );
          camera.quaternion.copy(transitionStartCameraQuaternion).slerp(
            targetQuaternion,
            easedProgress
          );
        } else {
          camera.position.copy(targetPosition);
          camera.quaternion.copy(targetQuaternion);
        }
      }

      // Always look at the offset scene center
      camera.lookAt(offsetX, 0, 0);
    }

    const startInteraction = () => { isUserInteracting = true; };
    const endInteraction = () => {
      isUserInteracting = false;
      transitionStartCameraPosition.copy(camera.position);
      transitionStartCameraQuaternion.copy(camera.quaternion);
      transitionProgress = 0;
    };
    controls.addEventListener('start', startInteraction);
    controls.addEventListener('end', endInteraction);

    function animate() {
      rafId = requestAnimationFrame(animate);
      controls.update();
      update();
      try {
        composer.render();
      } catch {
        try {
          renderer.render(scene, camera);
        } catch (err) {
          console.warn('[ThreeAnimation] render error:', err);
        }
      }
    }
    animate();

    const handleResize = () => {
      const { width, height } = setRendererSize();
      try {
        composer.setSize(width, height);
      } catch {
        // ignore composer resize error
      }
    };
    window.addEventListener('resize', handleResize);

    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    return () => {
      window.removeEventListener('resize', handleResize);
      try { ro.disconnect(); } catch { /* ignore */ }
      if (rafId) cancelAnimationFrame(rafId);
      try {
        controls.removeEventListener('start', startInteraction);
        controls.removeEventListener('end', endInteraction);
      } catch { /* ignore */ }
      try { composer.dispose(); } catch { /* ignore */ }
      try { renderer.dispose(); } catch { /* ignore */ }
      (canvas as unknown as Record<string, unknown>).__three_initialized = false;
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 bg-[#0a0c0f]" />;
}
