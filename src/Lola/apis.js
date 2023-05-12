import Swal from "sweetalert2";

export function validateLola() {
    let endpoint = '/validate-lola'

    Swal.fire({
        title: endpoint,
        text: `The ${endpoint} endpoint is designed to validate Lola code sent in the request body`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Try it!',
        confirmButtonColor: 'green',
        footer: '<pre style="text-align: left">' + `POST ${endpoint}` + '<br>' + 'Content-Type: application/json' + '</pre>',

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: endpoint,
                text: 'Enter API request properties',
                html: '<input id="lolaCode" class="swal2-input" placeholder="lolaCode">',
                showCancelButton: true,
                confirmButtonText: 'Send request',
                confirmButtonColor: 'green',
                footer: '<pre style="text-align: left">' + '{"code": "< Lola code >"}' + '</pre>',

                preConfirm: () => {
                    const lolaCode = Swal.getPopup().querySelector('#lolaCode').value;

                    if (lolaCode.trim() === '') {
                        Swal.showValidationMessage("Please enter API request values");
                    } else {
                        return {lolaCode};
                    }

                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const {lolaCode} = result.value;

                    // Send API request
                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"code": '\n' + lolaCode + '\n'})
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'API raw response:',
                                html: '<pre style="text-align: left; margin: 0;">' + JSON.stringify(data, null, 2).slice(1, -1) + '</pre>',
                                icon: data.status === 200 ? 'success' : 'warning',
                                footer: '<pre style="text-align: left">' + `${endpoint}` + '</pre>',
                            });
                        })
                        .catch(error => {
                            console.error('API Error:', error);
                            Swal.fire({
                                title: 'API Error',
                                text: 'An error occurred while fetching data from the API.',
                                icon: 'error'
                            });
                        });
                }
            });
        }
    });
}

export function lolaToVerilog() {
    let endpoint = '/lola-to-verilog'

    Swal.fire({
        title: endpoint,
        text: `The ${endpoint} endpoint is used to compile Lola code into Verilog code`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Try it!',
        confirmButtonColor: 'green',
        footer: '<pre style="text-align: left">' + `POST ${endpoint}` + '<br>' + 'Content-Type: application/json' + '</pre>',

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: endpoint,
                text: 'Enter API request properties',
                html: '<input id="lolaCode" class="swal2-input" placeholder="lolaCode">',
                showCancelButton: true,
                confirmButtonText: 'Send request',
                confirmButtonColor: 'green',
                footer: '<pre style="text-align: left">' + '{"code": "< Lola code >"}' + '</pre>',

                preConfirm: () => {
                    const lolaCode = Swal.getPopup().querySelector('#lolaCode').value;

                    if (lolaCode.trim() === '') {
                        Swal.showValidationMessage("Please enter API request values");
                    } else {
                        return {lolaCode};
                    }

                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const {lolaCode} = result.value;

                    // Send API request
                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"code": '\n' + lolaCode + '\n'})
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'API raw response:',
                                html: '<pre style="text-align: left; margin: 0;">' + JSON.stringify(data, null, 2).slice(1, -1) + '</pre>',
                                icon: data.status === 200 ? 'success' : 'warning',
                                footer: '<pre style="text-align: left">' + `${endpoint}` + '</pre>',
                            });
                        })
                        .catch(error => {
                            console.error('API Error:', error);
                            Swal.fire({
                                title: 'API Error',
                                text: 'An error occurred while fetching data from the API.',
                                icon: 'error'
                            });
                        });
                }
            });
        }
    });
}

