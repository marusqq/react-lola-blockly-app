import Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([{
    "type": "math_arithmetic_three",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [{
        "type": "input_value",
        "name": "A",
        "check": "Number"
    },
        {
            "type": "field_dropdown",
            "name": "OP",
            "options": [
                ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
                ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
                ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
                ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
                ["%{BKY_MATH_POWER_SYMBOL}", "POWER"],
                ["&", "STATEMENT1"],
                ["#", "STATEMENT2"],
                [":", "STATEMENT3"],
                ["=", "STATEMENT4"]

            ]
        },
        {
            "type": "input_value",
            "name": "B",
            "check": "Number"
        },
        {
            "type": "field_dropdown",
            "name": "OP2",
            "options": [
                ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
                ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
                ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
                ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
                ["%{BKY_MATH_POWER_SYMBOL}", "POWER"],
                ["&", "STATEMENT1"],
                ["#", "STATEMENT2"],
                [":", "STATEMENT3"],
                ["=", "STATEMENT4"]
            ]
        },
        {
            "type": "input_value",
            "name": "C",
            "check": "Number"
        }
    ],
    "inputsInline": true,
    "output": "Number",
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": ["math_op_tooltip"]
},


    // Block for basic arithmetic operator.
    {
        "type": "math_arithmetic",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "A",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
                    ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
                    ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
                    ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
                    ["%{BKY_MATH_POWER_SYMBOL}", "POWER"],
                    ["&", "STATEMENT1"],
                    ["#", "STATEMENT2"],
                    [":", "STATEMENT3"],
                    ["=", "STATEMENT4"]
                ]
            },
            {
                "type": "input_value",
                "name": "B",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "output": "Number",
        "style": "math_blocks",
        "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
        "extensions": ["math_op_tooltip"]
    },

    // Block for advanced math operators with single operand.
    {
        "type": "math_single",
        "message0": "%1 %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["%{BKY_MATH_SINGLE_OP_ROOT}", 'ROOT'],
                    ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", 'ABS'],
                    ['-', 'NEG'],
                    ['ln', 'LN'],
                    ['log10', 'LOG10'],
                    ['e^', 'EXP'],
                    ['10^', 'POW10']
                ]
            },
            {
                "type": "input_value",
                "name": "NUM",
                "check": "Number"
            }
        ],
        "output": "Number",
        "style": "math_blocks",
        "helpUrl": "%{BKY_MATH_SINGLE_HELPURL}",
        "extensions": ["math_op_tooltip"]
    }])