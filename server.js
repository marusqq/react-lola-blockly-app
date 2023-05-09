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
    if (lolaCode.length === 0) {
        console.log(`${getTime()} - compileLola() - No Lola code found, compiled = False`);

        const resultDict = {
            compiled: false,
            compilationErrors: ["No code to compile"],
            compiledVerilogCode: "",
            emptyCode: true
        };

        console.log(`${getTime()} - compileLola() - returning: ${JSON.stringify(resultDict)}`);

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

        console.log(`${getTime()} - compileLola() - Compiling .Lola file with subProcess`);

        const {stdout, stderr} = await exec(`../Lola ${filenameLola} ${filenameVerilog}`, {
            timeout: 4000,
        });

        if (stderr) {
            console.error(`${getTime()} - compileLola() - error1: ${err}`);

            compilationErrorsPos.push(stderr.toString());

            compiled = false;
        } else {
            const linesOfOutput = stdout.split("\n");

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
                console.log(`${getTime()} - compileLola() - reading compiled verilog file: ${filenameVerilog}`);

                compiledVerilogCode = fs.readFileSync(filenameVerilog).toString();
            }
        }
    } catch (err) {
        console.error(`${getTime()} - compileLola() - error2: ${err}`);

        compiled = false;

        compilationErrorsPos.push(`Error while compiling: ${err}`);
    }

    console.log(`${getTime()} - compileLola() - delete files: ${filenameLola}, ${filenameVerilog}`);

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

    console.log(`${getTime()} - compileLola() - returning: ${JSON.stringify(resultDict)}`);

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

        console.log(`${getTime()} - verilogToC() - converting verilog to C with ./v2c`);

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
                console.log(`${getTime()} - verilogToC() - reading compiled c file: ${filenameC}`);
                code = fs.readFileSync(filenameC).toString();
            }
        }
    } catch (err) {
        console.error(`${getTime()} - verilogToC() - error4: ${err}`);
        converted = false;
        conversionErrors.push(`Error while converting: ${err}`);
    }

    console.log(`${getTime()} - verilogToC() - delete files: ${filenameC}, ${filenameVerilog}`);

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

    console.log(`${getTime()} - verilogToC() - returning: ${JSON.stringify(resultDict)}`);

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

        console.log(`${getTime()} - verilogToSystemC() - converting verilog to SystemC with ./v2sc`);

        const command = `./compile/v2sc ${filenameVerilog}`
        const {stdout, stderr} = await exec(command, {timeout: 4000,});

        if (stderr) {
            console.error(`${getTime()} - verilogToSystemC() - error5: ${err}`);

            conversionErrors.push(stderr.toString());
            converted = false;

        } else {
            const linesOfOutput = stdout.split("\n");

            for (const lineOfOutput of linesOfOutput) {
                console.log(lineOfOutput)
                if (lineOfOutput.includes(`Error 2001 ${noPathVerilogFileName}.v`)) {
                    conversionErrors.push(lineOfOutput.replace(`Error 2001 ${noPathVerilogFileName}.v`, ""));
                    converted = false;
                }
                if (lineOfOutput.includes("Error(s), found") && converted) {
                    converted = false;
                }
            }

            if (converted) {
                console.log(`${getTime()} - verilogToSystemC() - reading compiled SystemC CPP file: ${filenameSystemCPP}`);
                codeCPP = fs.readFileSync(filenameSystemCPP).toString();

                console.log(`${getTime()} - verilogToSystemC() - reading compiled SystemC H file: ${filenameSystemH}`);
                codeH = fs.readFileSync(filenameSystemH).toString();
            }
        }
    } catch (err) {
        console.error(`${getTime()} - verilogToSystemC() - error6: ${err}`);
        converted = false;
        conversionErrors.push(`Error while converting: ${err}`);
    }

    console.log(`${getTime()} - verilogToSystemC() - delete files: ${filenameSystemCPP}, ${filenameSystemH}, ${filenameVerilog}`);

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

    console.log(`${getTime()} - verilogToSystemC() - returning: ${JSON.stringify(resultDict)}`);

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

        console.log(`${getTime()} - verilogToVHDL() - converting verilog to VHDL with ./iverilog`);

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
                console.log(`${getTime()} - verilogToVHDL() - reading compiled VHDL file: ${filenameVHDL}`);
                code = fs.readFileSync(filenameVHDL).toString();
            }
        }
    } catch (err) {
        console.error(`${getTime()} - verilogToVHDL() - error9: ${err}`);
        converted = false;
        conversionErrors.push(`Error while converting: ${err}`);
    }

    console.log(`${getTime()} - verilogToVHDL() - delete files: ${filenameVHDL}, ${filenameVerilog}`);

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

    console.log(`${getTime()} - verilogToVHDL() - returning: ${JSON.stringify(resultDict)}`);

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
    console.log('--- /check_valid_lola endpoint call START ---')
    console.log(`${getTime()} Received request with payload: ${JSON.stringify(req.body)}`);

    let resp = {
        'status': 200,
        'valid': false,
        'compilationErrors': [],
    }

    console.log(`${getTime()} Trying to compile lola code...`);
    compileLola(req.body.code).then((compiledDict) => {
        // try compiling lola code
        console.log(`${getTime()} compileLolaDict: ${JSON.stringify(compiledDict)}`);
        resp.valid = compiledDict.compiled
        resp.compilationErrors = compiledDict.compilationErrors
        resp.emptyCode = compiledDict.emptyCode
        console.log(`${getTime()} response: ${JSON.stringify(resp)}`);
        console.log('--- /check_valid_lola endpoint call END ---')
        res.send(JSON.stringify(resp));
    }).catch((err) => {
        console.error(err);
    });
});

