const validityStates: Array<keyof ValidityState> = [
  'valueMissing',
  'typeMismatch',
  'tooLong',
  'tooShort',
  'rangeUnderflow',
  'rangeOverflow',
  'stepMismatch',
  'badInput',
  'patternMismatch',
  'customError',
];

/**
 * Built-in validators for input elements
 */
export const innerInputValidators = validityStates.map(key => ({
  key,
  isValid(instance: HTMLElement & { validationTarget: HTMLInputElement }) {
    if (instance.validationTarget) {
      return !instance.validationTarget.validity[key];
    }
    return true;
  },
}));

/**
 * Custom validator for group of choices (checkboxes, radio buttons)
 */
export const groupRequiredValidator = {
  attribute: 'required',
  key: 'valueMissing',
  message: (): string => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'group';
    radio.required = true;
    return radio.validationMessage || 'Please select at least one of these options.';
  },
  isValid(instance: HTMLElement & { required: boolean }, value: string): boolean {
    if ((instance.hasAttribute('required') || instance.required) && !value) {
      return false;
    }
    return true;
  },
};
