export {
  contains,
  empty,
  endsWith,
  isNumber,
  matches,
  max,
  maxLength,
  min,
  minLength,
  notEmpty,
  range,
  rangeLength,
  startsWith,
  unique,
} from "./checks";

export interface Case {
  cond: boolean;
  msg: string;
}

export class Validator {
  #errors: Record<string, string[]> = {};

  check = (key: string, ...cases: Case[]) => {
    for (const c of cases) {
      if (!c.cond) {
        this.#errors[key] ||= [];
        this.#errors[key].push(c.msg);
      }
    }
  };

  valid = (): boolean => {
    return Object.keys(this.#errors).length === 0;
  };

  get errors(): Record<string, string[]> {
    return this.#errors;
  }
}
