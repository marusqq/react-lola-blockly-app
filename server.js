const express = require('express');
const fs = require('fs')
const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);
const bodyParser = require('body-parser')

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
        };

        console.log(`${getTime()} - compileLola() - returning: ${JSON.stringify(resultDict)}`);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(resultDict);
            }, 500);
        });
    }

    let compiled = true;
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

    fs.unlinkSync(filenameLola);
    fs.unlinkSync(filenameVerilog);

    const resultDict = {
        compiled,
        compilationErrors,
        compiledVerilogCode,
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
        console.log(`${getTime()} returning response: ${JSON.stringify(resp)}`);
        console.log('--- /compile_lola endpoint call END ---')
        res.send(JSON.stringify(resp));
    }).catch((err) => {
        console.error(err);
    })

});


