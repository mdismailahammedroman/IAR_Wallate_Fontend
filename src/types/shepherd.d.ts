/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'shepherd.js' {
  export class Tour {
    constructor(options?: any);
    steps: any[];
    addStep(step: any): void;
    removeStep(id: string): void;
    start(): void;
    cancel(): void;
    complete(): void;
    next(): void;
    back(): void;
  }

  const Shepherd: {
    Tour: typeof Tour;
  };

  export default Shepherd;
}
