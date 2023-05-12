const express = require('express');
const fs = require('fs')
const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express();
const port = 5000;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded());     // to support URL-encoded bodies

function findLineOfCode(code, position) {
    let remainingChars = position - 1;
    const lines = code.split('\n');
    let lineCount = 1;
    let charCount = 1;
    for (const line of lines) {
        for (const char of line) {
            charCount++;
            remainingChars--;
            if (remainingChars < 0) {
                return {
                    line: lines[lineCount - 1],
                    lineNo: lineCount
                }
            }

        }
        charCount = charCount + 2;
        remainingChars = remainingChars - 2;
        lineCount++;
    }
    return {
        line: '',
        lineNo: -1
    }
}

function getTime(separator = " ") {
    let date = new Date();
    let currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let currentTime = date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    return currentDate + separator + currentTime
}

async function compileLola(lolaCode) {

    // if no code was passed
    if (lolaCode.length === 0) {

        const resultDict = {
            compiled: false,
            compilationErrors: ["No code to compile"],
            compiledVerilogCode: "",
            emptyCode: true
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(resultDict);
            }, 500);
        });
    }

    let compiled = true;
    const emptyCode = false;
    const compilationErrorsPos = [];
    const compilationErrors = []
    let compiledVerilogCode = "";

    const datetime = getTime("_");
    const filenameLola = `compile/blockly_${datetime}.Lola`;
    const filenameVerilog = `compile/blockly_${datetime}.v`;

    try {
        fs.writeFileSync(filenameLola, lolaCode);

        const {stdout, stderr} = await exec(`../Lola ${filenameLola} ${filenameVerilog}`, {
            timeout: 4000,
        });

        if (stderr) {
            // failed
            compilationErrorsPos.push(stderr.toString());
            compiled = false;

        } else {
            // read lines of output
            const linesOfOutput = stdout.split("\n");

            // con
            for (const lineOfOutput of linesOfOutput) {
                if (lineOfOutput.includes("err:")) {
                    compilationErrorsPos.push(lineOfOutput);
                    compiled = false;
                }
                if (lineOfOutput.includes("compilation failed") && compiled) {
                    compiled = false;
                }
            }

            if (compiled) {
                compiledVerilogCode = fs.readFileSync(filenameVerilog).toString();
            }
        }
    } catch (err) {
        compiled = false;
        compilationErrorsPos.push(`Error while compiling: ${err}`);
    }

    // delete files
    if (fs.existsSync(filenameLola)) {
        fs.unlinkSync(filenameLola);
    }
    if (fs.existsSync(filenameVerilog)) {
        fs.unlinkSync(filenameVerilog);
    }

    // find the lines also for the positions:

    // convert errors like these:
    //   pos 252  err:  bad statement
    // to
    //  assignment to read-only on line 11 in pos 364 ( y := sc.4 -> {t2[15:0], 0'16} : t2;)
    const regex = /pos\s+(\d+)/;
    for (const compilationErrorPos of compilationErrorsPos) {
        const match = compilationErrorPos.match(regex);
        if (match) {
            let actualError = compilationErrorPos.replace(match[0], '').replace('err: ', '').trim()
            let errorPosNo = match[0]
            let failedLine = findLineOfCode(lolaCode, match[1])
            let errorLineNo = failedLine.lineNo
            let errorLine = failedLine.line.trim()
            let fullCompilationFail = `${actualError} on line ${errorLineNo} in ${errorPosNo} (${errorLine})`
            compilationErrors.push(fullCompilationFail)
        } else {
            compilationErrors.push(compilationErrorPos)
        }

    }

    const resultDict = {
        compiled,
        compilationErrors,
        compiledVerilogCode,
        emptyCode
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(resultDict);
        }, 500);
    });
}

