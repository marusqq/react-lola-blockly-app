const express = require('express');
const fs = require('fs')
const subProcess = require('child_process')

const app = express(); //Line 2
const port = process.env.PORT || 5000;

function getTime(){
    let date = new Date();
    let currentDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    let currentTime = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    let datetime = currentDate+" "+currentTime
    return datetime
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));


app.post('/compile_lola', (req, res) => {

    console.log('-------------------')

    let resp = {
        'status': 200,
        'compiled': false,
        'verilogCode': ''
    }

    // set unique name for files: blockly_yy_mm_dd_HH_MM_SS.Lola
    let date = new Date();
    let currentDate = date.getFullYear()+"_"+(date.getMonth()+1)+"_"+ date.getDate();
    let currentTime = date.getHours()+"_"+date.getMinutes()+"_"+ date.getSeconds();

    let datetime = currentDate+"_"+currentTime

    let filenameLola = `compile/blockly_${datetime}.Lola`
    let filenameVerilog = `compile/blockly_${datetime}.v`

    // get lola code from blockly
    let lolaCode =
`MODULE Multiplier (     (*NW 13.9.2014*)
  IN clk, run, u: BIT;
  OUT stall: BIT;
  IN x, y: WORD;   (*32 bit*)
  OUT z: [64] BIT);

  REG (clk) S: [6] BIT;   (*state*)
    P: [64] BIT;   (*produfdsfdsct*)
  VAR w0: WORD;
    w1: [33] BIT;

BEGIN stall := run & (S # 33);
  w0 := P.0 -> y : 0;
  w1 := (S =32) & u -> {P.63, P[63:32]} - {w0.31, w0} : {P.63, P[63:32]} + {w0.31, w0};
  S := run -> S+1 : 0;
  P := (S = 0) -> {0'32, x} : {w1[32:0], P[31:1]};
  z := P;
END Multiplier.
`

    // call received
    console.log(`${getTime()} Compile Lola POST call received`)

    // create a file with that lola code ,
    console.log(`${getTime()} Creating file: ${filenameLola}`)
    fs.writeFileSync(filenameLola, lolaCode)

    // compile that file with Lola executable
    console.log(`${getTime()} Compiling .Lola file`)
    subProcess.exec(`../Lola ${filenameLola} ${filenameVerilog}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`${getTime()}: error: ${err}`)
            process.exit(1)
        } else {
            let out = stdout.toString()
            // let err = stderr.toString()

            // check output of compilation
            let lines_of_output = out.split('\n')
            if (lines_of_output.length > 4) {
                resp.compiled = lines_of_output[4].includes('done')

                // if compiled, get verilog file info
                resp.verilogCode = fs.readFileSync(filenameVerilog).toString()
            }

            // delete files
            for (const filename of [filenameLola, filenameVerilog]) {
                if (fs.existsSync(filename)) {
                    fs.unlinkSync(filename)
                    console.log(`${getTime()} file: ${filename}`)
                }
            }

            // return response
            console.log(`${getTime()} Returning ${JSON.stringify(resp)}`)
            res.send(resp);
            console.log('-------------------');
        }
    })

});