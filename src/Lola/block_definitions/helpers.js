import Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([
    // Text helper
    {
        "type": "text_helper_statement",
        "message0": "%1;",
        "args0": [
            {
                "type": "field_input",
                "name": "text_help",
                "text": "textHelpStatement"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 242,
        "tooltip": "Text helper block to help when there no blocks to write what is needed",
        "helpUrl": ""
    },

    {
        "type": "text_helper_statement_no_semicolon",
        "message0": "%1",
        "args0": [
            {
                "type": "field_input",
                "name": "text_help",
                "text": "textHelpStatementNoSemicolon"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 242,
        "tooltip": "Text helper block to help when there no blocks to write what is needed",
        "helpUrl": ""
    },

    {
        "type": "text_helper_variable",
        "message0": "%1",
        "args0": [
            {
                "type": "field_input",
                "name": "text_help",
                "text": "textHelpVariable"
            }
        ],
        "output": null,
        "colour": 242,
        "tooltip": "Text helper block to help when there no blocks to write what is needed",
        "helpUrl": ""
    },

])
