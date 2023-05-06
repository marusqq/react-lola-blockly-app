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
    const compilationErrors = [];
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
            console.error(`${getTime()} - compileLola() - error: ${err}`);

            compilationErrors.push(stderr.toString());

            compiled = false;
        } else {
            const linesOfOutput = stdout.split("\n");

            for (const lineOfOutput of linesOfOutput) {
                if (lineOfOutput.includes("err:")) {
                    compilationErrors.push(lineOfOutput);
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
        console.error(`${getTime()} - compileLola() - error: ${err}`);

        compiled = false;

        compilationErrors.push(`Error while compiling: ${err}`);
    }

    console.log(`${getTime()} - compileLola() - delete files: ${filenameLola}, ${filenameVerilog}`);

    // delete files
    if (fs.existsSync(filenameLola)) {
        fs.unlinkSync(filenameLola);
    }
    if (fs.existsSync(filenameVerilog)) {
        fs.unlinkSync(filenameVerilog);
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
            console.error(`${getTime()} - verilogToC() - error: ${err}`);

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
                console.log(`${getTime()} - verilogToC() - reading compiled verilog file: ${filenameC}`);
                code = fs.readFileSync(filenameC).toString();
            }
        }
    } catch (err) {
        console.error(`${getTime()} - verilogToC() - error: ${err}`);
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
            console.error(`${getTime()} - verilogToVHDL() - error: ${err}`);
            conversionErrors.push(stderr.toString());
            converted = false;

        } else {
            const linesOfOutput = stdout.split("\n");

            for (const lineOfOutput of linesOfOutput) {
                if (lineOfOutput.includes("syntax error") || lineOfOutput.includes("error:")) {
                    conversionErrors.push(lineOfOutput);
                    converted = false;
                }
                if (lineOfOutput.includes("Invalid module instantiation") && converted) {
                    converted = false;
                }
            }

            if (converted) {
                console.log(`${getTime()} - verilogToVHDL() - reading compiled verilog file: ${filenameVHDL}`);
                code = fs.readFileSync(filenameVHDL).toString();
            }
        }
    } catch (err) {
        console.error(`${getTime()} - verilogToVHDL() - error: ${err}`);
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
            res.send(JSON.stringify(resp));
        }


    } catch (error) {
        console.error(error);
        resp.status = 500;
        resp.response = "Internal server error";
        res.send(JSON.stringify(resp));
    }

    console.log('--- /ask-chat-gpt-lola endpoint call END ---');
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
