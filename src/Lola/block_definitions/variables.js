import Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([
    // Variable name get block
    {
        "type": "variables_name_get",
        "message0": "%1",
        "args0": [{
            "type": "field_variable",
            "name": "VAR",
            "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
        }],
        "output": null,
        "style": "variable_blocks",
        "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
        "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
        "extensions": ["contextMenu_variableSetterGetter"]
    },

    //CONST declaration with value
    {
        "type": "constant_declaration_block",
        "message0": "%1 %2 %3",
        "args0": [{
            "type": "field_label_serializable",
            "name": "const",
            "text": "CONST"
        },
            {
                "type": "field_variable",
                "name": "variable",
                "variable": "item"
            },
            {
                "type": "input_value",
                "name": "variable_value",
                "check": "Number"
            }
        ],
        "inputsInline": false,
        "style": "variable_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "",
        "helpUrl": ""
    },

    // variable declaration no value
    {
        "type": "constant_declaration_block_no_value",
        "message0": "%1 %2",
        "args0": [{
            "type": "field_label_serializable",
            "name": "const",
            "text": "CONST"
        },
            {
                "type": "field_variable",
                "name": "variable",
                "variable": "item"
            },
        ],
        "inputsInline": false,
        "style": "variable_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "",
        "helpUrl": ""
    },

    // Variable declaration block
    {
        "type": "variable_declaration_block",
        "message0": "%1 %2 : %3 ;",
        "args0": [{
            "type": "field_dropdown",
            "name": "variable_in_out_type",
            "options": [
                [
                    "IN",
                    "IN"
                ],
                [
                    "INOUT",
                    "INOUT"
                ],
                [
                    "OUT",
                    "OUT"
                ],
                [
                    "VAR",
                    "VAR"
                ],
                [
                    "WORD",
                    "WORD"
                ],
                [
                    "BYTE",
                    "BYTE"
                ],
                [
                    "REG",
                    "REG"
                ],
            ]
        },
            {
                "type": "input_value",
                "name": "variable_in_out",
            },
            {
                "type": "field_dropdown",
                "name": "variable_type",
                "options": [
                    [
                        "BIT",
                        "BIT"
                    ],
                    [
                        "TS",
                        "TS"
                    ],
                    [
                        "OC",
                        "OC"
                    ],
                    [
                        "WORD",
                        "WORD"
                    ],
                    [
                        "BYTE",
                        "BYTE"
                    ],
                    [
                        "REG",
                        "REG"
                    ],
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "variable_declaration_block_2",
        "message0": "%1: %2 %3;",
        "args0": [
            {
                "type": "input_value",
                "name": "variable_name",
            },
            {
                "type": "input_value",
                "name": "variable_in_out",
            },
            {
                "type": "field_dropdown",
                "name": "variable_type",
                "options": [
                    [
                        "BIT",
                        "BIT"
                    ],
                    [
                        "TS",
                        "TS"
                    ],
                    [
                        "OC",
                        "OC"
                    ],
                    [
                        "WORD",
                        "WORD"
                    ],
                    [
                        "BYTE",
                        "BYTE"
                    ],
                    [
                        "REG",
                        "REG"
                    ],
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "variable_declaration_block_3",
        "message0": "%1: %2;",
        "args0": [
            {
                "type": "input_value",
                "name": "variable_name",
            },
            {
                "type": "field_dropdown",
                "name": "variable_type",
                "options": [
                    [
                        "BIT",
                        "BIT"
                    ],
                    [
                        "TS",
                        "TS"
                    ],
                    [
                        "OC",
                        "OC"
                    ],
                    [
                        "WORD",
                        "WORD"
                    ],
                    [
                        "BYTE",
                        "BYTE"
                    ],
                    [
                        "REG",
                        "REG"
                    ],
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "variable_declaration_block_4",
        "message0": "%1 %2 : [%3] %4 ;",
        "args0": [{
            "type": "field_dropdown",
            "name": "variable_in_out_type",
            "options": [
                [
                    "IN",
                    "IN"
                ],
                [
                    "INOUT",
                    "INOUT"
                ],
                [
                    "OUT",
                    "OUT"
                ],
                [
                    "VAR",
                    "VAR"
                ],
                [
                    "WORD",
                    "WORD"
                ],
                [
                    "BYTE",
                    "BYTE"
                ],
                [
                    "REG",
                    "REG"
                ],
            ]
        },
            {
                "type": "input_value",
                "name": "variable_in_out",
            },
            {
                "type": "input_value",
                "name": "bit_variable",
            },
            {
                "type": "field_dropdown",
                "name": "variable_type",
                "options": [
                    [
                        "BIT",
                        "BIT"
                    ],
                    [
                        "TS",
                        "TS"
                    ],
                    [
                        "OC",
                        "OC"
                    ],
                    [
                        "WORD",
                        "WORD"
                    ],
                    [
                        "BYTE",
                        "BYTE"
                    ],
                    [
                        "REG",
                        "REG"
                    ],
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {"type": "variable_declaration_block_5",
        "message0": "%1 %2",
        "args0": [{
            "type": "field_dropdown",
            "name": "variable_in_out_type",
            "options": [
                [
                    "IN",
                    "IN"
                ],
                [
                    "INOUT",
                    "INOUT"
                ],
                [
                    "OUT",
                    "OUT"
                ],
                [
                    "VAR",
                    "VAR"
                ],
                [
                    "WORD",
                    "WORD"
                ],
                [
                    "BYTE",
                    "BYTE"
                ],
                [
                    "REG",
                    "REG"
                ],
            ]
        },
        {
            "type": "input_value",
            "name": "variable_in_out",
        },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "two_variables_comma",
        "message0": "%1, %2",
        "args0": [
            {
                "type": "input_value",
                "name": "var1",
            },
            {
                "type": "input_value",
                "name": "var2",
            },

        ],
        "inputsInline": true,
        "output": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "two_variables_dot",
        "message0": "%1.%2",
        "args0": [
            {
                "type": "input_value",
                "name": "var1",
            },
            {
                "type": "input_value",
                "name": "var2",
            },

        ],
        "inputsInline": true,
        "output": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "two_variables_apostrophe",
        "message0": "%1'%2",
        "args0": [
            {
                "type": "input_value",
                "name": "var1",
            },
            {
                "type": "input_value",
                "name": "var2",
            },

        ],
        "inputsInline": true,
        "output": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "variable_bit_check",
        "message0": "%1[%2:%3]",
        "args0": [
            {
                "type": "input_value",
                "name": "var",
            },
            {
                "type": "input_value",
                "name": "bit_start",
            },
            {
                "type": "input_value",
                "name": "bit_end",
            },

        ],
        "inputsInline": true,
        "output": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "brackets_block",
        "message0": "%1 %2 %3 %4",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "bracketsLeft",
                "options": [
                    [
                        "{",
                        "curlyLeft"
                    ],
                    [
                        "(",
                        "normalLeft"
                    ],
                    [
                        "[",
                        "squaredLeft"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "variableInside"
            },
            {
                "type": "field_dropdown",
                "name": "bracketsRight",
                "options": [
                    [
                        "}",
                        "curlyRight"
                    ],
                    [
                        ")",
                        "normalRight"
                    ],
                    [
                        "]",
                        "squaredRight"
                    ]
                ]
            }
        ],
        "inputsInline": true,
        "output": null,
        "colour": 19,
        "tooltip": "Brackets for variables",
        "helpUrl": ""
    }

])