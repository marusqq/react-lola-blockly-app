import * as lola from './lola.js';
import Blockly from 'blockly';
import toastr from 'toastr';

const GLOBAL_TOASTR_SETTINGS = {
    positionClass: 'toast-bottom-right',
    preventDuplicates: false,
    closeButton: true,
    progressBar: true,
    timeOut: 5000,
    extendedTimeOut: 2000,
    escapeHtml: false
};

const ONLY_CLOSABLE_TOASTR_SETTINGS = {
    timeOut: 0,
    extendedTimeOut: 0,
    closeButton: true,
    tapToDismiss: false,
}

function convertNewlinesToBr(str) {
    return str.replace(/\n/g, '<br>');
}

function toastSuccess(message, options = {}) {
    toastr.success(convertNewlinesToBr(message), '', {...GLOBAL_TOASTR_SETTINGS, ...options});
}

function toastError(message, options = {}) {
    toastr.error(convertNewlinesToBr(message), '', {...GLOBAL_TOASTR_SETTINGS, ...options});
}

function toastWarning(message, options = {}) {
    toastr.warning(convertNewlinesToBr(message), '', {...GLOBAL_TOASTR_SETTINGS, ...options});
}

function toastInfo(message, options = {}) {
    toastr.info(convertNewlinesToBr(message), '', {...GLOBAL_TOASTR_SETTINGS, ...options});
}

function save(filename, data) {
    const blob = new Blob([data], {type: 'text/csv'});
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}


export async function convertLolaToVerilog() {

    // get generated code
    const generatedCode = lola.generator.workspaceToCode(Blockly.getMainWorkspace());

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
            const download = window.confirm(
                'Lola code was compiled and is correct\n' +
                'Do you want to download it as verilog?'
            );

            if (download) {
                save('verilog.v', content.verilogCode);
            }
        } else {
            alert(`Lola code is incorrect\nErrors:\n${content.compilationErrors.join('\n')}`);
        }
    } catch (error) {
        console.error(error);
        toastError('An error occurred while processing your request. Please try again later.');
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
            toastSuccess(`Lola code is valid.`);
        } else if (content.emptyCode) {
            let message = `Validation failed.\nErrors:\n - ${content.compilationErrors.join('\n -')}`
            toastInfo(message);
        } else {
            let message = `Validation failed.\nErrors:\n - ${content.compilationErrors.join('\n -')}`
            toastWarning(message, ONLY_CLOSABLE_TOASTR_SETTINGS);
        }

    } catch (error) {
        console.error(error);
        toastError('An error occurred while processing your request. Please try again later.');
    }
}
