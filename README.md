# [Gambit](https://github.com/Certora/gambit) report viewer

## Report format

Gambit report format is a JSON file of the following shape:

```typescript
// This is an array of mutants that have all rules data nested in them
type GambitReport = {
  // Unique ID that'll be used to identify this mutant in the chart
  id: string;
  // Filename for the mutant
  name: string;
  // Optional description for this mutant
  description?: string | undefined;
  // Git diff run on this mutant
  diff?: string | undefined;
  
  // Array of all the rules that checked this mutant
  rules: {
    // Name of this rule
    name: string;
    // Result of the check
    status: 'SUCCESS' | 'FAIL';
  }[];
}[]
```

## Installation instructions

1. install [node v18](https://nodejs.org/en/) and [pnpm](https://pnpm.io/)
2. run `pnpm install` to install all dependencies
3. run `pnpm dev` to run a local webserver that hosts the app
