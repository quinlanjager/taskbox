import { HOUR, MINUTE, SECOND } from "std/datetime/mod.ts";

type TimeSymbol = "s" | "m" | "h";
type Duration = {
  value: number;
  error: string | null;
};

const isTimeSymbol = (char: string) => {
  return char === "s" || char === "m" || char === "h";
};

const toMs = (value: number, identifier: TimeSymbol) => {
  if (identifier === "s") return value * SECOND;
  if (identifier === "m") return value * MINUTE;
  if (identifier === "h") return value * HOUR;
  return 0;
};

const toDuration = (
  timeValueSlice: string,
  timeSymbol: TimeSymbol,
): Duration => {
  // match on digits
  const durationValue = timeValueSlice.match(/\d+/);

  if (durationValue === null) return { error: "NO_VALUE", value: 0 };
  // If the duration value retrieved is one character long and value was found at index zero but the
  // originating slice was longer than one character than the time value is malformed. For cases
  // like 1hm3s. Here the "m" symbol should be immediately preceded by an integer.
  if (
    durationValue[0].length === 1 && durationValue.index === 0 &&
    timeValueSlice.length > 1
  ) {
    return { error: "MALFORMED", value: 0 };
  }

  const durationInt = parseInt(durationValue[0], 10);

  return { value: toMs(durationInt, timeSymbol), error: null };
};

export const parse = (durationString: string) => {
  let duration = 0;
  const usedSymbols: Record<string, boolean> = {};
  for (let i = durationString.length - 1; i >= 0; i--) {
    // Catches unknown symbols that can't be parsed as integers. For example if "1d" is given.
    if (
      !isTimeSymbol(durationString[i]) && isNaN(parseInt(durationString[i], 10))
    ) {
      throw new Error("Found unknown time symbol: " + durationString[i]);
    }
    if (!isTimeSymbol(durationString[i])) continue;

    const timeSymbol = durationString[i] as TimeSymbol;
    // If the current character isn't a time symbol we can assume that it is a value
    if (i === 0) {
      throw new Error(
        `Time symbol "${timeSymbol}" must be preceded by an integer value`,
      );
    }
    if (usedSymbols[timeSymbol] === true) {
      throw new Error(
        `Time symbol "${durationString[i]}" already assigned a value`,
      );
    }

    const valueSlice = durationString.slice(Math.max(i - 2, 0), i);

    const dur = toDuration(valueSlice, timeSymbol);

    if (dur.error === "NO_VALUE" || dur.error === "MALFORMED") {
      throw new Error(
        `Time symbol "${timeSymbol}" must be preceded by an integer value`,
      );
    }

    usedSymbols[timeSymbol] = true;
    duration += dur.value;
  }
  return duration;
};
