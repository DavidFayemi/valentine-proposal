declare module "canvas-confetti" {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: ("square" | "circle" | "star")[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  export default function confetti(options?: ConfettiOptions): Promise<void>;
}
