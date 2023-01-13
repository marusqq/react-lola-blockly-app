import Blockly from "blockly/core";

function _sendXmlToWorkspace(xml) {
    xml = '<xml>' + xml + '</xml>';
    const dom = Blockly.Xml.textToDom(xml);
    Blockly.Xml.domToWorkspace(dom, Blockly.getMainWorkspace());
}

export function riscExample() {
    const riscXml = [
        '  <block type="controls_if">',
        '    <value name="IF0">',
        '      <block type="logic_compare">',
        '        <field name="OP">EQ</field>',
        '        <value name="A">',
        '          <block type="math_arithmetic">',
        '            <field name="OP">MULTIPLY</field>',
        '            <value name="A">',
        '              <block type="math_number">',
        '                <field name="NUM">6</field>',
        '              </block>',
        '            </value>',
        '            <value name="B">',
        '              <block type="math_number">',
        '                <field name="NUM">7</field>',
        '              </block>',
        '            </value>',
        '          </block>',
        '        </value>',
        '        <value name="B">',
        '          <block type="math_number">',
        '            <field name="NUM">42</field>',
        '          </block>',
        '        </value>',
        '      </block>',
        '    </value>',
        '    <statement name="DO0"></statement>',
        '    <next></next>',
        '  </block>'].join('\n');

    const risc = [

    ]

    _sendXmlToWorkspace(riscXml)
}

export function leftShifterExample() {
    console.log('Left Shifter example')
}

export function rightShifterExample() {
    console.log('Right Shifter example')
}

export function multiplierExample() {
    console.log('Multiplier example')
}

export function dividerExample() {
    console.log('Divider example')
}

export function fpaAdderExample() {
    console.log('fpaAdder example')
}

export function fpMultiplierExample() {
    console.log('fpMultiplier example')
}

export function fpDividerExample() {
    console.log('fpDivider example')
}