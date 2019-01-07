import { Rule, chain, externalSchematic} from '@angular-devkit/schematics';

export function gothmanCity(options: any): Rule {
  return chain([externalSchematic('@schematics/angular', 'component', options)]);
}
