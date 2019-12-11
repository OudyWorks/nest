import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import {
  DeclarationOptions,
  ModuleDeclarator,
} from '@nestjs/schematics/utils/module.declarator';

import { ModuleFinder } from '@nestjs/schematics/utils/module.finder';
import { Location, NameParser } from '@nestjs/schematics/utils/name.parser';
import { mergeSourceRoot } from '@nestjs/schematics/utils/source-root.helpers';

import { EntityModuleOptions } from './entity.schema';

import {
  lowerCase,
  upperCase
} from '../utils/string-utils';

export function main(options: EntityModuleOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ])
    )(tree, context);
  };
}

function transform(options: EntityModuleOptions): EntityModuleOptions {
  const target: EntityModuleOptions = Object.assign({}, options);

  target.metadata = 'imports';
  target.type = 'module';

  const location: Location = new NameParser().parse(target);
  target.name = strings.dasherize(location.name);
  target.path = join(strings.dasherize(location.path) as Path, target.name);
  return target;
  console.log(location)
}

function generate(options: EntityModuleOptions) {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path)), [
      template({
        ...strings,
        ...options,
        lowerCase,
        upperCase,
      }),
      move(options.path),
    ])(context);
}

function addDeclarationToModule(options: EntityModuleOptions): Rule {
  return (tree: Tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path,
    });
    if (!options.module) {
      return tree;
    }
    const content = tree.read(options.module).toString();
    const declarator: ModuleDeclarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, options as DeclarationOptions),
    );
    return tree;
  };
}