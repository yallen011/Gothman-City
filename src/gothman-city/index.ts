import { Rule, chain, externalSchematic, noop, Tree, SchematicContext} from '@angular-devkit/schematics';
import { Schema as GothmanOptions } from './schema';

export interface ServiceOptions {
  name?: string;
  flat?: boolean;
  lintFix?: boolean;
  project?: string;
  spec?: boolean;
}

function convertOptions(options:GothmanOptions): ServiceOptions{
  const serviceOptions: ServiceOptions = {
    name: options.service,
    flat: options.flat,
    lintFix: options.lintFix,
    project: options.project,
    spec: options.spec
  };
  return serviceOptions;
}

function addService(options: GothmanOptions): Rule {
  return options.service ? externalSchematic('@schematics/angular', 'service', convertOptions(options)) : noop();
}

function addComponent(options:GothmanOptions): Rule {
  return externalSchematic('@schematics/angular', 'component', options);
}
export function gothmanCity(options: GothmanOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      addComponent(options),
      addService(options)
    ])(host,context);
  }
}
