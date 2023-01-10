import Blockly from "blockly/core";

// Math?
Blockly.defineBlocksWithJsonArray([
    {
        "type": "math_arithmetic_three",
        "message0": "%1 %2 %3 %4 %5",
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
              ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
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
              ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
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
    }

])

Blockly.defineBlocksWithJsonArray([

    // ------------------------ MODULE BLOCK ------------------------
    {
        "type": "module_block",
        "message0": "MODULE %1; %2 %3 BEGIN %4 %5 END.",
        "args0": [
        {
            "type": "field_input",
            "name": "module_name",
            "text": "module_name"
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
        "args0": [
        {
            "type": "field_input",
            "name": "type_name",
            "text": "type_name"
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