async function verilogToC(verilogCode, moduleName) {
    let code = '';
    let conversionErrors = [];
    let converted = true;

    // write files which will need to be deleted later
    const datetime = getTime("_");


    const filenameVerilog = `compile/verilog_${datetime}.v`;
    const filenameC = `compile/main_${datetime}.c`;


    try {
        fs.writeFileSync(filenameVerilog, verilogCode);

        const command = `./compile/v2c ${filenameVerilog} --module ${moduleName} ${filenameC}`
        const {stdout, stderr} = await exec(command, {
            timeout: 4000,
        });

        if (stderr) {
            console.error(`${getTime()} - verilogToC() - error3: ${err}`);

            conversionErrors.push(stderr.toString());
            converted = false;

        } else {
            const linesOfOutput = stdout.split("\n");

            for (const lineOfOutput of linesOfOutput) {
                if (lineOfOutput.includes("syntax error")) {
                    conversionErrors.push(lineOfOutput);
                    converted = false;
                }
                if (lineOfOutput.includes("PARSING ERROR") && converted) {
                    converted = false;
                }
            }

            if (converted) {
                code = fs.readFileSync(filenameC).toString();
            }
        }
    } catch (err) {
        console.error(`${getTime()} - verilogToC() - error4: ${err}`);
        converted = false;
        conversionErrors.push(`Error while converting: ${err}`);
    }

    // delete files
    if (fs.existsSync(filenameC)) {
        fs.unlinkSync(filenameC);
    }
    if (fs.existsSync(filenameVerilog)) {
        fs.unlinkSync(filenameVerilog);
    }

    const resultDict = {
        converted,
        conversionErrors,
        code,
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(resultDict);
        }, 500);
    });
}

async function verilogToSystemC(verilogCode, moduleName) {
    let codeCPP = '';
    let codeH = ''
    let conversionErrors = [];
    let converted = true;

    // write files which will need to be deleted later
    const datetime = getTime("_");

    const noPathVerilogFileName = `${moduleName}_${datetime}`
    const filenameVerilog = `compile/${noPathVerilogFileName}.v`;
    const filenameSystemCPP = `compile/${noPathVerilogFileName}_${moduleName}.cpp`;
    const filenameSystemH = `compile/${noPathVerilogFileName}_${moduleName}.h`;


    try {
        fs.writeFileSync(filenameVerilog, verilogCode);

        const command = `./compile/v2sc ${filenameVerilog}`
        const {stdout, stderr} = await exec(command, {timeout: 4000,});

        if (stderr) {
            conversionErrors.push(stderr.toString());
            converted = false;

        } else {
            const linesOfOutput = stdout.split("\n");

            for (const lineOfOutput of linesOfOutput) {
                if (lineOfOutput.includes(`Error 2001 ${noPathVerilogFileName}.v`)) {
                    conversionErrors.push(lineOfOutput.replace(`Error 2001 ${noPathVerilogFileName}.v`, ""));
                    converted = false;
                }
                if (lineOfOutput.includes("Error(s), found") && converted) {
                    converted = false;
                }
            }

            if (converted) {
                codeCPP = fs.readFileSync(filenameSystemCPP).toString();
                codeH = fs.readFileSync(filenameSystemH).toString();
            }
        }
    } catch (err) {
        console.error(`${getTime()} - verilogToSystemC() - error6: ${err}`);
        converted = false;
        conversionErrors.push(`Error while converting: ${err}`);
    }

    // delete files
    if (fs.existsSync(filenameSystemCPP)) {
        fs.unlinkSync(filenameSystemCPP);
    }
    if (fs.existsSync(filenameSystemH)) {
        fs.unlinkSync(filenameSystemH);
    }
    if (fs.existsSync(filenameVerilog)) {
        fs.unlinkSync(filenameVerilog);
    }

    const resultDict = {
        converted,
        conversionErrors,
        codeCPP,
        codeH
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(resultDict);
        }, 500);
    });


}

async function verilogToVHDL(verilogCode) {
    let code = '';
    let conversionErrors = [];
    let converted = true;

    // write files which will need to be deleted later
    const datetime = getTime("_");


    const filenameVerilog = `compile/verilog_${datetime}.v`;
    const filenameVHDL = `compile/vhdl_${datetime}.vhdl`;


    try {
        fs.writeFileSync(filenameVerilog, verilogCode);

        // iverilog -t vhdl Adder.v -o Adder.vhdl
        const command = `/usr/bin/iverilog -t vhdl ${filenameVerilog} -o ${filenameVHDL}`
        const {stdout, stderr} = await exec(command, {timeout: 4000,});

        if (stderr) {
            console.error(`${getTime()} - verilogToVHDL() - error7: ${err}`);
            conversionErrors.push(stderr.toString());
            converted = false;

        } else {
            const linesOfOutput = stdout.split("\n");

            for (const lineOfOutput of linesOfOutput) {
                if (lineOfOutput.includes("syntax error") || lineOfOutput.includes("error8:")) {
                    conversionErrors.push(lineOfOutput);
                    converted = false;
                }
                if (lineOfOutput.includes("Invalid module instantiation") && converted) {
                    converted = false;
                }
            }

            if (converted) {
                code = fs.readFileSync(filenameVHDL).toString();
            }
        }
    } catch (err) {
        console.error(`${getTime()} - verilogToVHDL() - error9: ${err}`);
        converted = false;
        conversionErrors.push(`Error while converting: ${err}`);
    }

    // delete files
    if (fs.existsSync(filenameVHDL)) {
        fs.unlinkSync(filenameVHDL);
    }
    if (fs.existsSync(filenameVerilog)) {
        fs.unlinkSync(filenameVerilog);
    }

    const resultDict = {
        converted,
        conversionErrors,
        code,
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(resultDict);
        }, 500);
    });
}


