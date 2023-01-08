// React
import React from 'react';

// Blockly
import Blockly from "blockly";
import { createPlayground, toolboxCategories } from "@blockly/dev-tools";

// Lola
// import {lolaToolbox} from './lola-constants';

// constants
const lolaGenerator = new Blockly.Generator('Lola');

const lolaToolbox = `
<xml id="toolbox" style="display: none">

  <category name="Modules and Types">
    <block type="module_block"></block>
    <block type="type_block"></block>
  </category>

  <category name="Variables">
    <button text="Create Variable" callbackKey="createVariableButton"></button>
    <block type="variables_set"></block>
    <block type="variables_get"></block>
    <block type="variables_name_get"></block>
    <block type="constant_declaration_block"/>
    <block type="variable_declaration_block"></block>
  </category>

  <category name="Loops">
    <block type="controls_for"/>
  </category>

  <category name="Text">
    <block type="text"><field name="TEXT"/></block>
    <block type="comment_block"/>
  </category>

  <category name="Math">
    <block type="math_number"><field name="NUM">0</field></block>
    <block type="math_arithmetic"/>
    <block type="math_arithmetic_three"/>
    <block type="math_single"/>
  </category>

  <category name="Other">
    <block type="logic_boolean"><field name="BOOL">TRUE</field></block>
    <block type="logic_null"/>
    <block type="lists_create_with"><mutation items="3"/></block>
  </category>
</xml>
`

const createWorkspace = (blocklyDiv, options) => {
  return Blockly.inject(blocklyDiv, options);
};

const playgroundConfig = {
  toolboxes: {
    'categories': toolboxCategories,
    
  }
}

const defaultOptions = {
  comments: true,
  trashcan: true,
  collapse: true,
  disable: true,
  grid:
    {
      spacing: 25,
      length: 3,
      colour: '#ccc',
      snap: true
    },
  horizontalLayout: false,
  maxBlocks: Infinity,
  maxInstances: {'test_basic_limit_instances': 3},
  maxTrashcanContents: 256,
  media: '../../media/',
  oneBasedIndex: true,
  readOnly: false,
  theme: Blockly.Themes.Dark,
  rtl: false,
  move: {
    scrollbars: true,
    drag: true,
    wheel: false,
  },
  toolbox: lolaToolbox,
  toolboxPosition: 'start',
  renderer: 'geras',
  zoom:
    {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 4,
      minScale: 0.25,
      scaleSpeed: 1.1
    }
};

export default function App() {
  createPlayground()
}

function configurePlayground(playground) {
  // Rendering options.
  var gui = playground.getGUI();
  playground.addGenerator('Lola', lolaGenerator)
  playground.removeGenerator('JavaScript');
  playground.removeGenerator('Lua');
  playground.removeGenerator('PHP');
  playground.removeGenerator('Dart');
  playground.removeGenerator('XML');
  playground.removeGenerator('Python');
  playground.removeGenerator('JSON')
  var renderingFolder = gui.addFolder('Rendering');
  var renderingOptions = {
    'font Size': 10,
  };
  renderingFolder.add(renderingOptions, 'font Size', 0, 50)
    .onChange(function(value) {
      var ws = playground.getWorkspace();
      var fontStyle = {
        'size': value
      };
      ws.getTheme().setFontStyle(fontStyle);
      // Refresh theme.
      ws.setTheme(ws.getTheme(''));
    });
}

createPlayground(document.getElementById('blocklyArea'), createWorkspace,
      defaultOptions, playgroundConfig,
      'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.19.2/min/vs')
      .then(function(playground) {
        configurePlayground(playground);
      });

