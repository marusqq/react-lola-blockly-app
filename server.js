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

        const { stdout, stderr } = await exec(`../Lola ${filenameLola} ${filenameVerilog}`, {
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

function getTime(separator = " ") {
    let date = new Date();
    let currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let currentTime = date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    return currentDate + separator + currentTime
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
        const answer = responseData['choices'][0]['message']['content'].trim();
        console.log(`chatgpt answer: ${answer}`)
        resp.response = answer
        res.send(JSON.stringify(resp));

    } catch (error) {
        console.error(error);
        resp.status = 500;
        resp.response = "Internal server error";
        res.send(JSON.stringify(resp));
    }

    console.log('--- /ask-chat-gpt-lola endpoint call END ---');
});