// This displays message that the server running and listening to specified port
app.listen(port, '127.0.0.1', () => console.log(`${getTime()} Listening on port ${port}`));

// lola validator
app.post('/validate-lola', async (req, res) => {

    let resp = {
        'status': 200,
        'valid': false,
        'compilationErrors': [],
    }

    // check for expected body values
    if (!req.body.hasOwnProperty('code')) {
        resp.status = 400;
        resp.compilationErrors = ['code parameter missing'];
        res.send(JSON.stringify(resp))
    } else {

        compileLola(req.body.code).then((compiledDict) => {

            resp.valid = compiledDict.compiled
            resp.compilationErrors = compiledDict.compilationErrors
            resp.emptyCode = compiledDict.emptyCode

            res.send(JSON.stringify(resp));

        }).catch((err) => {

            // if any error found
            resp.status = 500;
            resp.compilationErrors = ['internal server error'];
            res.send(JSON.stringify(resp));
        });
    }
});

// endpoint to ask ChatGPT
app.post('/ask-chat-gpt-lola', async (req, res) => {

    let resp = {
        'status': 200,
        'response': ''
    }

    const requiredParams = ['lolaCode', 'lolaErrors'];
    const missingParams = [];

    for (const param of requiredParams) {
        if (!req.body.hasOwnProperty(param)) {
            missingParams.push(param);
        }
    }

    if (missingParams.length > 0) {
        resp.response = `Missing required parameters: ${missingParams.join(', ')}`;
        resp.status = 400;
        res.send(JSON.stringify(resp));
    } else {

        // get the prompt from the query parameters
        const lolaCode = req.body.lolaCode;
        const errors = req.body.lolaErrors;

        const prompt = `Explain why this LOLA HDL code fails with: \n${errors}. \nCode:\n ${lolaCode}`

        // set up the API request data
        const data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": prompt}]
        };

        // set up the API request headers, including the API key from the .env file
        const headers = {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        };

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            try {
                resp.response = responseData['choices'][0]['message']['content'].trim();
                res.send(JSON.stringify(resp));

            } catch (error) {
                resp.status = 500;
                resp.response = responseData['error']['message']
                res.send(JSON.stringify(resp));
            }


        } catch (error) {
            resp.status = 500;
            resp.response = "Internal server error";
            res.send(JSON.stringify(resp));
        }
    }
});

// lola to verilog converter
app.post('/lola-to-verilog', async (req, res) => {

    let resp = {
        'status': 200,
        'compiled': false,
        'compilationErrors': [],
        'verilogCode': ""
    }

    // check for expected body values
    if (!req.body.hasOwnProperty('code')) {
        resp.status = 400;
        resp.compilationErrors = ['code parameter missing'];
        res.send(JSON.stringify(resp))
    } else {

        compileLola(req.body.code).then((compiledDict) => {

            resp.compiled = compiledDict.compiled
            resp.compilationErrors = compiledDict.compilationErrors
            resp.verilogCode = compiledDict.compiledVerilogCode
            resp.emptyCode = compiledDict.emptyCode

            res.send(JSON.stringify(resp));

        }).catch((err) => {
            // if any error found
            resp.status = 500;
            resp.compilationErrors = ['internal server error'];
            res.send(JSON.stringify(resp));
        })
    }
});

