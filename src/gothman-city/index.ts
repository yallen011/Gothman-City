import { Rule, chain, externalSchematic } from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function gothmanCity(options: any): Rule {
  return chain([externalSchematic('@schematics/angular', 'component', options)]);
}
