import Blockly from "blockly";
import BlocklyCore from "blockly/core"
import DarkTheme from '@blockly/theme-dark'

import * as lola from './Lola/lola.js';
import * as blocks from "./Lola/blocks.js"
import { spaghetti } from "@blockly/dev-tools";


import {
    toolboxCategories,
    createPlayground
} from "@blockly/dev-tools";


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
    // menuOptions.push(Blockly.ContextMenu.workspaceCommentOption(workspace, e));
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
    grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true
    },
    horizontalLayout: false,
    maxBlocks: Infinity,
    maxInstances: {
        'test_basic_limit_instances': 3
    },
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
    renderer: 'minimalist',
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1
    }
};

function callback_peepee() {
  console.log('callback_peepee')
}


function configurePlayground(playground) {

    // remove unneeded generators from playground
    playground.removeGenerator('JavaScript');
    playground.removeGenerator('Lua');
    playground.removeGenerator('PHP');
    playground.removeGenerator('Dart');
    playground.removeGenerator('XML');
    playground.removeGenerator('Python');
    playground.removeGenerator('JSON');

    // add lola generator
    playground.addGenerator('Lola', lola.generator);
    
    // Folders in playground
    // ------------------------------------------------------------
    var gui = playground.getGUI();

    // add folder to playground
    var renderingFolder = gui.addFolder('Rendering');
    var renderingOptions = {
        'Font size': 10,
    };

    // add rendering function
    renderingFolder.add(renderingOptions, 'Font size', 0, 50)
        .onChange(function(value) {
            var ws = playground.getWorkspace();
            var fontStyle = {
                'size': value
            };
            ws.getTheme().setFontStyle(fontStyle);
            // Refresh theme.
            ws.setTheme(ws.getTheme(''));
        });

    
    console.log('gui:')
    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(gui)));

    // /Lola/
    var lolaFolder = gui.addFolder('Lola')
    // gui.destroy('Debug')

    // /Lola/Examples
    var examplesFolder = lolaFolder.addFolder('Examples')
    console.log('folders:')
    // examplesFolder.add.onPress(spaghetti)
    examplesFolder.add().

    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(examplesFolder)));
    
    // /Lola/Examples/Wirth RISCV
    // var renderingOptions = {
    //   'Font size': 10,
    // };
    
    // var wirthRiscvFolder = examplesFolder.addFolder('Wirth RISC-V')
    // wirthRiscvFolder.add.onPress(function(value) {
    //   var ws = playground.getWorkspace();
      
    // });

    // var exampleFolder = gui.addFolder('Lola Examples');
    // console.log('exampleFolder:')
    // 
    // riscvWirthFolder = exampleFolder.addFolder('RISC-v prof. Wirth')
    // riscvWirthFolder.add()
    


    // exampleFolder.addAction('action', callback_peepee)
    
    
    // // add that rendering
    // exampleFolder.add(renderingOptions, 'Examples', 0, 50)
    //     .onChange(function(value) {
    //         var ws = playground.getWorkspace();
    //         var fontStyle = {
    //             'size': value
    //         };
    //         ws.getTheme().setFontStyle(fontStyle);
    //         // Refresh theme.
    //         ws.setTheme(ws.getTheme(''));
    //     });

    
}

// create playground:
// on <div name='blocklyArea'></div>

// create workspace: createWorkspace()
// options: defaultOptions
// playground: playgroundConfig
// also => configurePlayground(playground)

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
    var workspace = Blockly.inject(blocklyDiv, options);
    workspace.configureContextMenu = configureContextMenu.bind(workspace);

    workspace.registerButtonCallback('createVariableButton', function(button) {
        Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, '');
    });

    return workspace;
}