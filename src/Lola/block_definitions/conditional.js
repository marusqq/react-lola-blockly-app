import Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([{
    "type": "if_statement",
    "message0": "IF %1 %2 THEN %3 %4 ELSE %5 %6",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "if_value"
        },
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "then_value"
        },
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "else_value"
        }
    ],
    "inputsInline": false,
    "output": null,
    "colour": 30,
    "tooltip": "If statement",
    "helpUrl": ""
},
    {
        "type": "negative_variable",
        "message0": "~%1;",
        "args0": [
            {
                "type": "input_value",
                "name": "variable_name",
            }],
        "inputsInline": true,
        "output": null,
        "colour": 30,
        "tooltip": "Negative variable value",
        "helpUrl": ""

    }

])

// w0 := P.0 -> y : 0;