export function lolaToVHDL() {

    let endpoint = '/lola-to-vhdl'

    Swal.fire({
        title: endpoint,
        text: `The ${endpoint} endpoint is used to convert Lola code into VHDL code`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Try it!',
        confirmButtonColor: 'green',
        footer: '<pre style="text-align: left">' + `POST ${endpoint}` + '<br>' + 'Content-Type: application/json' + '</pre>',

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: endpoint,
                text: 'Enter API request properties',
                html: '<input id="lolaCode" class="swal2-input" placeholder="lolaCode">',
                showCancelButton: true,
                confirmButtonText: 'Send request',
                confirmButtonColor: 'green',
                footer: '<pre style="text-align: left">' + '{"code": "< Lola code >"}' + '</pre>',

                preConfirm: () => {
                    const lolaCode = Swal.getPopup().querySelector('#lolaCode').value;

                    if (lolaCode.trim() === '') {
                        Swal.showValidationMessage("Please enter API request values");
                    } else {
                        return {lolaCode};
                    }

                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const {lolaCode} = result.value;

                    // Send API request
                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"code": '\n' + lolaCode + '\n'})
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'API raw response:',
                                html: '<pre style="text-align: left; margin: 0;">' + JSON.stringify(data, null, 2).slice(1, -1) + '</pre>',
                                icon: data.status === 200 ? 'success' : 'warning',
                                footer: '<pre style="text-align: left">' + `${endpoint}` + '</pre>',
                            });
                        })
                        .catch(error => {
                            console.error('API Error:', error);
                            Swal.fire({
                                title: 'API Error',
                                text: 'An error occurred while fetching data from the API.',
                                icon: 'error'
                            });
                        });
                }
            });
        }
    });
}

export function askChatGPTLola() {

    let endpoint = '/ask-chat-gpt-lola'

    Swal.fire({
        title: endpoint,
        text: `The ${endpoint} endpoint is used ask ChatGPT for help when validating Lola code`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Try it!',
        confirmButtonColor: 'green',
        footer: '<pre style="text-align: left">' + `POST ${endpoint}` + '<br>' + 'Content-Type: application/json' + '</pre>',

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: endpoint,
                text: 'Enter API request properties',
                html:
                    '<input id="lolaCode" class="swal2-input" placeholder="lolaCode">' +
                    '<input id="lolaErrors" class="swal2-input" placeholder="lolaErrors">' ,
                showCancelButton: true,
                confirmButtonText: 'Send request',
                confirmButtonColor: 'green',
                footer: '<pre style="text-align: left">' +
                    '{"lolaCode": "< Lola code >",' + '<br>' + '"lolaErrors": "< Lola errors >"}' + '</pre>',

                preConfirm: () => {
                    const lolaCode = Swal.getPopup().querySelector('#lolaCode').value;
                    const lolaErrors = Swal.getPopup().querySelector('#lolaErrors').value;

                    if (lolaCode.trim() === '' || lolaErrors.trim() === '') {
                        Swal.showValidationMessage("Please enter API request values");
                    } else {
                        return {lolaCode, lolaErrors};
                    }

                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const {lolaCode, lolaErrors} = result.value;

                    // Send API request
                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {"lolaCode": '\n' + lolaCode + '\n', "lolaErrors": lolaErrors})
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'API raw response:',
                                html: '<pre style="text-align: left; margin: 0;">' + JSON.stringify(data, null, 2).slice(1, -1) + '</pre>',
                                icon: data.status === 200 ? 'success' : 'warning',
                                footer: '<pre style="text-align: left">' + `${endpoint}` + '</pre>',
                            });
                        })
                        .catch(error => {
                            console.error('API Error:', error);
                            Swal.fire({
                                title: 'API Error',
                                text: 'An error occurred while fetching data from the API.',
                                icon: 'error'
                            });
                        });
                }
            });
        }
    });
}

