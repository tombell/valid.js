import { describe, expect, test } from "vitest";

import {
  contains,
  empty,
  endsWith,
  isDate,
  isNumber,
  isUrl,
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

test.each([
  { value: "", expected: true },
  { value: "hello world", expected: false },
])("empty($value) -> $expected", ({ value, expected }) => {
  expect(empty(value)).toBe(expected);
});

test.each([
  { value: "", expected: false },
  { value: "hello world", expected: true },
])("notEmpty($value) -> $expected", ({ value, expected }) => {
  expect(notEmpty(value)).toBe(expected);
});

test.each([
  { value: "hello world", prefix: "hello", expected: true },
  { value: "hello world", prefix: "Hello", expected: false },
])(
  "startsWith($value, $prefix) -> $expected",
  ({ value, prefix, expected }) => {
    expect(startsWith(value, prefix)).toBe(expected);
  },
);

test.each([
  { value: "hello world", suffix: "world", expected: true },
  { value: "hello world", suffix: "World", expected: false },
])("endsWith($value, $suffix) -> $expected", ({ value, suffix, expected }) => {
  expect(endsWith(value, suffix)).toBe(expected);
});

test.each([
  { value: "asdf", maxValue: 5, expected: true },
  { value: "asdf", maxValue: 4, expected: true },
  { value: "hello world", maxValue: 6, expected: false },
])(
  "maxLength($value, $maxValue) -> $expected",
  ({ value, maxValue, expected }) => {
    expect(maxLength(value, maxValue)).toBe(expected);
  },
);

test.each([
  { value: "asdf", minValue: 5, expected: false },
  { value: "asdf", minValue: 4, expected: true },
  { value: "hello world", minValue: 6, expected: true },
])(
  "minLength($value, $minValue) -> $expected",
  ({ value, minValue, expected }) => {
    expect(minLength(value, minValue)).toBe(expected);
  },
);

test.each([
  { value: "asd", minValue: 1, maxValue: 4, expected: true },
  { value: "boom!", minValue: 6, maxValue: 9, expected: false },
  { value: "hello", minValue: 5, maxValue: 8, expected: true },
  { value: "やばい", minValue: 3, maxValue: 6, expected: true },
  { value: "やばい", minValue: 1, maxValue: 2, expected: false },
  { value: "やばい", minValue: 3, maxValue: 8, expected: true },
  { value: "やばい", minValue: 2, maxValue: 3, expected: true },
])(
  "rangeLength($value, $minValue, $maxValue) -> $expected",
  ({ value, minValue, maxValue, expected }) => {
    expect(rangeLength(value, minValue, maxValue)).toBe(expected);
  },
);

test.each([
  { value: "5432", regex: /[0-9]+/, expected: true },
  { value: "HELLO WORLD", regex: /^[^a-zA-Z]*[A-Z][^a-z]*$/, expected: true },
  { value: "Hello World", regex: /^hello world/, expected: false },
])("matches($value, $regex) -> $expected", ({ value, regex, expected }) => {
  expect(matches(value, regex)).toBe(expected);
});

test.each([
  { value: "1234567890", expected: true },
  { value: "!p4ssw0rd", expected: false },
])("isNumber($value) -> $expected", ({ value, expected }) => {
  expect(isNumber(value)).toBe(expected);
});

test.each([
  { value: 0, maxValue: 5, expected: true },
  { value: 8, maxValue: 8, expected: true },
  { value: 5, maxValue: 3, expected: false },
])("max($value, $maxValue) -> $expected", ({ value, maxValue, expected }) => {
  expect(max(value, maxValue)).toBe(expected);
});

test.each([
  { value: -1, minValue: 5, expected: false },
  { value: 91, minValue: 91, expected: true },
  { value: 12, minValue: 1, expected: true },
])("min($value, $minValue) -> $expected", ({ value, minValue, expected }) => {
  expect(min(value, minValue)).toBe(expected);
});

test.each([
  { value: 5, minValue: 2, maxValue: 7, expected: true },
  { value: 7, minValue: 11, maxValue: 18, expected: false },
  { value: 7, minValue: 7, maxValue: 30, expected: true },
  { value: -1, minValue: -10, maxValue: -1, expected: true },
])(
  "range($value, $minValue, $maxValue) -> $expected",
  ({ value, minValue, maxValue, expected }) => {
    expect(range(value, minValue, maxValue)).toBe(expected);
  },
);

describe("unique", () => {
  test.each([
    { value: [1, 2, 30, -4, 1.1], expected: true },
    { value: [1, 1, 30, -4, -1.1], expected: false },
  ])("unique<number>($value) -> $expected", ({ value, expected }) => {
    expect(unique(value)).toBe(expected);
  });

  test.each([
    { value: ["one", "two", "three"], expected: true },
    { value: ["three", "one", "two", "three"], expected: false },
  ])("unique<string>($value) -> $expected", ({ value, expected }) => {
    expect(unique(value)).toBe(expected);
  });

  test.each([
    { value: [true, false], expected: true },
    { value: [true, true, false, false], expected: false },
  ])("unique<boolean>($value) -> $expected", ({ value, expected }) => {
    expect(unique(value)).toBe(expected);
  });
});

describe("contains", () => {
  test.each([
    { value: 1, list: [1, 2, 30, -4, 1.1], expected: true },
    { value: 100, list: [1, 1, 30, -4, -1.1], expected: false },
  ])(
    "contains<number>($value, $list) -> $expected",
    ({ value, list, expected }) => {
      expect(contains(value, ...list)).toBe(expected);
    },
  );

  test.each([
    { value: "one", list: ["one", "two", "three"], expected: true },
    { value: "four", list: ["three", "one", "two", "three"], expected: false },
  ])(
    "contains<string>($value, $list) -> $expected",
    ({ value, list, expected }) => {
      expect(contains(value, ...list)).toBe(expected);
    },
  );

  test.each([
    { value: true, list: [true, false], expected: true },
    { value: false, list: [true, true], expected: false },
  ])(
    "contains<boolean>($value, $list) -> $expected",
    ({ value, list, expected }) => {
      expect(contains(value, ...list)).toBe(expected);
    },
  );
});

describe("isDate", () => {
  test.each([
    { value: "", expected: false },
    { value: "202aana", expected: false },
    { value: "2024-13-18", expected: false },
    { value: "2024-03-18", expected: true },
    { value: "2024-03-18T25:13:00Z", expected: false },
    { value: "2024-03-18T12:13:00Z", expected: true },
    { value: "2024-13-18T12:13:00", expected: false },
    { value: "2024-03-18T12:13:00", expected: true },
  ])("isDate($value) -> $expected", ({ value, expected }) => {
    expect(isDate(value)).toBe(expected);
  });
});

describe("isUrl", () => {
  test.each([
    { value: "", expected: false },
    { value: "202aana", expected: false },
    { value: "/foo/bar", expected: false },
    { value: "example.com", expected: false },
    { value: "http://example.com", expected: true },
    { value: "https://example.com", expected: true },
    { value: "ftp://example.com", expected: true },
  ])("isUrl($value) -> $expected", ({ value, expected }) => {
    expect(isUrl(value)).toBe(expected);
  });
});
