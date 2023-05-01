const express = require('express');
const fs = require('fs')
const subProcess = require('child_process')
const bodyParser = require('body-parser')

const app = express();
const port = 5000;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded());     // to support URL-encoded bodies

async function compileLola(lolaCode) {

    let compiled = true
    let compilationErrors = []
    let compiledVerilogCode = ''

    if (lolaCode.length < 1) {

        console.log(`${getTime()} - compileLola() - No Lola code found, compiled = False`)

        let resultDict = {
            "compiled": false,
            "compilationErrors": ["No code to compile"],
            "compiledVerilogCode": ''
        }

        console.log(`${getTime()} - compileLola() - returning: ${JSON.stringify(resultDict)}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(resultDict);
            }, 500); // wait for 0.5 seconds for promise
        });

    } else {

        // set unique name for files: blockly_yy_mm_dd_HH_MM_SS.Lola
        let datetime = getTime("_")
        let filenameLola = `compile/blockly_${datetime}.Lola`
        let filenameVerilog = `compile/blockly_${datetime}.v`

        // create file and write lola code into the newly created file
        console.log(`${getTime()} - compileLola() - Creating file: ${filenameLola}`)
        fs.writeFileSync(filenameLola, lolaCode)

        // compile that file with Lola executable
        console.log(`${getTime()} - compileLola() - Compiling .Lola file with subProcess`)
        let child = subProcess.exec(`../Lola ${filenameLola} ${filenameVerilog}`, {timeout: 4000},
            (err, stdout, stderr) => {
                if (err) {
                    console.error(`${getTime()} - compileLola() - error: ${err}`)

                    // delete files
                    for (const filename of [filenameLola, filenameVerilog]) {
                        if (fs.existsSync(filename)) {
                            fs.unlinkSync(filename)
                            console.log(`${getTime()} - compileLola() - delete file: ${filename}`)
                        }
                    }

                    console.log(`${getTime()} - compileLola() - compiled = False and read compilation errors`)

                    compiled = false

                    if (stderr) {
                        console.log(`${getTime()} - compileLola() - Errors found, pushing them to compilationErrors`)
                        compilationErrors.push(stderr.toString())
                    } else {
                        console.log(`${getTime()} - compileLola() - No errors found, something strange happened`)
                        compilationErrors.push('Compiler failed without giving any Lola errors')
                        compilationErrors.push('Maybe there is nothing for compiler to compile')
                        compilationErrors.push('or compiler could not make sense of the code written')
                    }

                    // kill the child process
                    child.kill("SIGINT")

                } else {
                    // no errors while compiling => meaning code might be bad, but at least it was compiled
                    let out = stdout.toString()
                    let err = stderr.toString()

                    // check output of compilation
                    let linesOfOutput = out.split('\n')
                    let checkCompilation = true

                    for (const lineOfOutput of linesOfOutput) {
                        if (lineOfOutput.includes('err:')) {
                            compilationErrors.push(lineOfOutput)
                            if (checkCompilation) {
                                compiled = false
                                checkCompilation = false
                            }
                        }
                        if (lineOfOutput.includes('compilation failed') && checkCompilation) {
                            compiled = false
                            checkCompilation = false
                        }
                    }

                    // if compiled, get verilog file info
                    if (compiled) {
                        console.log(`${getTime()} - compileLola() - reading compiled verilog file: ${filenameVerilog}`)
                        try {
                            compiledVerilogCode = fs.readFileSync(filenameVerilog).toString()
                        } catch (err) {
                            console.error(`${getTime()} - compileLola() - error while reading verilog file: ${err}`)
                            compilationErrors.push(`Error while reading verilog file: ${err}`)
                        }
                    }


                    // delete files
                    for (const filename of [filenameLola, filenameVerilog]) {
                        if (fs.existsSync(filename)) {
                            fs.unlinkSync(filename)
                            console.log(`${getTime()} - compileLola() - delete file: ${filename}`)
                        }
                    }

                    child.kill("SIGINT")
                }

            });

        let resultDict = {
            "compiled": compiled,
            "compilationErrors": compilationErrors,
            "compiledVerilogCode": compiledVerilogCode
        }
        console.log(`${getTime()} - compileLola() - returning: ${JSON.stringify(resultDict)}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(resultDict);
            }, 500); // wait for 0.5 seconds for promise
        });

    }
}

function getTime(separator = " ") {
    let date = new Date();
    let currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let currentTime = date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    return currentDate + separator + currentTime
}

// This displays message that the server running and listening to specified port
app.listen(port, '127.0.0.1', () => console.log(`${getTime()} Listening on port ${port}`));

app.post('/compile_lola', async (req, res) => {
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

app.post('/check_valid_lola', async (req, res) => {
    console.log('--- /check_valid_lola endpoint call START ---')
    console.log(`${getTime()} Received request with payload: ${JSON.stringify(req.body)}`);

    let resp = {
        'status': 200,
        'valid': false,
    }

    console.log(`${getTime()} Trying to compile lola code...`);
    compileLola(req.body.code).then((compiledDict) => {
        // try compiling lola code
        console.log(`${getTime()} compileLolaDict: ${JSON.stringify(compiledDict)}`);
        resp.valid = compiledDict.compiled
        console.log(`${getTime()} response: ${JSON.stringify(resp)}`);
        console.log('--- /check_valid_lola endpoint call END ---')
        res.send(JSON.stringify(resp));
    }).catch((err) => {
        console.error(err);
    });




});