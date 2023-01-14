import Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([

    // ------------------------ MODULE BLOCK ------------------------
    {
        "type": "module_block",
        "message0": "MODULE %1; %2 %3 BEGIN %4 %5 END.",
        "args0": [{
                "type": "field_input",
                "name": "module_name",
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
        "tooltip": "",
        "helpUrl": ""
    },

    // ------------------------ TYPE BLOCK ------------------------

    {
        "type": "type_block",
        "message0": "TYPE %1; %2 %3 BEGIN %4 %5 END;",
        "args0": [{
                "type": "field_input",
                "name": "type_name",
                "text": "typeName"
            },
            {
                "type": "input_dummy",
                "align": "CENTRE"
            },
            {
                "type": "input_statement",
                "name": "type_declarations"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "type_statements"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 169,
        "tooltip": "",
        "helpUrl": ""
    }

])