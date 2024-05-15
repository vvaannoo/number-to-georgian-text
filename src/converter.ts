const names: { [key: number]: string } = {
  0: "ნული",
  1: "ერთი",
  2: "ორი",
  3: "სამი",
  4: "ოთხი",
  5: "ხუთი",
  6: "ექვსი",
  7: "შვიდი",
  8: "რვა",
  9: "ცხრა",
  10: "ათი",
  11: "თერთმეტი",
  12: "თორმეტი",
  13: "ცამეტი",
  14: "თოთხმეტი",
  15: "თხუთმეტი",
  16: "თექვსმეტი",
  17: "ჩვიდმეტი",
  18: "თრვამეტი",
  19: "ცხრამეტი",
  20: "ოც",
  40: "ორმოც",
  60: "სამოც",
  80: "ოთხმოც",
  100: "ას",
  200: "ორას",
  300: "სამას",
  400: "ოთხას",
  500: "ხუთას",
  600: "ექვსას",
  700: "შვიდას",
  800: "რვაას",
  900: "ცხრაას",
};

const magnitudes: { [key: string]: [number, number] } = {
  'ათას': [1000, 1000000],
  'მილიონ': [1000000, 1000000000],
  'მილიარდ': [1000000000, 1000000000000],
  'ტრილიონ': [1000000000000, 1000000000000000],
  'კვადრილიონ': [1000000000000000, Number.MAX_SAFE_INTEGER + 1]
}
export type Input = string | number;
export type Options = {
  // todo: add option for leading one (ერთი ათას, ერთი მილიონ...)
}

export function numberToText(input: Input, options?: Options): string {
  options = options || {};
  console.log(input, options);
  if (typeof input === "string") {
    input = +input;
  }
  if (isNaN(input)) {
    throw new Error("Invalid input");
  }
  if (input < 0) {
    return "მინუს " + _generateText(-input);
  }
  return _generateText(input);
}

function _generateText(input: number): string {
  if (input < 20) {
    return names[input];
  }
  if (input < 100) {
    if (input % 20 === 0) {
      return names[input] + "ი";
    }
    return names[20 * Math.floor(input / 20)] + "და" + _generateText(input % 20);
  }
  if (input < 1_000) {
    if (input % 100 === 0) {
      return names[input] + "ი";
    }
    return names[100 * Math.floor(input / 100)] + " " + _generateText(input % 100);
  }

  for (const [name, [base, magnitude]] of Object.entries(magnitudes)) {
    if (input < magnitude) {
      const remainder = input % base;
      if (remainder === 0) {
        return _generateText(Math.floor(input / base)) + ` ${name}ი`;
      }
      return _generateText(Math.floor(input / base)) + ` ${name} ` + _generateText(remainder);
    }
  }
  return input.toString();
}

// todo: add decimal support
// todo: add ordinal support
