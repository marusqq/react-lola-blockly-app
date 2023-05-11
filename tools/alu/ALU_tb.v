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

        
        // NEGATE command 0000
        $display("------------------------");
        x_input = 6'b010101;
        op_input = 4'b0000;
        
        // wait 10 nanoseconds
        #10;

        $display("NEGATE command = %b", op_input);
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------");


        // 0001 => UNUSED


        // EQUAL command 0010
        $display("------------------------");
        x_input = 6'b010101;
        y_input = 6'b010101;
        op_input = 4'b0010;
        
        // wait 10 nanoseconds
        #10;

        $display("EQUAL command = %b", op_input);
        $display("#1 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        y_input = 6'b010111;
        
        // wait 10 nanoseconds
        #10;
        $display("#2 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        $display("------------------------");

        
        // DIFF command 0011
        $display("------------------------");
        x_input = 6'b111111;
        y_input = 6'b010101;
        op_input = 4'b0011;
        
        // wait 10 nanoseconds
        #10;

        $display("DIFF command = %b", op_input);
        $display("#1 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        y_input = 6'b111111;
        
        // wait 10 nanoseconds
        #10;
        $display("#2 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        $display("------------------------");


        // MORE command 0100
        $display("------------------------");
        x_input = 6'b010101;
        y_input = 6'b010111;
        op_input = 4'b0100;
        
        // wait 10 nanoseconds
        #10;

        $display("MORE command = %b", op_input);
        $display("#1 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        y_input = 6'b000001;
        
        // wait 10 nanoseconds
        #10;

        $display("#2 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------");


        // MORE OR EQUAL command 0101
        $display("------------------------");
        x_input = 6'b010101;
        y_input = 6'b010101;
        op_input = 4'b0101;
        
        // wait 10 nanoseconds
        #10;

        $display("MORE OR EQUAL command = %b", op_input);
        $display("#1 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        y_input = 6'b000001;
        
        // wait 10 nanoseconds
        #10;

        $display("#2 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        y_input = 6'b110101;
        
        // wait 10 nanoseconds
        #10;
        
        $display("#3 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        $display("------------------------");


        // LESS command 0110
        $display("------------------------");
        x_input = 6'b010101;
        y_input = 6'b010111;
        op_input = 4'b0110;
        
        // wait 10 nanoseconds
        #10;

        $display("LESS command = %b", op_input);
        $display("#1 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        y_input = 6'b000001;
        
        // wait 10 nanoseconds
        #10;

        $display("#2 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------");


        // LESS OR EQUAL command 0111
        $display("------------------------");
        x_input = 6'b010101;
        y_input = 6'b010101;
        op_input = 4'b0111;
        
        // wait 10 nanoseconds
        #10;

        $display("LESS OR EQUAL command = %b", op_input);
        $display("#1 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        y_input = 6'b000001;
        
        // wait 10 nanoseconds
        #10;

        $display("#2 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        y_input = 6'b110101;
        
        // wait 10 nanoseconds
        #10;
        
        $display("#3 test");
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);

        $display("------------------------");


        // INC command 1000
        $display("------------------------");
        x_input = 6'b010101;
        op_input = 4'b1000;
        
        // wait 10 nanoseconds
        #10;

        $display("INC command = %b", op_input);
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------"); 


        // DEC command 1001
        $display("------------------------");
        x_input = 6'b010101;
        op_input = 4'b1001;
        
        // wait 10 nanoseconds
        #10;

        $display("DEC command = %b", op_input);
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------"); 


        // ADD command 1010
        $display("------------------------");
        x_input = 6'b101101;
        y_input = 6'b000011;
        op_input = 4'b1010;
        
        // wait 10 nanoseconds
        #10;

        $display("ADD command = %b", op_input);
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------"); 


        // SUB command 1011
        $display("------------------------");
        x_input = 6'b010101;
        y_input = 6'b000101;
        op_input = 4'b1011;
        
        // wait 10 nanoseconds
        #10;

        $display("SUB command = %b", op_input);
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------"); 


        // NAND command 1100
        $display("------------------------");
        x_input = 6'b010101;
        y_input = 6'b000101;
        op_input = 4'b1100;
        
        // wait 10 nanoseconds
        #10;

        $display("NAND command = %b", op_input);
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------"); 

        // 1100 - UNUSED


        // XOR command 1101
        $display("------------------------");
        x_input = 6'b111000;
        y_input = 6'b001110;
        op_input = 4'b1101;
        
        // wait 10 nanoseconds
        #10;

        $display("XOR command = %b", op_input);
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------"); 


        // AND command 1110
        $display("------------------------");
        x_input = 6'b111000;
        y_input = 6'b001110;
        op_input = 4'b1110;
        
        // wait 10 nanoseconds
        #10;

        $display("AND command = %b", op_input);
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("------------------------"); 


        // OR command 1111
        $display("------------------------");
        x_input = 6'b111000;
        y_input = 6'b001110;
        op_input = 4'b1111;
        
        // wait 10 nanoseconds
        #10;

        $display("OR command = %b", op_input);
        $display("%b <- x (dec: %d)", x_input, x_input);
        $display("%b <- y (dec: %d)", y_input, y_input);
        $display("%b <- z (dec: %d)", z_output, z_output);
        $display("%b <- BAF, %b <- ZF, %b <- IOF", baf_output, zf_output, iof_output);
        $display("%b <- zNoRing", zNoRing);
        $display("------------------------"); 


        // End simulation
        $finish;
    end
    
endmodule