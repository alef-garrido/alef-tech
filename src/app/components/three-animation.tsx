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

    // Prevent double initialization during HMR / Fast Refresh
    if ((canvas as any).__three_initialized) return;
    (canvas as any).__three_initialized = true;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    // Set a default background color
    renderer.setClearColor(0x11151c);

    //  Set the pixel ratio of the canvas (for HiDPI devices)
    renderer.setPixelRatio(window.devicePixelRatio);

    // Note: renderer size is set after the camera is created below

    // Create a new Three.js scene
    const scene = new THREE.Scene();

    // Create a new camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Set the camera position
    camera.position.set(0, 0, 10);

    // Set the size of the renderer to the canvas size (after camera exists)
    const setRendererSize = () => {
      // Use getBoundingClientRect for sub-pixel/calc precision
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width || window.innerWidth));
      const height = Math.max(1, Math.floor(rect.height || window.innerHeight));

      // Update renderer size and pixel ratio (clamped)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);

      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      return { width, height };
    };
    // initial size
    const initial = setRendererSize();

    // Add controls to the camera/orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enabled = false;
    controls.dampingFactor = 1;
    controls.enablePan = false;

    // Limit the angel that the camera can move
    const angleLimit = Math.PI / 7;
    controls.minPolarAngle = Math.PI / 2 - angleLimit;
    controls.maxPolarAngle = Math.PI / 2 + angleLimit;

    // Add a gradient HDR background
    const hdrLoader = new HDRLoader().setPath("https://miroleon.github.io/daily-assets/");
    hdrLoader.load(
      "GRADIENT_01_01_comp.hdr",
      function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        // Add the HDR to the scene
        scene.environment = texture;
      },
      undefined,
      (err) => {
        console.warn('HDR load error:', err);
      }
    );

    // Add some fog to the scene for moodyness
    scene.fog = new THREE.Fog(0x11151c, 1, 100);
    scene.fog = new THREE.FogExp2(0x11151c, 0.4);

    // Load a texture for the 3d model
    const surfaceImperfection = new THREE.TextureLoader().load(
      "https://miroleon.github.io/daily-assets/surf_imp_02.jpg"
    );
    surfaceImperfection.wrapT = THREE.RepeatWrapping;
    surfaceImperfection.wrapS = THREE.RepeatWrapping;

    console.debug('[ThreeAnimation] init');

    // Create a new MeshPhysicalMaterial for the 3d model
    const hands_mat = new THREE.MeshPhysicalMaterial({
      color: 0x606060,
      roughness: 0.2,
      metalness: 1,
      roughnessMap: surfaceImperfection,
      // envMap will be attached when HDR texture is available
      envMapIntensity: 1.5,
    });

    // Load the 3d model as FBX
    const fbxloader = new FBXLoader();
    const fbxUrl = "https://miroleon.github.io/daily-assets/two_hands_01.fbx";
    fbxloader.load(
      fbxUrl,
      function (object) {
        // Traverse through the object to apply the material to all the meshes
        object.traverse(function (child) {
          // Apply the material to the 3d model
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = hands_mat;
          }
        });

        // Set the position and scale of the 3d model
        object.position.set(0, 0, 0);
        object.scale.setScalar(0.05);

        // Add the 3d model to the scene
        scene.add(object);
      },
      undefined,
      (err) => {
        console.warn('[ThreeAnimation] FBX load error for', fbxUrl, err);
      }
    );
    const hdrUrl = "https://miroleon.github.io/daily-assets/GRADIENT_01_01_comp.hdr";
    hdrLoader.load(
      hdrUrl,
      function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        // Add the HDR to the scene
        scene.environment = texture;
        // attach env map to existing materials
        try {
          hands_mat.envMap = texture;
          hands_mat.needsUpdate = true;
          } catch (e) {
            console.warn('[ThreeAnimation] failed to attach envMap to material:', e);
          }
        },
        undefined,
        (err) => {
          console.warn('[ThreeAnimation] HDR load error for', hdrUrl, err);
        }
      );

    // POST PROCESSING
    // Create a new render pass
    const renderScene = new RenderPass(scene, camera);

    // Create a new afterimage pass
    const afterimagePass = new AfterimagePass();

    // Set the damping of the afterimage pass
    afterimagePass.uniforms["damp"].value = 0.9;

    // Set bloom parameters
    const bloomparams = {
      exposure: 1,
      bloomStrength: 1.75,
      bloomThreshold: 0.1,
      bloomRadius: 1
    };

    // Create a new bloom pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = bloomparams.bloomThreshold;
    bloomPass.strength = bloomparams.bloomStrength;
    bloomPass.radius = bloomparams.bloomRadius;

    // Create the displacement shader with vertexShader and fragmentShader
    const displacementShader = {
      uniforms: {
        // tDiffuse is the texture that the shader will be applied to, in this case the Three.js scene
        tDiffuse: { value: null },
        // displacement is the texture that will be used to displace the pixels
        displacement: { value: null },
        // scale is the intensity of the displacement
        scale: { value: 0.1 },
        // tileFactor is the number of times the texture will be repeated across the screen
        tileFactor: { value: 2 }
      },
      // This particular vertex shader is basically a Three.js specific boilerplate code
      //It allows us to connect the vertex shader to the Three.js scene
      vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
      // The fragment shader determines the color of each pixel on the screen
      // Here we are displacing the pixels based on the displacement texture
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler2D displacement;
        uniform float scale;
        uniform float tileFactor;
        varying vec2 vUv;
        void main() {
            // We use the conditional here to apply the displacement only to part of the scene/screen
            // You can simply cut the if condition and apply the displacement to the entire screen

            if (vUv.x < 0.75 && vUv.x > 0.25 && vUv.y < 0.75 && vUv.y > 0.25) {
                vec2 tiledUv = mod(vUv * tileFactor, 1.0);
                vec2 disp = texture2D(displacement, tiledUv).rg * scale;
                vec2 distUv = vUv + disp;

                // By setting gl_FragColor to the displacement texture accross the distibuted UVs we get the displacement effect
                // You can check the texture by simply substituting the 'tDiffuse' with 'displacement'

                gl_FragColor = texture2D(tDiffuse, distUv);
            } else {
                gl_FragColor = texture2D(tDiffuse, vUv);  // No displacement on the right half
            }
        }
    `
    };

    // Load the displacement texture
    // You can change the 'ml-dpt-12-1K_normal.jpeg' to 'ml-dpt-21-1K_normal.jpeg' for the second freebie texture
    const displacementUrl = "https://raw.githubusercontent.com/miroleon/displacement_texture_freebie/main/assets/1K/jpeg/normal/ml-dpt-21-1K_normal.jpeg";
    const displacementTexture = new THREE.TextureLoader().load(
      displacementUrl,
      function (texture) {
        // By setting minFilter to THREE.NearestFilter we can prevent some tiling issues with the displacement texture
        texture.minFilter = THREE.NearestFilter;
      },
      undefined,
      (err) => {
        console.warn('[ThreeAnimation] displacement texture load error for', displacementUrl, err);
      }
    );

    // Create a new ShaderPass with the displacementShader
    // This adds the displacement effect to the scene
    const displacementPass = new ShaderPass(displacementShader);

    // Here you can select which texture to use for the displacement
    displacementPass.uniforms["displacement"].value = displacementTexture;

    // Adjust scale to control the intensity of distortion
    displacementPass.uniforms["scale"].value = 0.025;

    // Adjust tileFactor to control the number of repetitions of the texture, which basically makes it smaller or larger
    displacementPass.uniforms["tileFactor"].value = 2;

    // Create a new EffectComposer to add all the passes to the scene
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(afterimagePass);
    composer.addPass(bloomPass);

    // Ensure composer matches renderer size after creation
    try {
      if (initial) composer.setSize(initial.width, initial.height);
    } catch (e) {
      console.warn('[ThreeAnimation] composer setSize failed', e);
    }

    // Add the displacement pass to the composer
    composer.addPass(displacementPass);

    // The following section is just a custom way to handle the orbit controls and transition smoothly between user interaction and default camera movement

    // (easing defined later)

    // Variables to control the transition
    let isUserInteracting = false;
    let transitionProgress = 0;
    const transitionTime = 2; // Transition should complete over 5 seconds
    const transitionIncrement = 1 / (60 * transitionTime); // Assuming 60 FPS
    const transitionStartCameraPosition = new THREE.Vector3();
    const transitionStartCameraQuaternion = new THREE.Quaternion();

    let rafId: number;
    // simple scene animation so something moves even if model isn't loaded
    let rotTheta = 0;
    // variables used for scripted camera motion
    let theta = 0;

    function easeInOutCubic(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function update() {
      // Update theta continuously
      theta += 0.005;

      const targetPosition = new THREE.Vector3(
        Math.sin(theta) * 3,
        Math.sin(theta),
        Math.cos(theta) * 3
      );

      const targetQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, -theta, 0)
      );

      if (isUserInteracting) {
        if (transitionProgress > 0) {
          transitionProgress = 0;
        }
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
          // Interpolate from the stored start quaternion to the target
          camera.quaternion.copy(transitionStartCameraQuaternion).slerp(
            targetQuaternion,
            easedProgress
          );
        } else {
          camera.position.copy(targetPosition);
          camera.quaternion.copy(targetQuaternion);
        }
      }

      // always look at center
      camera.lookAt(scene.position);

      // gentle fallback rotation
      rotTheta += 0.01;
      scene.rotation.y = rotTheta * 0.2;
    }

    // Event listeners for OrbitControls interaction
    const startInteraction = () => {
      isUserInteracting = true;
    };
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
      } catch (e) {
        try {
          renderer.render(scene, camera);
        } catch (err) {
          console.warn('[ThreeAnimation] render error:', err);
        }
      }
    }
    animate();

    // handle resize via ResizeObserver for parent layout changes
    const handleResize = () => {
      const { width, height } = setRendererSize();
      try {
        composer.setSize(width, height);
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('resize', handleResize);

    // Observe size changes of the canvas (or parent layout) so the canvas always fills the component
    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      try {
        ro.disconnect();
      } catch (e) {}
      if (rafId) cancelAnimationFrame(rafId);
      // remove orbit controls listeners
      try {
        controls.removeEventListener('start', startInteraction);
        controls.removeEventListener('end', endInteraction);
      } catch (e) {}
      try {
        composer.dispose();
      } catch (e) {}
      try {
        renderer.dispose();
      } catch (e) {}
      (canvas as any).__three_initialized = false;
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
}
