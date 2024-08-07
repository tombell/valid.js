export const empty = (value: string): boolean => value.length === 0;

export const notEmpty = (value: string): boolean => value.length !== 0;

export const startsWith = (value: string, prefix: string): boolean =>
  value.startsWith(prefix);

export const endsWith = (value: string, suffix: string): boolean =>
  value.endsWith(suffix);

export const maxLength = (value: string, maxValue: number): boolean =>
  value.length <= maxValue;

export const minLength = (value: string, minValue: number): boolean =>
  minValue <= value.length;

export const rangeLength = (
  value: string,
  minValue: number,
  maxValue: number,
): boolean => minValue <= value.length && value.length <= maxValue;

export const matches = (value: string, rx: RegExp): boolean => rx.test(value);

export const isNumber = (value: string): boolean =>
  !Number.isNaN(Number.parseFloat(value));

export const max = <T>(value: T, maxValue: T): boolean => value <= maxValue;

export const min = <T>(value: T, minValue: T): boolean => minValue <= value;

export const range = <T>(value: T, minValue: T, maxValue: T): boolean =>
  minValue <= value && value <= maxValue;

export const unique = <T>(values: T[]): boolean =>
  values.length === new Set(values).size;

export const contains = <T>(value: T, ...list: T[]): boolean =>
  list.includes(value);

export const isDate = (value: string): boolean => {
  const isoformat =
    "^\\d{4}-\\d{2}-\\d{2}" + // Match YYYY-MM-DD
    "((T\\d{2}:\\d{2}(:\\d{2})?)" + // Match THH:mm:ss
    "(\\.\\d{1,6})?" + // Match .sssss
    "(Z|(\\+|-)\\d{2}:\\d{2})?)?$"; // Time zone (Z or +hh:mm)

  const regex = new RegExp(isoformat);

  return regex.test(value) && !Number.isNaN(Date.parse(value));
};

export const isUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url && url.protocol !== "" && url.host !== "";
  } catch {
    return false;
  }
};