export function lolaToC() {

    let endpoint = '/lola-to-c'

    Swal.fire({
        title: endpoint,
        text: `The ${endpoint} endpoint is used to convert Lola code into C code`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Try it!',
        confirmButtonColor: 'green',
        footer: '<pre style="text-align: left">' + `POST ${endpoint}` + '<br>' + 'Content-Type: application/json' + '</pre>',

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: endpoint,
                text: 'Enter API request properties',
                html:
                    '<input id="lolaCode" class="swal2-input" placeholder="lolaCode">' +
                    '<input id="moduleName" class="swal2-input" placeholder="moduleName">',
                showCancelButton: true,
                confirmButtonText: 'Send request',
                confirmButtonColor: 'green',
                footer: '<pre style="text-align: left">' +
                    '{"code": "< Lola code >",' + '<br>' + '"moduleName": "< Module name >"}' + '</pre>',

                preConfirm: () => {
                    const lolaCode = Swal.getPopup().querySelector('#lolaCode').value;
                    const moduleName = Swal.getPopup().querySelector('#moduleName').value;

                    if (lolaCode.trim() === '' || moduleName.trim() === '') {
                        Swal.showValidationMessage('Please enter all request values');
                    } else {
                        return {lolaCode, moduleName};
                    }

                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const {lolaCode, moduleName} = result.value;

                    // Send API request
                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"code": '\n' + lolaCode + '\n', "moduleName": moduleName})
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'API raw response:',
                                html: '<pre style="text-align: left; margin: 0;">' + JSON.stringify(data, null, 2).slice(1, -1) + '</pre>',
                                icon: data.status === 200 ? 'success' : 'warning',
                                footer: '<pre style="text-align: left">' + `${endpoint}` + '</pre>',
                            });
                        })
                        .catch(error => {
                            console.error('API Error:', error);
                            Swal.fire({
                                title: 'API Error',
                                text: 'An error occurred while fetching data from the API.',
                                icon: 'error'
                            });
                        });
                }
            });
        }
    });
}

export function lolaToSystemC() {

    let endpoint = '/lola-to-system-c'

    Swal.fire({
        title: endpoint,
        text: `The ${endpoint} endpoint is used to convert Lola code into System C code`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Try it!',
        confirmButtonColor: 'green',
        footer: '<pre style="text-align: left">' + `POST ${endpoint}` + '<br>' + 'Content-Type: application/json' + '</pre>',

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: endpoint,
                text: 'Enter API request properties',
                html:
                    '<input id="lolaCode" class="swal2-input" placeholder="lolaCode">' +
                    '<input id="moduleName" class="swal2-input" placeholder="moduleName">',
                showCancelButton: true,
                confirmButtonText: 'Send request',
                confirmButtonColor: 'green',
                footer: '<pre style="text-align: left">' +
                    '{"code": "< Lola code >",' + '<br>' + '"moduleName": "< Module name >"}' + '</pre>',

                preConfirm: () => {
                    const lolaCode = Swal.getPopup().querySelector('#lolaCode').value;
                    const moduleName = Swal.getPopup().querySelector('#moduleName').value;

                    if (lolaCode.trim() === '' || moduleName.trim() === '') {
                        Swal.showValidationMessage('Please enter all request values');
                    } else {
                        return {lolaCode, moduleName};
                    }

                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const {lolaCode, moduleName} = result.value;

                    // Send API request
                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"code": '\n' + lolaCode + '\n', "moduleName": moduleName})
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'API raw response:',
                                html: '<pre style="text-align: left; margin: 0;">' + JSON.stringify(data, null, 2).slice(1, -1) + '</pre>',
                                icon: data.status === 200 ? 'success' : 'warning',
                                footer: '<pre style="text-align: left">' + `${endpoint}` + '</pre>',
                            });
                        })
                        .catch(error => {
                            console.error('API Error:', error);
                            Swal.fire({
                                title: 'API Error',
                                text: 'An error occurred while fetching data from the API.',
                                icon: 'error'
                            });
                        });
                }
            });
        }
    });
}

