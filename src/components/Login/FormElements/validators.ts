export const required = (value: any) => value ? undefined : 'Required';

export const maxLength = (max: any) => (value: any) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min: any) => (value: any) =>
    value && value.length < min ? `Must be ${min} characters or less` : undefined;

export const minLength4 = minLength(4);

export const maxLength15 = maxLength(15);
