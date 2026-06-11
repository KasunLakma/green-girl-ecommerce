import { Variants } from "framer-motion";

/**
 * Superhuman-inspired snappy spring physics preset.
 * High stiffness and high damping create a fast, responsive, and precise animation feeling
 * with minimal overshoot or lingering inertia.
 */
export const SUPERHUMAN_SPRING = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 0.5,
};

/**
 * Default scroll viewport triggers configuration.
 * Triggers animation once when 10% of the element is visible in the viewport.
 */
export const VIEWPORT_CONFIG = {
  once: true,
  margin: "-80px",
};

/**
 * Programmatic chaos-to-order scroll animations.
 * Elements start dispersed and rotated (chaos) and transition smoothly to their perfect
 * design-aligned grid slots (order) as they scroll into view.
 */
export const chaosToOrderContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    }
  }
};

/**
 * Generates dynamic chaos offsets based on child index or seed,
 * creating an organic, scattered entrance sequence.
 */
export const chaosToOrderChild = (index: number = 0): Variants => {
  const rotateDeg = ((index * 73) % 24) - 12;      // -12deg to +12deg rotation
  const translateX = ((index * 149) % 80) - 40;     // -40px to +40px translation
  const translateY = ((index * 263) % 60) + 30;      // +30px to +90px translation (always lower)

  return {
    hidden: { 
      opacity: 0,
      x: translateX,
      y: translateY,
      rotate: rotateDeg,
      scale: 0.94
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.5,
      }
    }
  };
};

/**
 * Standard animation variants for scroll/mount effects.
 */
export const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: SUPERHUMAN_SPRING
  }
};

export const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export const scaleInVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95 
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: SUPERHUMAN_SPRING
  }
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    }
  }
};

export const staggerItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: SUPERHUMAN_SPRING
  }
};
