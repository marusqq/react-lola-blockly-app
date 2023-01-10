import Blockly from "blockly";
// import Blockly from 'blockly/core';
import BlocklyCore from "blockly/core"
import DarkTheme from '@blockly/theme-dark'
import * as lola from './Lola/lola.js';
import * as blocks from "./Lola/lolaBlocks.js"
// import  "@blockly/theme-dark"
import {toolboxCategories, createPlayground} from "@blockly/dev-tools";
import { BlocklyWorkspace } from "react-blockly";

// constants
// const lolaGenerator = new Blockly.Generator('Lola')

        
function configureContextMenu(menuOptions, e) {
  var workspace = this;
  var screenshotOption = {
    text: 'Download Screenshot',
    enabled: workspace.getTopBlocks().length,
    callback: function() {
      Blockly.downloadScreenshot(workspace);
    }
  };
  menuOptions.push(screenshotOption);

  // Adds a default-sized workspace comment to the workspace.
  menuOptions.push(Blockly.ContextMenu.workspaceCommentOption(workspace, e));
}

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
  media: '../node_modules/blockly/media/',
  oneBasedIndex: true,
  readOnly: false,
  theme: DarkTheme, 
  rtl: false,
  move: {
    scrollbars: true,
    drag: true,
    wheel: false,
  },
  toolbox: lola.toolbox,
  toolboxPosition: 'start',
  renderer: 'zelos',
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

function configurePlayground(playground) {
  // Rendering options.
  var gui = playground.getGUI();

  playground.removeGenerator('JavaScript');
  playground.removeGenerator('Lua');
  playground.removeGenerator('PHP');
  playground.removeGenerator('Dart');
  playground.removeGenerator('XML');
  playground.removeGenerator('Python');
  playground.removeGenerator('JSON');

  playground.addGenerator('Lola', lola.generator);

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

createPlayground(
  document.getElementById('blocklyArea'), 
  createWorkspace,
  defaultOptions, 
  playgroundConfig,
  'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.19.2/min/vs')
  .then(function(playground) {
      configurePlayground(playground);
    });


function createWorkspace(blocklyDiv, options) {
  console.log('createWorkspace()')
  var workspace = Blockly.inject(blocklyDiv, options);
  workspace.configureContextMenu = configureContextMenu.bind(workspace);

  workspace.registerButtonCallback('createVariableButton', function(button) {
    Blockly.Variables.createVariable(button.getTargetWorkspace(), null, '');
  });

  return workspace;
} 