// lola to verilog converter
app.post('/lola-to-verilog', async (req, res) => {
    console.log('--- /compile_lola endpoint call START ---')
    console.log(`${getTime()} Received request with payload: ${JSON.stringify(req.body)}`);

    let resp = {
        'status': 200,
        'compiled': false,
        'compilationErrors': [],
        'verilogCode': ""
    }


    console.log(`${getTime()} Trying to compile lola code...`);
    compileLola(req.body.code).then((compiledDict) => {
        // try compiling lola code
        console.log(`${getTime()} compiled LolaDict: ${JSON.stringify(compiledDict)}`);
        resp.compiled = compiledDict.compiled
        resp.compilationErrors = compiledDict.compilationErrors
        resp.verilogCode = compiledDict.compiledVerilogCode
        resp.emptyCode = compiledDict.emptyCode
        console.log(`${getTime()} returning response: ${JSON.stringify(resp)}`);
        console.log('--- /compile_lola endpoint call END ---')
        res.send(JSON.stringify(resp));
    }).catch((err) => {
        console.error(err);
    })

});

// endpoint to ask ChatGPT
app.post('/ask-chat-gpt-lola', async (req, res) => {
    console.log('--- /ask-chat-gpt-lola endpoint call START ---');

    let resp = {
        'status': 200,
        'response': ''
    }

    // get the prompt from the query parameters
    const lolaCode = req.body.lolaCode;
    console.log(`lolaCode: ${lolaCode}`)

    const errors = req.body.lolaErrors;
    console.log(`errors: ${errors}`)

    if (!lolaCode || !errors) {
        resp.status = 400;
        resp.response = "Bad request"
        res.send(JSON.stringify(resp));
    }

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
        console.log(`response: ${JSON.stringify(responseData)}`)
        try {
            const answer = responseData['choices'][0]['message']['content'].trim();
            console.log(`chatgpt answer: ${answer}`)
            resp.response = answer
            res.send(JSON.stringify(resp));
        } catch (error) {
            console.log(responseData['error']['message'])
            resp.response = responseData['error']['message']
            console.log('--- /ask-chat-gpt-lola endpoint call END ---');
            res.send(JSON.stringify(resp));
        }


    } catch (error) {
        console.error(error);
        resp.status = 500;
        resp.response = "Internal server error";
        console.log('--- /ask-chat-gpt-lola endpoint call END ---');
        res.send(JSON.stringify(resp));
    }
});

