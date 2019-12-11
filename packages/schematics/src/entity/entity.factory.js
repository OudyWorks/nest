"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const module_declarator_1 = require("@nestjs/schematics/utils/module.declarator");
const module_finder_1 = require("@nestjs/schematics/utils/module.finder");
const name_parser_1 = require("@nestjs/schematics/utils/name.parser");
const source_root_helpers_1 = require("@nestjs/schematics/utils/source-root.helpers");
const string_utils_1 = require("../utils/string-utils");
function main(options) {
    options = transform(options);
    return (tree, context) => {
        return schematics_1.branchAndMerge(schematics_1.chain([
            source_root_helpers_1.mergeSourceRoot(options),
            addDeclarationToModule(options),
            schematics_1.mergeWith(generate(options)),
        ]))(tree, context);
    };
}
exports.main = main;
function transform(options) {
    const target = Object.assign({}, options);
    target.metadata = 'imports';
    target.type = 'module';
    const location = new name_parser_1.NameParser().parse(target);
    target.name = core_1.strings.dasherize(location.name);
    target.path = core_1.join(core_1.strings.dasherize(location.path), target.name);
    return target;
    console.log(location);
}
function generate(options) {
    return (context) => schematics_1.apply(schematics_1.url(core_1.join('./files')), [
        schematics_1.template(Object.assign({}, core_1.strings, options, { lowerCase: string_utils_1.lowerCase,
            upperCase: string_utils_1.upperCase })),
        schematics_1.move(options.path),
    ])(context);
}
function addDeclarationToModule(options) {
    return (tree) => {
        if (options.skipImport !== undefined && options.skipImport) {
            return tree;
        }
        options.module = new module_finder_1.ModuleFinder(tree).find({
            name: options.name,
            path: options.path,
        });
        if (!options.module) {
            return tree;
        }
        const content = tree.read(options.module).toString();
        const declarator = new module_declarator_1.ModuleDeclarator();
        tree.overwrite(options.module, declarator.declare(content, options));
        return tree;
    };
}
//# sourceMappingURL=entity.factory.js.map