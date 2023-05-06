import * as lola from './Lola/lola.js';
import Blockly from 'blockly/core';
import Swal from 'sweetalert2';

import {
    ONLY_CLOSABLE_TOASTR_SETTINGS,
    toastError,
    toastInfo,
    toastSuccess,
    toastWarning
} from "./userAlerts";
import {save} from "./util"

let currentLolaValidationErrors = ''

export let validLolaGeneratedCode = false
export let invalidLolaGeneratedCode = false
export let lastValidLolaGeneratedCode = ''
export let lastInvalidLolaGeneratedCode = ''


export function toggleValidCodeMethods(on) {

    const VALID_CODE_FUNCTIONS = ['Simulate']
    const VALID_CODE_FOLDERS = ['Convert Lola']

    // remove or add valid code folders
    VALID_CODE_FOLDERS.forEach(validCodeFolder => {
        toggleFolder(validCodeFolder, on)
    })

    // remove or add valid code functions
    VALID_CODE_FUNCTIONS.forEach(validCodeFunction => {
        toggleFunction(validCodeFunction, on)
    })

    // save global variable if code is valid right now
    validLolaGeneratedCode = on

    // save last valid code, if code was invalidated => set 'none'
    lastValidLolaGeneratedCode = on ? lola.generator.workspaceToCode(Blockly.getMainWorkspace()) : 'none';
}

export function toggleInvalidCodeMethods(on) {

    const INVALID_CODE_FUNCTIONS = ['Ask ChatGPT about errors']
    // const INVALID_CODE_FOLDERS = ['Convert Lola']

    // remove or add invalid code folders
    // VALID_CODE_FOLDERS.forEach(validCodeFolder => {
    //     toggleFolder(validCodeFolder, on)
    // })

    // remove or add valid code functions
    INVALID_CODE_FUNCTIONS.forEach(invalidCodeFunction => {
        toggleFunction(invalidCodeFunction, on)
    })

    // save global variable if code is invalid right now
    invalidLolaGeneratedCode = on

    // save last invalid code, if code was invalidated => set 'none'
    lastInvalidLolaGeneratedCode = on ? lola.generator.workspaceToCode(Blockly.getMainWorkspace()) : 'none';
}

// toggleFunction('Simulate', false)
function toggleFunction(functionName, on) {
    const functionElements = document.querySelectorAll('li.cr.function');
    for (let i = 0; i < functionElements.length; i++) {
        const functionElement = functionElements[i];
        const functionNameElement = functionElement.querySelector('div span.property-name');
        const name = functionNameElement.textContent.trim();

        if (name === functionName) {
            functionElement.style.display = on ? 'list-item' : 'none';
            break;
        }
    }
}

// toggleFolder('Lola', false)
function toggleFolder(folderName, on) {
    const folderElements = document.querySelectorAll('li.folder');
    for (let i = 0; i < folderElements.length; i++) {
        const folderElement = folderElements[i];
        const titleElement = folderElement.querySelector('div.dg ul li.title');
        const title = titleElement.textContent.trim();

        if (title === folderName) {
            folderElement.style.display = on ? 'list-item' : 'none';
            break;
        }
    }
}

export async function checkLolaCodeValid() {

    // get generated code
    const generatedCode = lola.generator.workspaceToCode(Blockly.getMainWorkspace());

    try {
        const response = await fetch('/validate-lola', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code: generatedCode})
        });

        const content = await response.json();

        if (content.valid) {
            toggleValidCodeMethods(true)
            toggleInvalidCodeMethods(false)
            toastSuccess(`Simulating & Converting Lola code is now available`);
            toastSuccess(`Lola code is valid.`)

        } else if (content.emptyCode) {

            currentLolaValidationErrors = content.compilationErrors.join('\n -')
            let message = `Validation failed.\nErrors:\n - ${content.compilationErrors.join('\n -')}`
            toggleValidCodeMethods(false)
            toastInfo(message);

        } else {
            currentLolaValidationErrors = content.compilationErrors.join('\n -')
            let message = `Validation failed.\nErrors:\n - ${content.compilationErrors.join('\n -')}`
            toggleValidCodeMethods(false)
            toggleInvalidCodeMethods(true)
            toastWarning(message, ONLY_CLOSABLE_TOASTR_SETTINGS);
        }

    } catch (error) {
        console.error(error);
        toggleValidCodeMethods(false)
        toastError('An error occurred while processing your request. Please try again later.');
    }
}

export async function convertLolaToVerilog() {

    const generatedCode = lola.generator.workspaceToCode(Blockly.getMainWorkspace());
    const moduleName = lola.getModuleNameLolaCode(generatedCode)

    try {
        const response = await fetch('/lola-to-verilog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code: generatedCode})
        });

        const content = await response.json();

        if (content.compiled) {
            toastSuccess(`Downloading ${moduleName} in Verilog`)
            save(`${moduleName}.v`, content.verilogCode);

        } else if (content.emptyCode) {
            let message = `Converting to Verilog failed.\nErrors:\n - ${content.compilationErrors.join('\n -')}`
            toastInfo(message);

        } else {
            let message = `Converting to Verilog failed.\nErrors:\n - ${content.compilationErrors.join('\n -')}`
            toastWarning(message, ONLY_CLOSABLE_TOASTR_SETTINGS);
        }
    } catch (error) {
        console.error(error);
        toastError('An error occurred while processing your request. Please try again later.');
    }
}

