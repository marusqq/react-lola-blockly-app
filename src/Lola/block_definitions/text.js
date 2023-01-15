import Blockly from "blockly/core";

Blockly.defineBlocksWithJsonArray([
    // Comment block
    {
        "type": "comment_block",
        "message0": "(* %1 *)",
        "args0": [{
            "type": "field_input",
            "name": "comment",
            "text": "single_line_comment"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "",
        "helpUrl": ""
    }

])
