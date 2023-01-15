import Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([

    // ------------------------ MODULE BLOCK ------------------------
    // no begin declaration and module parameters
    {
        "type": "module_block",
        "message0": "MODULE %1; %2 %3 BEGIN %4 %5 END.",
        "args0": [{
            "type": "field_input",
            "name": "moduleName",
            "text": "moduleName"
        },
            {
                "type": "input_dummy",
                "align": "CENTRE"
            },
            {
                "type": "input_statement",
                "name": "module_declarations"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "module_statements"
            }
        ],
        "colour": 69,
        "tooltip": "Module definition block with no begin declaration and module parameters",
        "helpUrl": ""
    },

    // ------------------------ MODULE BLOCK ------------------------
    // both begin declaration and module parameter
    {
        "type": "module_block_module_begin",
        "message0": "MODULE %1 ( %2 %3 ); %4 %5 BEGIN %6 %7 END. %8 %9",
        "args0": [
            {
                "type": "field_input",
                "name": "moduleName",
                "text": "moduleName"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "module_parameters_input"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "module_declaration_input"
            },
            {
                "type": "input_statement",
                "name": "begin_parameters_input"
            },
            {
                "type": "input_statement",
                "name": "module_statements_input"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_dummy"
            }
        ],
        "inputsInline": true,
        "colour": 69,
        "tooltip": "Block for generating module with begin declaration and module parameters",
        "helpUrl": ""
    },

    // ------------------------ MODULE BLOCK ------------------------
    // with begin declaration but with no module parameters

    {
        "type": "module_block_begin",
        "message0": "MODULE %1; %2 %3 %4 BEGIN %5 %6 END. %7 %8",
        "args0": [
            {
                "type": "field_input",
                "name": "moduleName",
                "text": "moduleName"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "module_declaration_input"
            },
            {
                "type": "input_statement",
                "name": "begin_parameters_input"
            },
            {
                "type": "input_statement",
                "name": "module_statements_input"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_dummy"
            }
        ],
        "inputsInline": true,
        "colour": 69,
        "tooltip": "Block for generating module with begin declaration",
        "helpUrl": ""
    },
    {
        "type": "module_block_module",
        "message0": "MODULE %1 ( %2 %3 ); %4 %5 BEGIN %6 %7 END. %8 %9",
        "args0": [
            {
                "type": "field_input",
                "name": "moduleName",
                "text": "moduleName"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "module_parameters_input"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "module_declaration_input"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "module_statements_input"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_dummy"
            }
        ],
        "inputsInline": true,
        "colour": 69,
        "tooltip": "Block for generating module with module parameters but no begin declaration",
        "helpUrl": ""
    }

])
