/**
 * useDecoration - Custom hook for shared animation logic
 * Provides animation state and configuration utilities
 */

interface DecorationConfig {
  color: string;
  duration: number;
  size?: number;
  layers?: number;
}

/**
 * Hook for managing decoration animations
 * Returns utilities for animation control and configuration
 */
export function useDecoration(config: DecorationConfig) {
  const { color, duration, size, layers } = config;

  /**
   * Calculate staggered delay for multiple animation layers
   */
  const getAnimationDelay = (index: number, totalLayers: number = 1) => {
    return `${(index * duration) / totalLayers}ms`;
  };

  /**
   * Get CSS animation string for keyframe animations
   */
  const getAnimationStyle = (keyframeName: string) => ({
    animation: `${keyframeName} ${duration}ms ease-in-out infinite`,
  });

  /**
   * Merge animation styles with element-specific delays
   */
  const getAnimationStyleWithDelay = (
    keyframeName: string,
    delay: number,
  ) => ({
    ...getAnimationStyle(keyframeName),
    animationDelay: `${delay}ms`,
  });

  return {
    color,
    duration,
    size,
    layers,
    getAnimationDelay,
    getAnimationStyle,
    getAnimationStyleWithDelay,
  };
}