export async function convertLolaToVHDL() {
    const generatedCode = lola.generator.workspaceToCode(Blockly.getMainWorkspace());
    const moduleName = lola.getModuleNameLolaCode(generatedCode)

    try {
        const response = await fetch('/lola-to-vhdl', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code: generatedCode})
        });

        const content = await response.json();

        if (content.converted) {
            toastSuccess(`Downloading ${moduleName} in VHDL`)
            save(`${moduleName}.vhdl`, content.code);

        } else {
            let message = `Converting ${moduleName} to VHDL failed.\nErrors:\n - ${content.conversionErrors.join('\n -')}`
            toastWarning(message, ONLY_CLOSABLE_TOASTR_SETTINGS);
        }
    } catch (error) {
        console.error(error);
        toastError('An error occurred while processing your request. Please try again later.');
    }
}

export async function convertLolaToC() {
    const generatedCode = lola.generator.workspaceToCode(Blockly.getMainWorkspace());
    const moduleName = lola.getModuleNameLolaCode(generatedCode)

    try {
        const response = await fetch('/lola-to-c', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code: generatedCode, moduleName: moduleName})
        });

        const content = await response.json();

        if (content.converted) {
            toastSuccess(`Downloading ${moduleName} in C`)
            save(`${moduleName}.c`, content.code);

        } else {
            let message = `Converting to ${moduleName} C failed.\nErrors:\n - ${content.conversionErrors.join('\n -')}`
            toastWarning(message, ONLY_CLOSABLE_TOASTR_SETTINGS);
        }
    } catch (error) {
        console.error(error);
        toastError('An error occurred while processing your request. Please try again later.');
    }
}

export async function convertLolaToPython() {
    toastInfo("not implemented yet")
}


export async function convertLolaToGo() {
    toastInfo("not implemented yet")
}

export async function convertLolaToLogisim() {
    toastInfo("not implemented yet")
}

export async function simulateLolaCode() {
    toastInfo("being developed")
}

export async function consultChatGPT() {

    // get generated code
    const generatedCode = lola.generator.workspaceToCode(Blockly.getMainWorkspace());
    toastInfo("Question sent to ChatGPT. Waiting for answer...")
    try {
        const response = await fetch('/ask-chat-gpt-lola', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lolaCode: generatedCode, lolaErrors: currentLolaValidationErrors})
        });

        const content = await response.json();

        if (content.status === 200) {
            await Swal.fire({
                title: 'ChatGPT:',
                icon: "info",
                position: "top-right",
                text: content.response
            })

        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                position: "top-right",
                text: content.response
            })
        }
    } catch (error) {
        console.error(error);
        toastError('An error occurred while processing your request. Please try again later.');
    }

}

export function sendXmlToWorkspace(xml, addXml, filename) {

    if (addXml)
        xml = '<xml>' + xml + '</xml>';

    // confirm that xml is valid
    let dom = ''
    try {
        dom = Blockly.utils.xml.textToDom(xml);
    } catch (error) {
        let message = `Reading XML failed.\n${error}`
        toastWarning(message, ONLY_CLOSABLE_TOASTR_SETTINGS);
        return
    }

    const workspaceDom = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace())
    const workspacePrettyXml = Blockly.Xml.domToPrettyText(workspaceDom)

    const tagRegex = /<\/?xml[^>]*>/gm;
    const workspaceWithoutXMLTags = workspacePrettyXml.replace(tagRegex, '');


    // if empty current workspace, just instantly import
    if (workspaceWithoutXMLTags.trim().length === 0) {
        // clear variables
        Blockly.getMainWorkspace().clear()

        // write xml to workspace
        Blockly.Xml.domToWorkspace(dom, Blockly.getMainWorkspace());
        toastSuccess(`Workspace ${filename} imported successfully`)

    } else {

        Swal.fire({
            title: "Workspace XML import",
            text: "Importing new workspace will discard current one.\n" +
                "Do you want to export current workspace as XML?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: "Discard",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed || result.isDenied) {

                // save current workspace as XML
                if (result.isConfirmed) {
                    exportXml()
                }

                // clear variables
                Blockly.getMainWorkspace().clear()

                // write xml to workspace
                Blockly.Xml.domToWorkspace(dom, Blockly.getMainWorkspace());
                toastSuccess(`Workspace ${filename} imported successfully`)


            } else {
                toastInfo("Workspace XML import cancelled")
            }
        })
    }
}

export function importXml() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xml';

    // user selects a file
    input.onchange = () => {
        const file = input.files[0];

        // file extension = .xml only
        if (!file || !file.name.endsWith('.xml')) {
            toastWarning('Please select an XML file');
            return;
        }

        const reader = new FileReader();

        // when the file has been read
        reader.onload = (event) => {
            const xml = event.target.result;
            sendXmlToWorkspace(xml, false, file.name);
            toastSuccess(`Workspace ${file.name} loaded`);
        };

        // file => text
        reader.readAsText(file);

        // remove input
        document.body.removeChild(input);
    };

    // trigger input with pressing
    input.click();

    // Append the input element to the body
    document.body.appendChild(input);
}

export function exportXml() {
    const dom = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace())
    const prettyXml = Blockly.Xml.domToPrettyText(dom)

    const tagRegex = /<\/?xml[^>]*>/gm;
    const xmlWithoutXmlTags = prettyXml.replace(tagRegex, '');

    if (xmlWithoutXmlTags.trim().length === 0) {
        toastInfo("Empty workspace. Nothing to export")
    } else {
        toastSuccess("Workspace exported")
        save('blockly.xml', prettyXml)
    }

}

export function testingDebug() {
    toastInfo("hi :)")
}