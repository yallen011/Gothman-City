import { Rule, Tree, chain, externalSchematic, SchematicContext } from '@angular-devkit/schematics';

import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';

function setupOptions(options: any, host: Tree): void {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  if (options.path === undefined) {
    const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
    options.path = `/${project.root}/src/${projectDirName}`;
  }

  const parsedPath = parseName(options.path, options.name);
  options.name = parsedPath.name;
  options.path = parsedPath.path;

}

export function gothmanCity(options: any): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      setupOptions(options, tree);
      options.module = findModuleFromOptions(tree, options) || '';
      console.log(options);
    return tree;
    },
    externalSchematic('@schematics/angular', 'component', options)]);
}