export function stimulateVerilog() {

    let endpoint = '/stimulate-verilog'

    Swal.fire({
        title: endpoint,
        text: `The ${endpoint} endpoint is used to stimulate Verilog files with testbench code`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Try it!',
        confirmButtonColor: 'green',
        footer: '<pre style="text-align: left">' + `POST ${endpoint}` + '<br>' + 'Content-Type: application/json' + '</pre>',

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: endpoint,
                text: 'Enter API request properties',
                html:
                    '<input id="moduleName" class="swal2-input" placeholder="moduleName">' +
                    '<textarea id="verilogCode" class="swal2-input" placeholder="verilogCode" rows="10"></textarea>' +
                    '<textarea id="testbenchCode" class="swal2-input" placeholder="testbenchCode" rows="10"></textarea>',
                showCancelButton: true,
                confirmButtonText: 'Send request',
                confirmButtonColor: 'green',
                footer: '<pre style="text-align: left">' +
                    '{"verilogCode": "< Verilog code >",' + '\n' + ' "moduleName": "< Module name >",' + '\n' + ' "testbenchCode": "< Testbench code >"}' +
                    '</pre>',

                preConfirm: () => {
                    const verilogCode = Swal.getPopup().querySelector('#verilogCode').value;
                    const moduleName = Swal.getPopup().querySelector('#moduleName').value;
                    const testbenchCode = Swal.getPopup().querySelector('#testbenchCode').value;

                    if (verilogCode.trim() === '' || moduleName.trim() === '' || testbenchCode.trim() === '') {
                        Swal.showValidationMessage('Please enter all request values');
                    } else {
                        return { verilogCode, moduleName, testbenchCode };
                    }

                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const { verilogCode, moduleName, testbenchCode } = result.value;

                    // Send API request
                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "verilogCode": verilogCode,
                            "moduleName": moduleName,
                            "testbenchCode": testbenchCode
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'API raw response:',
                                html: '<pre style="text-align: left; margin: 0;">' + JSON.stringify(data, null, 2).slice(1, -1) + '</pre>',
                                icon: data.status === 200 ? 'success' : 'warning',
                                footer: '<pre style="text-align: left">' + `${endpoint}` + '</pre>',
                            });
                        })
                        .catch(error => {
                            console.error('API Error:', error);
                            Swal.fire({
                                title: 'API Error',
                                text: 'An error occurred while fetching data from the API.',
                                icon: 'error'
                            });
                        });
                }
            });
        }
    });
}

export function generateVerilogTestbench() {
    let endpoint = '/generate-verilog-testbench'

    Swal.fire({
        title: endpoint,
        text: `The ${endpoint} endpoint is used to generate Verilog testbench for testing. Jinja2 or ChatGPT can be used`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Try it!',
        confirmButtonColor: 'green',
        footer: '<pre style="text-align: left">' + `POST ${endpoint}` + '<br>' + 'Content-Type: application/json' + '</pre>',

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: endpoint,
                text: 'Enter API request properties',
                html:
                    '<label for="input3" class="swal2-checkbox">' +
                    '<input type="checkbox" id="input3" class="swal2-checkbox-input">' +
                    '<span class="swal2-label">Use ChatGPT</span>' +
                    '</label>' +
                    '<textarea id="verilogCode" class="swal2-input" placeholder="verilogCode" rows="10"></textarea>',

                showCancelButton: true,
                confirmButtonText: 'Send request',
                confirmButtonColor: 'green',
                footer: '<pre style="text-align: left">' +
                    '{"verilogCode": "< Verilog code >",' + '<br>' + '"useChatGPT": "< True / False >"}' + '</pre>',

                preConfirm: () => {
                    const verilogCode = Swal.getPopup().querySelector('#verilogCode').value;
                    const useChatGPT = Swal.getPopup().querySelector('#input3').checked;

                    if (verilogCode.trim() === '') {
                        Swal.showValidationMessage('Please enter all request values');
                    } else {
                        return {verilogCode, useChatGPT};
                    }

                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const {verilogCode, useChatGPT} = result.value;

                    // Send API request
                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"verilogCode": '\n' + verilogCode + '\n', "useChatGPT": useChatGPT})
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'API raw response:',
                                html: '<pre style="text-align: left; margin: 0;">' + JSON.stringify(data, null, 2).slice(1, -1) + '</pre>',
                                icon: data.status === 200 ? 'success' : 'warning',
                                footer: '<pre style="text-align: left">' + `${endpoint}` + '</pre>',
                            });
                        })
                        .catch(error => {
                            console.error('API Error:', error);
                            Swal.fire({
                                title: 'API Error',
                                text: 'An error occurred while fetching data from the API.',
                                icon: 'error'
                            });
                        });
                }
            });
        }
    });
}