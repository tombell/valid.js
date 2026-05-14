import { expect, test } from "vitest";

import { min, minLength, notEmpty } from "./checks";
import { Validator } from "./index";

test("when valid", () => {
  const age = 21;

  const validator = new Validator();
  validator.check("age", { cond: min(age, 18), msg: "must be at least 18" });

  expect(validator.valid()).toBeTruthy();
});

test("when not valid", () => {
  const username = "tombell";

  const validator = new Validator();
  validator.check(
    "username",
    {
      cond: notEmpty(username),
      msg: "must not be empty",
    },
    {
      cond: minLength(username, 10),
      msg: "must be at least 10 characters",
    },
  );

  expect(validator.valid()).toBeFalsy();

  expect(validator.errors.username).toContain("must be at least 10 characters");
});
