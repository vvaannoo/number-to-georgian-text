import { magnitudes, names, numberToText } from "./converter";

const ordinal_magnitudes = [
  [100, 1_000],
  [1_000, 1_000_000],
  [1_000_000, 1_000_000_000],
  [1_000_000_000, 1_000_000_000_000],
  [1_000_000_000_000, 1_000_000_000_000_000],
];

export function numberToOrdinalText(input: number): string {
  if (input === 1) {
    return "პირველი";
  }
  return _generateText(input);
}

function _generateText(input: number, withPrefix = true): string {
  const name = names[input];
  if (input < 20) {
    return withPrefix ? `მე${name.substring(0, name.length - 1)}ე` : name;
  }
  if (input < 100) {
    if (input % 20 === 0) {
      return withPrefix ? `მე${name}ე` : `${name}ი`;
    }
    return names[20 * Math.floor(input / 20)] + "და" + _generateText(input % 20);
  }
  if (input < 1_000) {
    if (input % 100 === 0) {
      return withPrefix ? `მე${name}ე` : `${name}ი`;
    }
    return names[100 * Math.floor(input / 100)] + " " + _generateText(input % 100);
  }

  for (const [name, [base, magnitude]] of Object.entries(magnitudes)) {
    if (input < magnitude) {
      const remainder = input % base;
      const quotient = Math.floor(input / base);
      let prefix = "";
      if (quotient > 1) {
        prefix = numberToText(quotient, { leadingOne: false });
      }
      if (remainder === 0) {
        prefix = prefix.replace(/ /g, "");
        return `მე${prefix}${name}ე`;
      } else if (prefix) {
        prefix += " ";
      }
      return `${prefix}${name} ` + _generateText(remainder);
    }
  }
  return input.toString();
}

export function numberToOrdinal(input: number): string {
  if (input === 1) {
    return `1-ელი`;
  }
  if (input < 100) {
    return input < 20 || input % 20 === 0 ? `მე-${input}` : `${input}-ე`;
  }
  for (const [base, magnitude] of ordinal_magnitudes) {
    if (input < magnitude) {
      return input % base === 0 ? `მე-${input}` : `${input}-ე`;
    }
  }
  return `${input}-ე`;
}
