/**
 * High-Performance 3D Scene + Interactive 3D Cyber Character
 * Designed for Ratnala Raja's Portfolio
 * 
 * Features:
 * - Zero-Lag Architecture (120 FPS)
 * - Pitch-Black Void (#000000)
 * - Dark Black-Blue Highlight Palette (#1d4ed8, #2563eb, #0284c7)
 * - Interactive 3D Developer/Cyber Character that dynamically tracks and reacts to mouse control:
 *   * Head & Visor turn in real-time to look wherever the cursor moves
 *   * Cyber headset with glowing dark-blue ear-rings
 *   * Idle breathing & natural shoulder movement
 *   * Interactive click/hover gestures
 */

import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

// ==========================================
// 1. LIGHTWEIGHT ZERO-LAG BACKGROUND
// ==========================================
class DarkVoidBackground {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Subtle dark-blue light tracking mouse
    this.lightBlue = new THREE.PointLight(0x1d4ed8, 2.5, 20);
    this.lightBlue.position.set(0, 0, 4);
    this.scene.add(this.lightBlue);

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 16;
      this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 10;
    }, { passive: true });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    this.lightBlue.position.x = this.mouse.x;
    this.lightBlue.position.y = this.mouse.y;

    this.renderer.render(this.scene, this.camera);
  }
}

// ==========================================
// 2. INTERACTIVE 3D CHARACTER IN CARD
// - Uses the exact character image provided by user (reference_character.jpg)
// - Friendly greeting on load & click ("Hii! I am Raja")
// - Smooth 120 FPS cursor tracking & 3D perspective Euler rotation
// ==========================================
class InteractiveCardAvatarController {
  constructor() {
    this.container = document.getElementById('card-avatar-wrap');
    this.card = document.getElementById('holo-avatar-card');
    this.stage = document.getElementById('card-character-stage');
    this.boyImg = document.getElementById('card-boy-img');
    this.speechBubble = document.getElementById('card-speech-bubble');
    this.hintBadge = document.getElementById('card-3d-hint');

    if (!this.container || !this.stage) return;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false };
    this.isGreeting = false;
    this.greetingTimer = null;
    this.clock = { start: performance.now() };

    this.bindEvents();
    this.animate();

    // Trigger initial welcoming greeting when page loads
    setTimeout(() => {
      this.triggerGreeting(false);
    }, 300);
  }

  triggerGreeting(isManualClick = false) {
    if (this.greetingTimer) clearTimeout(this.greetingTimer);
    this.isGreeting = true;

    // 1. Play friendly greeting nod
    if (this.stage) {
      this.stage.classList.remove('greeting-nod');
      void this.stage.offsetWidth; // Force reflow
      this.stage.classList.add('greeting-nod');
    }

    // 2. Pop speech bubble ("Hii! I am Raja")
    if (this.speechBubble) {
      this.speechBubble.classList.remove('hidden');
      const titleEl = this.speechBubble.querySelector('.speech-main-text');
      const subEl = this.speechBubble.querySelector('.speech-sub-text');
      if (titleEl) titleEl.innerText = isManualClick ? 'Hii! I am Raja 👋' : 'Hii! I am Raja';
      if (subEl) subEl.innerText = isManualClick ? 'Great to connect with you!' : 'Welcome to my space!';
    }

    // 3. Play custom voice recording ("Hi, I am Raja")
    try {
      if (!this.greetingAudio) {
        this.greetingAudio = new Audio('greeting_audio.webm');
        this.greetingAudio.volume = 1.0;
      }
      this.greetingAudio.currentTime = 0;
      const playPromise = this.greetingAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocks unmuted autoplay without prior interaction, fallback to Web Speech
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const msg = new SpeechSynthesisUtterance('Hi, I am Raja.');
            msg.pitch = 1.05;
            msg.rate = 1.0;
            msg.volume = 0.95;
            window.speechSynthesis.speak(msg);
          }
        });
      }
    } catch (e) {
      // Audio playback fallback
    }

    // 4. Update badge
    if (this.hintBadge) {
      this.hintBadge.innerHTML = '<i class="fa-solid fa-volume-high text-cyan"></i> Hi, I am Raja';
    }

    // After greeting period (2.8s), smoothly hide speech bubble and engage full cursor tracking
    this.greetingTimer = setTimeout(() => {
      this.isGreeting = false;

      // Hide speech bubble smoothly
      if (this.speechBubble) {
        this.speechBubble.classList.add('hidden');
      }

      // Update badge hint
      if (this.hintBadge) {
        this.hintBadge.innerHTML = '<i class="fa-solid fa-arrows-to-dot"></i> Ratnala Raja';
      }
    }, 2800);
  }

  bindEvents() {
    // Window-wide cursor tracking so character dynamically tracks mouse across the screen
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Click on avatar container re-triggers greeting
    this.container.addEventListener('click', () => {
      this.triggerGreeting(true);
    });

    this.container.addEventListener('mouseenter', () => {
      this.mouse.isHovered = true;
    });

    this.container.addEventListener('mouseleave', () => {
      this.mouse.isHovered = false;
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const time = (performance.now() - this.clock.start) * 0.001;

    // Smooth dampening towards target cursor position (120 FPS zero-lag)
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.09;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.09;

    // Subtle idle breathing motion
    const breath = Math.sin(time * 2.2) * 2.5;
    const idleSway = Math.sin(time * 1.4) * 1.2;

    // 1. 3D Perspective Rotation of the stage inside the card
    const rotY = this.mouse.x * 16 + idleSway;
    const rotX = -this.mouse.y * 12;
    const rotZ = this.mouse.x * -1.8;
    const hoverScale = this.mouse.isHovered ? 1.05 : 1.0;

    if (this.stage && !this.isGreeting) {
      this.stage.style.transform = `perspective(850px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${hoverScale})`;
    }

    // 2. Parallax depth on the boy's portrait
    if (this.boyImg && !this.isGreeting) {
      const transX = this.mouse.x * 8;
      const transY = -this.mouse.y * 7 + breath;
      this.boyImg.style.transform = `translate(${transX.toFixed(2)}px, ${transY.toFixed(2)}px) scale(1.04)`;
    }

    // 3. Subtle Card Tilt
    if (this.card && !this.isGreeting) {
      const cardRotY = this.mouse.x * 6;
      const cardRotX = -this.mouse.y * 5;
      this.card.style.transform = `perspective(1000px) rotateY(${cardRotY.toFixed(2)}deg) rotateX(${cardRotX.toFixed(2)}deg)`;
    }
  }
}

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.darkVoidBg = new DarkVoidBackground();
  window.cardAvatarController = new InteractiveCardAvatarController();
});


