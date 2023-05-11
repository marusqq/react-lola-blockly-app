`timescale 1ns / 1ps

module testbench_ALU;

    // Inputs
    reg [5:0] x_input;
    reg [5:0] y_input;
    reg [3:0] op_input;
    
    // Outputs
    wire [5:0] z_output;
    wire [5:0] zNoRing;
    wire [0:0] iof_output;
    wire [0:0] baf_output;
    wire [0:0] zf_output;

    // Instantiate the Unit Under Test (UUT)
    ALU uut (
        .x(x_input), 
        .y(y_input), 
        .z(z_output),
        .zNoRing(zNoRing),
        .op(op_input),
        .IOF(iof_output),
        .BAF(baf_output),
        .ZF(zf_output)
    );
    
    initial begin

        
        // initial values
        y_input = 6'b000000;
        x_input = 6'b000000;
        op_input = 6'b0001;


        // End simulation
        $finish;
    end
    
endmodule