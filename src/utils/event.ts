export interface EventOptions {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

/**
 * Event property class, emits custom event of specified type
 */
export class EventEmitter<T> {
  constructor(
    private target: HTMLElement,
    private eventName: string,
  ) {}

  emit(value: T, options?: EventOptions) {
    this.target.dispatchEvent(new CustomEvent<T>(this.eventName, { detail: value, ...options }));
  }
}

/**
 * Event decorator, creates event property
 * @param name Name of event
 */
export function event(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, propName: string): any => {
    const descriptor = {
      get(this: HTMLElement) {
        return new EventEmitter(this, name ?? propName);
      },
      enumerable: true,
      configurable: true,
    };

    Object.defineProperty(target, propName, descriptor);
  };
}
