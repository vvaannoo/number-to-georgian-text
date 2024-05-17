# number-to-georgian-text
Convert numbers into Georgian words

## Installation

#### NPM
```shell
npm install number-to-georgian-text --save
```

#### Yarn
```shell
yarn add number-to-georgian-text
```

## Usage
    
```typescript
import { numberToText } from 'number-to-georgian-text';

console.log(numberToText(1700055));
// ერთი მილიონ შვიდასი ათას ორმოცდათხუთმეტი
console.log(numberToText("1700055"));
// ერთი მილიონ შვიდასი ათას ორმოცდათხუთმეტი
console.log(numberToText(1001001, {leadingOne: true}));
// ერთი მილიონ ერთი ათას ერთი
console.log(numberToText(1001001, {leadingOne: false}));
// მილიონ ათას ერთი
console.log(numberToText(100.01));
// ასი მთელი ერთი მეასედი
console.log(numberToText(100.01, {decimalPointSeparator: ','}));
// ასი მთელი, ერთი მეასედი
```

## Options
```typescript
type Options = {
    leadingOne?: boolean; // default: true
    decimalPointSeparator?: string; // default: ''
}
```

## Tests
```shell
npm test
```

## License
MIT

