import * as lola from './lola.js';
import Blockly from 'blockly';

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


export default function compileLola() {

    let generatedCode = lola.generator.workspaceToCode(Blockly.getMainWorkspace())

    // var payload = {'code': generatedCode};

    // var data = new FormData();
    // data.append( "json", JSON.stringify( payload ) );

    // fetch("/compile_lola",
    //     {
    //         method: "POST",
    //         body: JSON.stringify(payload),
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //     })
    //     .then(function(res){ return res.json(); })
    //     .then(function(data){ alert( JSON.stringify( data ) ) })
    //
    let response = (async () => {
        const rawResponse = await fetch('/compile_lola', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'code': generatedCode})
        });
        const content = await rawResponse.json();

        if (content.compiled) {
            let download = window.confirm('' +
                'Lola code was compiled and is correct\n' +
                'Do you want to download it as verilog?')

            if (download)
                save('verilog.v', content.verilogCode)

        } else
            alert(`Lola code is incorrect\nErrors:\n${content.compilationErrors.join('\n')}`)
    })();


    //
    // fetch('/compile_lola', {
    //     method: 'POST',
    //     headers: {
    //         Accept: "application/json",
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify( {'code': generatedCode})
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('Success:', data);
    //         if (data.compiled) {
    //             let download = window.confirm('' +
    //                 'Lola code was compiled and is correct\n' +
    //                 'Do you want to download it as verilog?')
    //
    //             if (download)
    //                 save('verilog.v', data.verilogCode)
    //
    //         }
    //         else
    //             alert(`Lola code is incorrect\nErrors:\n${data.compilationErrors.join('\n')}`)
    //
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });

}