app.post('/lola-to-vhdl', async (req, res) => {
    console.log('--- /lola-to-vhdl endpoint call START ---');
    console.log(`${getTime()} Received request with payload: ${JSON.stringify(req.body)}`);

    let resp = {
        'status': 200,
        'conversionErrors': [],
        'code': "",
        'converted': true
    }

    console.log(`${getTime()} Trying to compile lola code to verilog first...`);
    // try compiling lola code to verilog
    compileLola(req.body.code).then((compiledDict) => {
        console.log(`${getTime()} compiled LolaDict: ${JSON.stringify(compiledDict)}`);

        console.log(`${getTime()} Trying to compile verilog to VHDL`);
        // when it's compiled to verilog, convert verilog to VHDL
        verilogToVHDL(compiledDict.compiledVerilogCode).then((convertedDict) => {

            resp.code = convertedDict.code
            resp.conversionErrors = convertedDict.conversionErrors
            resp.converted = convertedDict.converted
            console.log(`${getTime()} returning response: ${JSON.stringify(resp)}`);
            console.log('--- /lola-to-vhdl endpoint call END ---')
            res.send(JSON.stringify(resp));

        }).catch((err) => {
            console.error(err);
        })

    }).catch((err) => {
        console.error(err);
    })
});

app.post('/lola-to-c', async (req, res) => {
    console.log('--- /lola-to-c endpoint call START ---');
    console.log(`${getTime()} Received request with payload: ${JSON.stringify(req.body)}`);

    let resp = {
        'status': 200,
        'conversionErrors': [],
        'code': "",
        'converted': true
    }

    console.log(`${getTime()} Trying to compile lola code to verilog first...`);
    // try compiling lola code to verilog
    compileLola(req.body.code).then((compiledDict) => {
        console.log(`${getTime()} compiled LolaDict: ${JSON.stringify(compiledDict)}`);

        console.log(`${getTime()} Trying to compile verilog to C`);
        // when it's compiled to verilog, convert verilog to C
        let moduleName = req.body.moduleName;
        verilogToC(compiledDict.compiledVerilogCode, moduleName).then((convertedDict) => {

            resp.code = convertedDict.code
            resp.conversionErrors = convertedDict.conversionErrors
            resp.converted = convertedDict.converted
            console.log(`${getTime()} returning response: ${JSON.stringify(resp)}`);
            console.log('--- /lola-to-c endpoint call END ---')
            res.send(JSON.stringify(resp));

        }).catch((err) => {
            console.error(err);
        })

    }).catch((err) => {
        console.error(err);
    })
});

app.post('/lola-to-system-c', async (req, res) => {
    console.log('--- /lola-to-system-c endpoint call START ---');
    console.log(`${getTime()} Received request with payload: ${JSON.stringify(req.body)}`);

    let resp = {
        'status': 200,
        'conversionErrors': [],
        'codeCPP': "",
        'codeH': "",
        'converted': true
    }

    console.log(`${getTime()} Trying to compile lola code to verilog first...`);
    // try compiling lola code to verilog
    compileLola(req.body.code).then((compiledDict) => {
        console.log(`${getTime()} compiled LolaDict: ${JSON.stringify(compiledDict)}`);

        // when it's compiled to verilog, convert verilog to system C
        console.log(`${getTime()} Trying to compile verilog to systemC`);
        let moduleName = req.body.moduleName;
        verilogToSystemC(compiledDict.compiledVerilogCode, moduleName).then((convertedDict) => {

            resp.codeCPP = convertedDict.codeCPP
            resp.codeH = convertedDict.codeH
            resp.conversionErrors = convertedDict.conversionErrors
            resp.converted = convertedDict.converted

            console.log(`${getTime()} returning response: ${JSON.stringify(resp)}`);
            console.log('--- /lola-to-system-c endpoint call END ---')
            res.send(JSON.stringify(resp));

        }).catch((err) => {
            console.error(err);
        })

    }).catch((err) => {
        console.error(err);
    })
});

