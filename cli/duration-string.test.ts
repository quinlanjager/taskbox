import { HOUR, MINUTE, SECOND } from "std/datetime/mod.ts";
import { assertEquals, assertThrows } from "std/testing/asserts.ts";
import { parse } from "./duration-string.ts";

Deno.test("parses hours", () => {
  assertEquals(parse("1h"), HOUR);
  assertEquals(parse("2h"), HOUR * 2);
  assertEquals(parse("10h"), HOUR * 10);
});

Deno.test("parses minutes", () => {
  assertEquals(parse("1m"), MINUTE);
  assertEquals(parse("2m"), MINUTE * 2);
  assertEquals(parse("10m"), MINUTE * 10);
});

Deno.test("parses seconds", () => {
  assertEquals(parse("1s"), SECOND);
  assertEquals(parse("2s"), SECOND * 2);
  assertEquals(parse("10s"), SECOND * 10);
});

Deno.test("parses combination of values", () => {
  assertEquals(parse("1h1m1s"), HOUR + MINUTE + SECOND);
});

Deno.test("parses combination of values", () => {
  assertEquals(parse("1h1m1s"), HOUR + MINUTE + SECOND);
});

Deno.test("throws when string is malformed", () => {
  assertThrows(() => parse("1hm"));
  assertThrows(() => parse("m"));
  assertThrows(() => parse("h1m"));
  assertThrows(() => parse("1d"));
  assertThrows(() => parse("1h1h"));
});