// endpoint lola => vhdl
app.post('/lola-to-vhdl', async (req, res) => {

    let resp = {
        'status': 200,
        'conversionErrors': [],
        'code': "",
        'converted': true
    }

    // check for expected body values
    if (!req.body.hasOwnProperty('code')) {
        resp.status = 400;
        resp.conversionErrors = ['code parameter missing'];
        res.send(JSON.stringify(resp))
    } else {

        // try compiling lola code to verilog
        compileLola(req.body.code).then((compiledDict) => {

            // when it's compiled to verilog, convert verilog to VHDL
            verilogToVHDL(compiledDict.compiledVerilogCode).then((convertedDict) => {

                resp.code = convertedDict.code
                resp.conversionErrors = convertedDict.conversionErrors
                resp.converted = convertedDict.converted
                res.send(JSON.stringify(resp));

            }).catch((err) => {
                resp.status = 500;
                resp.converted = false;
                resp.conversionErrors = ['internal server error'];
                res.send(JSON.stringify(resp));
            })

        }).catch((err) => {
            resp.status = 500;
            resp.converted = false;
            resp.conversionErrors = ['internal server error'];
            res.send(JSON.stringify(resp));
        })
    }
});

// endpoint to convert lola to c
app.post('/lola-to-c', async (req, res) => {

    let resp = {
        'status': 200,
        'conversionErrors': [],
        'code': "",
        'converted': true
    }

    const requiredParams = ['code', 'moduleName'];
    const missingParams = [];

    for (const param of requiredParams) {
        if (!req.body.hasOwnProperty(param)) {
            missingParams.push(param);
        }
    }

    if (missingParams.length > 0) {
        resp.conversionErrors = [`Missing required parameters: ${missingParams.join(', ')}`];
        resp.status = 400;
        resp.converted = false;
        res.send(JSON.stringify(resp));
    } else {

        // try compiling lola code to verilog
        compileLola(req.body.code).then((compiledDict) => {

            // when it's compiled to verilog, convert verilog to C
            let moduleName = req.body.moduleName;
            verilogToC(compiledDict.compiledVerilogCode, moduleName).then((convertedDict) => {

                resp.code = convertedDict.code
                resp.conversionErrors = convertedDict.conversionErrors
                resp.converted = convertedDict.converted
                res.send(JSON.stringify(resp));

            }).catch((err) => {
                resp.status = 500;
                resp.converted = false;
                resp.conversionErrors = ['internal server error'];
                res.send(JSON.stringify(resp));
            })

        }).catch((err) => {
            resp.status = 500;
            resp.converted = false;
            resp.conversionErrors = ['internal server error'];
            res.send(JSON.stringify(resp));
        })
    }
});

// endpoint to convert lola to systemC
app.post('/lola-to-system-c', async (req, res) => {

    let resp = {
        'status': 200,
        'conversionErrors': [],
        'codeCPP': "",
        'codeH': "",
        'converted': true
    }

    const requiredParams = ['code', 'moduleName'];
    const missingParams = [];

    for (const param of requiredParams) {
        if (!req.body.hasOwnProperty(param)) {
            missingParams.push(param);
        }
    }

    if (missingParams.length > 0) {
        resp.conversionErrors = [`Missing required parameters: ${missingParams.join(', ')}`];
        resp.status = 400;
        resp.converted = false;
        res.send(JSON.stringify(resp));
    } else {

        // try compiling lola code to verilog
        compileLola(req.body.code).then((compiledDict) => {

            // when it's compiled to verilog, convert verilog to system C
            let moduleName = req.body.moduleName;
            verilogToSystemC(compiledDict.compiledVerilogCode, moduleName).then((convertedDict) => {

                resp.codeCPP = convertedDict.codeCPP
                resp.codeH = convertedDict.codeH
                resp.conversionErrors = convertedDict.conversionErrors
                resp.converted = convertedDict.converted
                res.send(JSON.stringify(resp));

            }).catch((err) => {
                resp.status = 500;
                resp.converted = false;
                resp.conversionErrors = ['internal server error'];
                res.send(JSON.stringify(resp));
            })

        }).catch((err) => {
            resp.status = 500;
            resp.converted = false;
            resp.conversionErrors = ['internal server error'];
            res.send(JSON.stringify(resp));
        })
    }
});

