/**
 * Centralized GSAP initialization module.
 *
 * Why this exists:
 * - GSAP's ScrollTrigger plugin must be registered exactly once before use.
 * - Calling `gsap.registerPlugin()` at module scope in multiple components
 *   works but is fragile — if any import fails, the whole tree crashes.
 * - This module provides a single, safe registration point with SSR guards.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function ensureGsapReady(): boolean {
  if (typeof window === 'undefined') return false; // SSR guard

  if (!registered) {
    try {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    } catch (err) {
      console.error('[gsap-init] Failed to register ScrollTrigger:', err);
      return false;
    }
  }

  return true;
}

export { gsap, ScrollTrigger };
