# [Gambit](https://github.com/Certora/gambit) report viewer

## How to generate a visualization

Hosted version (Github pages):

1. visit this page: https://certora.github.io/gambit-report-viewer/
2. choose the JSON report file. The file is not uploaded anywhere and instead is
analyzed in the browser.

Or, if you want to run the tool locally on your machine:

1. clone the repo
2. install [node v18](https://nodejs.org/en/) and [pnpm](https://pnpm.io/)
3. run `pnpm install` to install all dependencies
4. run `pnpm dev` to run a local webserver that serves the app
5. open `http://localhost:5173/gambit-report-viewer/` in your browser
6. choose the JSON report file.

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
