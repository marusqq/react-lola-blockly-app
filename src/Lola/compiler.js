import * as lola from './lola.js';
import Blockly from 'blockly';

export default function compileLola() {

    let generatedCode = lola.generator.workspaceToCode(Blockly.getMainWorkspace())
    console.log(generatedCode)
    console.log(typeof(generatedCode))
    // let requestData = {'code': generatedCode}
    // console.log('will send requestData')

    // fetch('/compile_lola')
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(lolaCompiled => {
    //         console.log(lolaCompiled)
    //     })

    // fetch('/compile_lola', {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         username: "foo",
    //         password: "bar"
    //     })
    // }).then()

    fetch('/compile_lola', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'code': generatedCode}),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert('pasol nx desriau tu')
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    // console.log(a)
}


