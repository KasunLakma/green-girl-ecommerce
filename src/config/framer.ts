import { Variants } from "framer-motion";

/**
 * Superhuman-inspired snappy spring physics preset.
 * High stiffness and high damping create a fast, responsive, and precise animation feeling
 * with minimal overshoot or lingering inertia.
 */
export const SUPERHUMAN_SPRING = {
  type: "spring" as const,
  stiffness: 180,
  damping: 24,
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
 * Superhuman-inspired animations variants for scroll/mount effects.
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
