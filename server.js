const express = require('express');
const fs = require('fs')
const subProcess = require('child_process')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded());     // to support URL-encoded bodies


function getTime() {
    let date = new Date();
    let currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let datetime = currentDate + " " + currentTime
    return datetime
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/compile_lola', (req, res) => {

    console.log('-------------------')

    let resp = {
        'status': 200,
        'compiled': true,
        'compilationErrors': [],
        'verilogCode': ''
    }

    // set unique name for files: blockly_yy_mm_dd_HH_MM_SS.Lola
    let date = new Date();
    let currentDate = date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate();
    let currentTime = date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();

    let datetime = currentDate + "_" + currentTime

    let filenameLola = `compile/blockly_${datetime}.Lola`
    let filenameVerilog = `compile/blockly_${datetime}.v`

    // get lola code from blockly
    let lolaCode = req.body.code

    // call received
    console.log(`${getTime()} Compile Lola POST call received with body:\n ${JSON.stringify(req.body)}`)

    // create a file with that lola code ,
    console.log(`${getTime()} Creating file: ${filenameLola}`)
    fs.writeFileSync(filenameLola, lolaCode)

    // compile that file with Lola executable
    console.log(`${getTime()} Compiling .Lola file`)
    subProcess.exec(`../Lola ${filenameLola} ${filenameVerilog}`, {timeout: 4000},
        (err, stdout, stderr) => {
            if (err) {
                console.error(`${getTime()}: error: ${err}`)

                // delete files
                for (const filename of [filenameLola, filenameVerilog]) {
                    if (fs.existsSync(filename)) {
                        fs.unlinkSync(filename)
                        console.log(`${getTime()} delete file: ${filename}`)
                    }
                }
                
                resp.compiled = false
                resp.compilationErrors.push('Compiler failed without errors')
                resp.compilationErrors.push('Maybe there is nothing for compiler to compile')
                resp.compilationErrors.push('or compiler could not make sense of the code written')
                res.send(resp);
            } else {
                let out = stdout.toString()
                let err = stderr.toString()
                console.log(err)
                console.log(out)

                // check output of compilation
                let linesOfOutput = out.split('\n')
                let checkCompilation = true

                for (const lineOfOutput of linesOfOutput) {
                    if (lineOfOutput.includes('err:')) {
                        resp.compilationErrors.push(lineOfOutput)
                        if (checkCompilation) {
                            resp.compiled = false
                            checkCompilation = false
                        }
                    }
                    if (lineOfOutput.includes('compilation failed') && checkCompilation) {
                        resp.compiled = false
                        checkCompilation = false
                    }
                }

                // if compiled, get verilog file info
                if (resp.compiled) {
                    console.log(`${getTime()} reading compiled verilog file: ${filenameVerilog}`)
                    resp.verilogCode = fs.readFileSync(filenameVerilog).toString()
                }


                // delete files
                for (const filename of [filenameLola, filenameVerilog]) {
                    if (fs.existsSync(filename)) {
                        fs.unlinkSync(filename)
                        console.log(`${getTime()} delete file: ${filename}`)
                    }
                }

                // return response
                console.log(`${getTime()} Returning ${JSON.stringify(resp)}`)
                res.send(resp);
                console.log('-------------------');
            }
        })

});
