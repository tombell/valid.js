export type Case = {
  cond: boolean;
  msg: string;
};

export type Errors = {
  [key: string]: string[];
};

export class Validator {
  #errors: Errors = {};

  check = (key: string, ...cases: Case[]) => {
    for (let i = 0; i < cases.length; i += 1) {
      if (!cases[i].cond) {
        this.#errors[key] ||= [];
        this.#errors[key].push(cases[i].msg);
      }
    }
  };

  valid = (): boolean => {
    return Object.keys(this.#errors).length === 0;
  };

  get errors(): Errors {
    return this.#errors;
  }
}