// endpoint to ask ChatGPT
app.post('/generate-verilog-testbench', async (req, res) => {
    console.log('--- /generate-verilog-testbench endpoint call START ---');
    console.log(`${getTime()} Received request with payload: ${JSON.stringify(req.body)}`);

    let resp = {
        'status': 200,
        'testbenchCode': '',
        'generated': false
    }

    if (req.body.useChatGPT) {
        // if useChatGPT = true, use chatgpt to generate testbench code
        let verilogCode = req.body.verilogCode

        const prompt = `For this verilog code: ${verilogCode}\n
        Create minimal testbench, don't reach character limit, only reply with code.
        Add prints for variables (specify which are input / output) and results. 
        Print what was expected and use close to none comments. Don't add backtick at the end`

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
            console.log(`response: ${JSON.stringify(responseData)}`)
            try {
                const answer = responseData['choices'][0]['message']['content'].trim();
                console.log(`chatgpt answer: ${answer}`)
                resp.testbenchCode = answer;
                resp.generated = true;
                console.log('--- /generate-verilog-testbench endpoint call END ---');
                res.send(JSON.stringify(resp));

            } catch (error) {
                let errorMessage = responseData['error']['message']
                console.log(errorMessage)
                resp.testbenchCode = errorMessage
                resp.generated = false
                console.log('--- /generate-verilog-testbench endpoint call END ---');
                res.send(JSON.stringify(resp));
            }


        } catch (error) {
            console.error(error);
            resp.status = 500;
            resp.response = "Internal server error";
            console.log('--- /generate-verilog-testbench endpoint call END ---');
            res.send(JSON.stringify(resp));
        }


    } else {
        // if useChatGPT = false, try to genereate testbench automatically
        resp.testbenchCode = 'not implemented';
        resp.generated = false;
        console.log('--- /generate-verilog-testbench endpoint call END ---');
        res.send(JSON.stringify(resp));
    }

});

app.post('/stimulate-verilog', async (req, res) => {
    console.log('--- /stimulate-verilog endpoint call START ---');

    console.log(`${getTime()} Received request with payload: ${JSON.stringify(req.body)}`);

    let resp = {
        'status': 200,
        'stimulated': false,
        'stimulatedOutput': []
    }
    const moduleName = req.body.moduleName;
    console.log(`moduleName: ${moduleName}`)

    const verilogCode = req.body.verilogCode;
    console.log(`verilogCode: ${verilogCode}`)

    const testbenchCode = req.body.testbenchCode;
    console.log(`testbenchCode: ${testbenchCode}`)

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

        console.log(`${getTime()} - /stimulate-verilog - stimulating verilog with iverilog ./usr/bin/iverilog`);

        // iverilog -o stimulus_moduleName_datetime testbenchFile verilogFile
        const command = `/usr/bin/iverilog -o ${filenameStimulus} ${filenameTestbench} ${filenameVerilog}`
        const {stdout, stderr} = await exec(command, {timeout: 9000,});

        // if some unix errors
        if (stderr) {
            console.error(`${getTime()} - /stimulate-verilog - unix error10: ${err}`);
            resp.stimulated = false;
            resp.stimulatedOutput = [];
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
            console.log('--- /stimulate-verilog endpoint call END #2 ---')
            res.send(JSON.stringify(resp));

        } else {

            // IF THERE IS ANY OUTPUT
            // WE EXPECT NO OUTPUT
            if (stdout.length > 0) {
                const linesOfOutput = stdout.split("\n");
                for (const lineOfOutput of linesOfOutput) {
                    resp.stimulatedOutput.push(lineOfOutput);
                }
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
                console.log('--- /stimulate-verilog endpoint call END #3 ---')
                res.send(JSON.stringify(resp));

            } else {

                console.log(`${getTime()} - /stimulate-verilog - reading ${filenameStimulus} with /usr/bin/vvp`);

                // now read that stimulus with vvp if everything is ok
                // vvp stimulus_moduleName_datetime

                const command = `/usr/bin/vvp ${filenameStimulus} > ${temporaryFile}`
                console.log(command)
                const {stdout2, stderr2} = await exec(command, {timeout: 10000,});

                // any errors => not okay
                if (stderr2) {
                    console.error(`${getTime()} - /stimulate-verilog - error11: ${stderr2}`);

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
                    console.log('--- /stimulate-verilog endpoint call END #4 ---')
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
                    console.log('--- /stimulate-verilog endpoint call END #5 ---')
                    res.send(JSON.stringify(resp));
                }
            }
        }


    } catch (err) {
        console.error(`${getTime()} - /stimulate-verilog - error12: ${err}`);

        resp.stimulated = false;
        resp.stimulatedOutput = [err.toString()];
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
        console.log('--- /stimulate-verilog endpoint call END #6 ---')
        res.send(JSON.stringify(resp));
    }

});
