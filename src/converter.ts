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
  ათას: [1000, 1000000],
  მილიონ: [1000000, 1000000000],
  მილიარდ: [1000000000, 1000000000000],
  ტრილიონ: [1000000000000, 1000000000000000],
  კვადრილიონ: [1000000000000000, Number.MAX_SAFE_INTEGER + 1],
};

const fractionalNames: { [key: number]: string } = {
  1: "მეათედი",
  2: "მეასედი",
  3: "მეათასედი",
  4: "მეათიათასედი",
  5: "მეასიათასედი",
  6: "მემილიონედი",
  7: "მეათიმილიონედი",
  8: "მეასიმილიონედი",
  9: "მემილიარდედი",
  10: "მეათიმილიარდედი",
  11: "მეასიმილიარდედი",
  12: "მეტრილიონედი",
  13: "მეათიტრილიონედი",
  14: "მეასიტრილიონედი",
  15: "მეკვადრილიონედი",
  16: "მეათიკვადრილიონედი",
};

export type Input = string | number;
export type Options = {
  leadingOne?: boolean;
  decimalPointSeparator?: string;
};

const defaultOptions: Options = {
  leadingOne: true,
  decimalPointSeparator: "",
};

export function numberToText(input: Input, options?: Options): string {
  options = options || {};
  options = { ...defaultOptions, ...options };
  // console.log(input, options);
  if (typeof input === "string") {
    input = +input;
  }
  if (isNaN(input)) {
    throw new Error("Invalid input");
  }
  if (input < 0) {
    return "მინუს " + numberToText(-input, options);
  }
  if (!Number.isInteger(input)) {
    const [whole, fractional] = input.toString().split(".");
    return (
      `${_generateText(+whole, options)} მთელი${options.decimalPointSeparator} ` +
      `${_generateText(+fractional, options)} ${getFractionalName(fractional)}`
    );
  }
  return _generateText(input, options);
}

function _generateText(input: number, opts: Options): string {
  if (input < 20) {
    return names[input];
  }
  if (input < 100) {
    if (input % 20 === 0) {
      return names[input] + "ი";
    }
    return names[20 * Math.floor(input / 20)] + "და" + _generateText(input % 20, opts);
  }
  if (input < 1_000) {
    if (input % 100 === 0) {
      return names[input] + "ი";
    }
    return names[100 * Math.floor(input / 100)] + " " + _generateText(input % 100, opts);
  }

  for (const [name, [base, magnitude]] of Object.entries(magnitudes)) {
    if (input < magnitude) {
      const remainder = input % base;
      const quotient = Math.floor(input / base);
      let prefix = "";
      if (quotient > 1 || opts.leadingOne) {
        prefix = _generateText(quotient, opts) + " ";
      }
      if (remainder === 0) {
        return `${prefix}${name}ი`;
      }
      return `${prefix}${name} ` + _generateText(remainder, opts);
    }
  }
  return input.toString();
}

export function getFractionalName(input: string): string {
  const len = input.length;
  return fractionalNames[len] || "";
}

// todo: add ordinal support