// endpoint to ask ChatGPT
app.post('/generate-verilog-testbench', async (req, res) => {

    let resp = {
        'status': 200,
        'testbenchCode': '',
        'generated': false
    }

    const requiredParams = ['useChatGPT', 'verilogCode'];
    const missingParams = [];

    for (const param of requiredParams) {
        if (!req.body.hasOwnProperty(param)) {
            missingParams.push(param);
        }
    }

    if (missingParams.length > 0) {
        resp.testbenchCode = `Missing required parameters: ${missingParams.join(', ')}`;
        resp.status = 400;
        resp.generated = false;
        res.send(JSON.stringify(resp));
    } else {

        if (req.body.useChatGPT) {
            // if useChatGPT = true, use ChatGPT to generate testbench code
            let verilogCode = req.body.verilogCode

            const prompt = `For this verilog code: ${verilogCode}\n
            Create minimal testbench, don't reach character limit, only reply with code.
            Don't add backtick at the end and don't use comments at testbench. Use small values
            Print:
                - variable names and their values,
                - results,
                - expected results 
                - if results != expected results
            `

            // set up the API request data
            const data = {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": prompt}]
            };

            // set up the API request headers, including the API key from the .env file
            const headers = {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            };

            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)
                });

                const responseData = await response.json();
                try {
                    resp.testbenchCode = responseData['choices'][0]['message']['content'].trim();
                    resp.generated = true;
                    res.send(JSON.stringify(resp));

                } catch (error) {

                    resp.status = 500;
                    resp.generated = false;
                    resp.testbenchCode = responseData['error']['message'];
                    res.send(JSON.stringify(resp));
                }


            } catch (error) {
                resp.status = 500;
                resp.generated = false;
                resp.testbenchCode = 'internal server error';
                res.send(JSON.stringify(resp));
            }


        } else {
            // if useChatGPT = false, try to genereate testbench automatically
            resp.status = 501;
            resp.generated = false;
            resp.testbenchCode = 'not implemented';
            res.send(JSON.stringify(resp));
        }
    }
});

