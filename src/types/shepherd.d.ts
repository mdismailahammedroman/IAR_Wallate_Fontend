declare module "shepherd.js" {
  export interface ShepherdButton {
    text: string;
    action?: () => void;
    classes?: string;
  }

  export interface ShepherdAttachTo {
    element: string;
    on: string;
  }

  export interface ShepherdStepOptions {
    id?: string;
    title?: string;
    text?: string | string[];
    attachTo?: ShepherdAttachTo;
    buttons?: ShepherdButton[];
    classes?: string;
  }

  export interface ShepherdTourOptions {
    useModalOverlay?: boolean;
    defaultStepOptions?: Partial<ShepherdStepOptions> & {
      cancelIcon?: { enabled: boolean };
      scrollTo?: boolean | { behavior?: string; block?: string };
    };
  }

  export class Tour {
    constructor(options?: ShepherdTourOptions);

    addStep(id: string, options: ShepherdStepOptions): void;
    addStep(options: ShepherdStepOptions): void;

    start(): void;
    next(): void;
    back(): void;
    complete(): void;
    cancel(): void;
  }

  const Shepherd: { Tour: typeof Tour };
  export default Shepherd;
}
