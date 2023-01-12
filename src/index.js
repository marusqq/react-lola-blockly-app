import Blockly from "blockly";
import DarkTheme from '@blockly/theme-dark'
import {
    toolboxCategories,
    createPlayground
} from "@blockly/dev-tools";

import * as lola from './Lola/lola.js';
import * as examples from './Lola/examples.js';
import {
    dividerExample, fpaAdderExample, fpDividerExample, fpMultiplierExample,
    leftShifterExample,
    multiplierExample,
    rightShifterExample,
    riscExample
} from "./Lola/examples.js";


function configureContextMenu(menuOptions, e) {
    var workspace = this;
    var screenshotOption = {
        text: 'Download Screenshot',
        enabled: workspace.getTopBlocks().length,
        callback: function () {
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

function compileLola() {
    console.log('COMPILING LOLA')
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
    let gui = playground.getGUI();

    // Rendering
    let renderingFolder = gui.addFolder('Rendering');
    let renderingOptions = {'Font size': 10};

    // add rendering function
    renderingFolder.add(renderingOptions, 'Font size', 0, 50)
        .onChange(function (value) {
            let ws = playground.getWorkspace();
            let fontStyle = {
                'size': value
            };
            ws.getTheme().setFontStyle(fontStyle);
            // Refresh theme.
            ws.setTheme(ws.getTheme(''));
        });

    // Lola folder in workplace

    // /Lola/
    let lolaFolder = gui.addFolder('Lola')
    lolaFolder.add({"Compile Lola": compileLola}, "Compile Lola").onChange();

    // /Lola/Examples
    let examplesFolder = lolaFolder.addFolder('Examples')

    // /Lola/Examples/Wirth RISCV
    let wirthRiscFolder = examplesFolder.addFolder('Wirth RISC5')

    // add examples
    wirthRiscFolder.add({"RISC5.Lola": examples.riscExample}, "RISC5.Lola").onChange();

    wirthRiscFolder.add({"LeftShifter.Lola": examples.leftShifterExample}, "LeftShifter.Lola").onChange();
    wirthRiscFolder.add({"RightShifter.Lola": examples.rightShifterExample}, "RightShifter.Lola").onChange();

    wirthRiscFolder.add({"Multiplier.Lola": examples.multiplierExample}, "Multiplier.Lola").onChange();
    wirthRiscFolder.add({"Divider.Lola": examples.dividerExample}, "Divider.Lola").onChange();

    wirthRiscFolder.add({"FPAAdder.Lola": examples.fpaAdderExample}, "FPAAdder.Lola").onChange();
    wirthRiscFolder.add({"FPMultiplier.Lola": examples.fpMultiplierExample}, "FPMultiplier.Lola").onChange();
    wirthRiscFolder.add({"FPDivider.Lola": examples.fpDividerExample}, "FPDivider.Lola").onChange();
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
    .then(function (playground) {
        configurePlayground(playground);
    });


function createWorkspace(blocklyDiv, options) {
    var workspace = Blockly.inject(blocklyDiv, options);
    workspace.configureContextMenu = configureContextMenu.bind(workspace);

    workspace.registerButtonCallback('createVariableButton', function (button) {
        Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, '');
    });

    return workspace;
}