// endpoint to stimulate verilog file with testbench
app.post('/stimulate-verilog', async (req, res) => {

    let resp = {
        'status': 200,
        'stimulated': false,
        'stimulatedOutput': []
    }

    const requiredParams = ['moduleName', 'verilogCode', 'testbenchCode'];
    const missingParams = [];

    for (const param of requiredParams) {
        if (!req.body.hasOwnProperty(param)) {
            missingParams.push(param);
        }
    }

    if (missingParams.length > 0) {
        resp.status = 400;
        resp.stimulatedOutput = [`Missing required parameters: ${missingParams.join(', ')}`];
        resp.stimulated = false;
        res.send(JSON.stringify(resp));
    } else {

        const moduleName = req.body.moduleName;
        const verilogCode = req.body.verilogCode;
        const testbenchCode = req.body.testbenchCode;

        const datetime = getTime("_");
        const prePath = 'compile/';

        const filenameVerilogName = `${moduleName}_${datetime}.v`;
        const filenameTestbenchName = `${moduleName}_${datetime}_tb.v`;
        const filenameStimulusName = `${moduleName}_${datetime}`
        const temporaryFileName = `temp_${datetime}`

        const filenameVerilog = prePath + filenameVerilogName
        const filenameTestbench = prePath + filenameTestbenchName
        const filenameStimulus = prePath + filenameStimulusName
        const temporaryFile = prePath + temporaryFileName

        let stdout = '';
        let stderr = '';
        let stdout2 = '';
        let stderr2 = '';

        try {

            fs.writeFileSync(filenameVerilog, verilogCode);
            fs.writeFileSync(filenameTestbench, testbenchCode);

            // iverilog -o stimulus_moduleName_datetime testbenchFile verilogFile
            const command = `/usr/bin/iverilog -o ${filenameStimulus} ${filenameTestbench} ${filenameVerilog}`
            const {stdout, stderr} = await exec(command, {timeout: 9000,});

            // unix errors might be warnings, go through them
            let errOK = true;

            // IF THERE IS ANY OUTPUT => go through it, warning: OK, anything else => gg
            if (stderr.length > 0) {
                const linesOfErrors = stderr.split("\n");
                for (const lineOfError of linesOfErrors) {
                    // if line of output is not 'warning: ' and there is something
                    if (!(lineOfError.includes('warning: ')) && lineOfError.length > 0) {
                        errOK = false;
                        resp.stimulatedOutput.push(linesOfErrors);
                        break;
                    }
                }
            }

            // if error => bad
            if (!errOK) {
                console.error(`${getTime()} - /stimulate-verilog - unix error10: ${stderr}`);
                resp.stimulated = false;
                resp.stimulatedOutput = [stderr];
                if (fs.existsSync(filenameVerilog)) {
                    fs.unlinkSync(filenameVerilog);
                }
                if (fs.existsSync(filenameTestbench)) {
                    fs.unlinkSync(filenameTestbench);
                }
                if (fs.existsSync(filenameStimulus)) {
                    fs.unlinkSync(filenameStimulus);
                }
                if (fs.existsSync(temporaryFile)) {
                    fs.unlinkSync(temporaryFile);
                }

                resp.status = 500;
                resp.stimulatedOutput = ['internal server error'];
                resp.stimulated = false;
                res.send(JSON.stringify(resp));

            } else {
                // if error => Ok, go
                let stdoutOK = true;

                // IF THERE IS ANY OUTPUT => go through it, warning: OK, anything else => gg
                if (stdout.length > 0) {
                    const linesOfOutput = stdout.split("\n");
                    for (const lineOfOutput of linesOfOutput) {
                        // if line of output is not 'warning: '
                        if (!lineOfOutput.includes('warning: ') && lineOfOutput.length > 0) {
                            stdoutOK = false;
                            resp.stimulatedOutput.push(linesOfOutput);
                            break;
                        }
                    }
                }

                // if code is bad
                if (!stdoutOK) {

                    resp.stimulated = false;
                    if (fs.existsSync(filenameVerilog)) {
                        fs.unlinkSync(filenameVerilog);
                    }
                    if (fs.existsSync(filenameTestbench)) {
                        fs.unlinkSync(filenameTestbench);
                    }
                    if (fs.existsSync(filenameStimulus)) {
                        fs.unlinkSync(filenameStimulus);
                    }
                    if (fs.existsSync(temporaryFile)) {
                        fs.unlinkSync(temporaryFile);
                    }

                    res.send(JSON.stringify(resp));

                } else {

                    // now read that stimulus with vvp if everything is ok
                    // vvp stimulus_moduleName_datetime

                    const command = `/usr/bin/vvp ${filenameStimulus} > ${temporaryFile}`
                    const {stdout2, stderr2} = await exec(command, {timeout: 10000,});

                    // any errors => not okay
                    if (stderr2) {

                        resp.stimulatedOutput.push(stderr2.toString());
                        resp.stimulated = false;
                        if (fs.existsSync(filenameVerilog)) {
                            fs.unlinkSync(filenameVerilog);
                        }
                        if (fs.existsSync(filenameTestbench)) {
                            fs.unlinkSync(filenameTestbench);
                        }
                        if (fs.existsSync(filenameStimulus)) {
                            fs.unlinkSync(filenameStimulus);
                        }
                        if (fs.existsSync(temporaryFile)) {
                            fs.unlinkSync(temporaryFile);
                        }
                        resp.status = 500;
                        resp.stimulatedOutput = ['internal server error'];
                        resp.stimulated = false;
                        res.send(JSON.stringify(resp));

                    } else {

                        let data = fs.readFileSync(temporaryFile).toString()

                        const linesOfOutput = data.split("\n");

                        for (const lineOfOutput of linesOfOutput) {
                            resp.stimulatedOutput.push(lineOfOutput);
                        }
                        resp.stimulated = true;
                        if (fs.existsSync(filenameVerilog)) {
                            fs.unlinkSync(filenameVerilog);
                        }
                        if (fs.existsSync(filenameTestbench)) {
                            fs.unlinkSync(filenameTestbench);
                        }
                        if (fs.existsSync(filenameStimulus)) {
                            fs.unlinkSync(filenameStimulus);
                        }
                        if (fs.existsSync(temporaryFile)) {
                            fs.unlinkSync(temporaryFile);
                        }

                        res.send(JSON.stringify(resp));
                    }
                }
            }


        } catch (err) {

            resp.stimulated = false;
            resp.stimulatedOutput = [err.toString()];
            resp.status = 500;

            if (fs.existsSync(filenameVerilog)) {
                fs.unlinkSync(filenameVerilog);
            }
            if (fs.existsSync(filenameTestbench)) {
                fs.unlinkSync(filenameTestbench);
            }
            if (fs.existsSync(filenameStimulus)) {
                fs.unlinkSync(filenameStimulus);
            }
            if (fs.existsSync(temporaryFile)) {
                fs.unlinkSync(temporaryFile);
            }

            res.send(JSON.stringify(resp));
        }
    }
});
