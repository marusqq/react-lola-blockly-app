import Blockly from "blockly";
import DarkTheme from '@blockly/theme-dark'

import {
    toolboxCategories,
    createPlayground
} from "@blockly/dev-tools";

import * as lola from './Lola/lola.js';
import * as examples from './Lola/examples.js';
import {
    convertLolaToVerilog,
    checkLolaCodeValid,
    convertLolaToSystemC,
    convertLolaToC,
    convertLolaToLogisim,
    convertLolaToVHDL,
    simulateLolaCode,
    toggleValidCodeMethods,
    toggleInvalidCodeMethods,
    validLolaGeneratedCode,
    lastValidLolaGeneratedCode,
    invalidLolaGeneratedCode,
    lastInvalidLolaGeneratedCode,
    exportXml,
    importXml,
    consultChatGPT,
    testingDebug,
} from "./buttonMethods.js"
import {toastWarning} from "./userAlerts"
import {egg100, egg75, egg50, egg25, egg10} from "./eggs"
import * as blocks from "./Lola/blocks.js"

function configureContextMenu(menuOptions, e) {
    let workspace = this;

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
    media: '/media',
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

    // modify folders from core Blockly playground
    // -----------------------------------------------

    // delete DEBUG
    let debugFolder = gui.__folders['Debug']
    gui.removeFolder(debugFolder)

    // modify ACTIONS folder
    let actionsFolder = gui.__folders['Actions']

    let foldersToRemove = ['Visibility', 'Scale', 'Stress Test', 'Logging', 'Accessibility']
    let folderToRemove = ""

    for (const folderName of foldersToRemove) {
        folderToRemove = actionsFolder.__folders[folderName]
        actionsFolder.removeFolder(folderToRemove)
    }

    let fPresses = 0;
    let countingFPresses = true;
    const actions = {
        10: () => console.log(egg10),
        15: "clear",
        25: () => console.log(egg25),
        30: "clear",
        50: () => console.log(egg50),
        60: "clear",
        75: () => console.log(egg75),
        85: "clear",
        100: () => console.log(egg100),
        110: "clear",
        111: "stop"
    }

    document.addEventListener('keydown', function (event) {
        if (event.key.toLowerCase() === "f" && countingFPresses === true) {
            fPresses++;
            if (actions.hasOwnProperty(fPresses)) {
                const action = actions[fPresses];
                if (typeof action === "function") {
                    action();
                } else if (action === "clear") {
                    console.clear();
                } else if (action === "stop") {
                    countingFPresses = false;
                }
            }
        } else {
            fPresses = 0;
        }
    });

    // add needed folders / functions
    // /Lola/
    let lolaFolder = gui.addFolder('Lola')

    lolaFolder.add({"Simulate": simulateLolaCode}, "Simulate").onChange();
    lolaFolder.add({"Validate": checkLolaCodeValid}, "Validate").onChange();
    lolaFolder.add({"Ask ChatGPT about errors": consultChatGPT}, "Ask ChatGPT about errors").onChange();


    // /Lola/Exports
    let convertFolder = lolaFolder.addFolder('Convert Lola')

    // add lola exports
    convertFolder.add({"To Verilog": convertLolaToVerilog}, "To Verilog").onChange();
    convertFolder.add({"To C (experimental)": convertLolaToC}, "To C (experimental)").onChange();
    convertFolder.add({"To VHDL": convertLolaToVHDL}, "To VHDL").onChange();
    convertFolder.add({"To SystemC": convertLolaToSystemC}, "To SystemC").onChange();

    // not implemented
    convertFolder.add({"To Logisim": convertLolaToLogisim}, "To Logisim").onChange();

    // /Lola/Examples
    let examplesFolder = lolaFolder.addFolder('Examples')

    // /Lola/Examples/Basic
    let basicExamplesFolder = examplesFolder.addFolder('Basic Examples')

    basicExamplesFolder.add({"Adder.Lola": examples.adderBasic}, "Adder.Lola").onChange();

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

    // /Lola/Examples/Wirth Small Programs
    let wirthSmallPrograms = examplesFolder.addFolder('Wirth Small Programs')

    wirthSmallPrograms.add({"Counter.Lola": examples.counterExample}, "Counter.Lola").onChange();
    wirthSmallPrograms.add({"Shifter.Lola": examples.shifterExample}, "Shifter.Lola").onChange();


    // ADD XML options
    gui.add({"Export workspace as XML": exportXml}, "Export workspace as XML").onChange();
    gui.add({"Import workspace as XML": importXml}, "Import workspace as XML").onChange();

    // add debug
    gui.add({"Debug": testingDebug}, "Debug").onChange();

    // since the code was not validated, hide folders / functions
    toggleValidCodeMethods(false)

    // since there is no code, the code is not invalid
    toggleInvalidCodeMethods(false)
}

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
    let workspace = Blockly.inject(blocklyDiv, options);
    workspace.configureContextMenu = configureContextMenu.bind(workspace);

    workspace.registerButtonCallback('createVariableButton', function (button) {
        Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, '');
    });

    let lolaGeneratorPressed = false;
    const EVENTS_TO_PRESS_LOLA_GENERATOR = [
        Blockly.Events.TOOLBOX_ITEM_SELECT,
        Blockly.Events.BLOCK_CREATE
    ]

    const EVENTS_WITH_NO_CODE_CHANGE = [
        // opening toolbox does not change anything
        Blockly.Events.TOOLBOX_ITEM_SELECT,

        // comments obviously does not change code
        Blockly.Events.COMMENT_CHANGE,
        Blockly.Events.COMMENT_CREATE,
        Blockly.Events.COMMENT_MOVE,
        Blockly.Events.COMMENT_DELETE,

        // loading also doesn't change code
        Blockly.Events.FINISHED_LOADING,

        // clicking & selecting shouldn't change code
        Blockly.Events.CLICK,
        Blockly.Events.SELECTED,

        // opening trashcan doesn't change
        Blockly.Events.TRASHCAN_OPEN,

        // changing viewport or theme will not change the code also
        Blockly.Events.THEME_CHANGE,
        Blockly.Events.VIEWPORT_CHANGE
    ]

    // add listener:
    // -- for pressing Lola generator on first load
    // -- for block or code change if code is considered valid
    workspace.addChangeListener(function (event) {

        // -- for pressing Lola generator on first load
        if (EVENTS_TO_PRESS_LOLA_GENERATOR.includes(event.type) && !lolaGeneratorPressed) {
            const lolaTab = document.querySelector('[data-tab="Lola"]');
            if (lolaTab) {
                lolaTab.click();
                lolaGeneratorPressed = true;
            }
        }

        // -- for block or code change if code is considered valid
        // if event happens that could actually change the code
        if (!EVENTS_WITH_NO_CODE_CHANGE.includes(event.type)) {

            // if code is valid
            if (validLolaGeneratedCode) {

                // and current code != last valid code
                if (lastValidLolaGeneratedCode !== lola.generator.workspaceToCode(Blockly.getMainWorkspace())) {

                    // warn the user and set valid code to false
                    toastWarning("Previously validated code has been changed. " +
                        "New validation will be needed for code simulating & exporting ")
                    toggleValidCodeMethods(false)

                }
            }

            // if the code is invalid
            if(invalidLolaGeneratedCode) {
                // and current code != last invalid code
                if (lastInvalidLolaGeneratedCode !== lola.generator.workspaceToCode(Blockly.getMainWorkspace())) {

                    // don't warn the user here
                    toggleInvalidCodeMethods(false)

                }
            }
        }
    });

    // const observer = new MutationObserver(function(mutations) {
    //     console.log('hihi')
    //     mutations.forEach(function(mutation) {
    //         if (mutation.type === 'childList' && mutation.addedNodes.length) {
    //             const lolaTab = document.querySelector('[data-tab="Lola"]');
    //             console.log('childlist for each')
    //             if (lolaTab) {
    //                 console.log(lolaTab)
    //                 lolaTab.click();
    //                 observer.disconnect(); // Stop watching for changes once element is clicked
    //             }
    //         }
    //     });
    // });
    //
    // observer.observe(document.body, { childList: true, subtree: false });


    return workspace;
}