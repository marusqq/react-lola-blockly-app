`timescale 1ns / 1ps

module testbench_ALU;

    // Inputs
    reg [5:0] x;
    reg [5:0] y;
    reg [3:0] op;
    
    // Outputs
    wire [5:0] z;
    wire [5:0] zNoRing;
    wire [0:0] IOF;
    wire [0:0] BAF;
    wire [0:0] ZF;

    // Instantiate the Unit Under Test (UUT)
    ALU uut (
        .x(x), 
        .y(y), 
        .z(z),
        .zNoRing(zNoRing),
        .op(op),
        .IOF(IOF),
        .BAF(BAF),
        .ZF(ZF)
    );

        // for expected checks
        reg [5:0] expected_z;
        reg [5:0] expected_y;
        reg [5:0] expected_x; 
        reg [0:0] expected_BAF; 
        reg [0:0] expected_IOF;
        reg [0:0] expected_ZF;

        reg [5:0] expected_dummy1;
        reg [5:0] expected_dummy2;
        reg [5:0] expected_dummy3;
        reg [5:0] expected_dummy4;

        // for saving values
        reg [5:0] dummy1;
        reg [5:0] dummy2;
        reg [5:0] dummy3;
        reg [5:0] dummy4;


    initial begin


        // initial values
        x = 6'b00000;
        y = 6'b000000;
        op = 4'b0001;

        // TESTCASE # 1 ===================================================================
        x = 6'b001010;
        $display("----------------------------");
        $display("Testcase #1: NOT, INC, XOR");
        $display("Starting values:");
        $display("x = %b (dec: %d)", x, x);
        $display("y = %b (dec: %d)", y, y);
        $display("z = %b (dec: %d)", z, z);
        $display("BAF=%b, IOF=%b, ZF=%b", BAF, IOF, ZF);
        $display("----------------------------");

        // negate X, INC Z, and XOR Z with y(110010 - 50)
        $display("1. Negate X, INCrease result and XOR result with 110010");

        // negate
        op = 4'b0000;
        #10;
        x = z;

        // inc x
        op = 4'b1000;
        #10;
        x = z;

        // xor with 110010
        op = 4'b1101;
        y = 6'b110010;
        #10;
    
        // check if values as expected
        $display("Register check!");
        $display("x = %b (dec: %d)", x, x);
        $display("y = %b (dec: %d)", y, y);
        $display("z = %b (dec: %d)", z, z);
        $display("BAF=%b, IOF=%b, ZF=%b", BAF, IOF, ZF);
        
        // expected results
        expected_z = 4;
        expected_BAF = 1;
        
        if ((z !== expected_z) || (BAF !== expected_BAF)) begin
            $error("Expected: Z value: %b (dec: %d), BAF: %b", expected_z, expected_z, expected_BAF);
            $display("FAILED!");
        end
        else begin
            $display("Z is as expected: %b (dec: %d)", expected_z, expected_z);
            $display("BAF is as expected: %b", expected_BAF);
            $display("PASSED!");
            
        end
        $display("----------------------------");
        $display("TESTCASE #1 END");
        $display("----------------------------");
        $display("-");
        

        // TESTCASE # 2 ===================================================================
        x = 6'b000000;
        y = 6'b000000;
        op = 4'b1010;
        #10;
        x = 6'b001100;

        $display("----------------------------");
        $display("Testcase #2: NAND with 000000, run: DIFF, LESS, MORE OR EQUAL");
        $display("Starting values:");
        $display("x = %b (dec: %d)", x, x);
        $display("y = %b (dec: %d)", y, y);
        $display("z = %b (dec: %d)", z, z);
        $display("BAF=%b, IOF=%b, ZF=%b", BAF, IOF, ZF);
        $display("----------------------------");

        // save x to dummy value
        dummy1 = x;

        // DO: NAND
        op = 4'b1100;
        #10;
        x = z;

        // DO: DIFF
        // return the old value to check
        y = dummy1;

        op = 4'b0011;
        #10;

        // save the diff result to dummy2
        dummy2 = z;

        // clear the dummy1 
        dummy1 = 6'b000000;

        // DO: LESS
        op = 4'b0110;
        #10;

        // save the less result to dummy3
        dummy3 = z;

        // DO: MORE OR EQUAL
        op = 4'b0101;
        #10;

        // save the more or equal result to dummy4;
        dummy4 = z;

        // now check
        // check if values as expected
        $display("Register check!");
        $display("x = %b (dec: %d)", x, x);
        $display("y = %b (dec: %d)", y, y);
        $display("z = %b (dec: %d)", z, z);
        $display("BAF=%b, IOF=%b, ZF=%b", BAF, IOF, ZF);

        // expected values
        expected_dummy2 = 1'b1;
        expected_dummy3 = 1'b0;
        expected_dummy4 = 1'b1;

        // asserts
        $display("----------------------------");
        $display("x = %b (dec: %d) should NOT be equal to y = %b (dec: %d):", x, x, y, y);
        if (dummy2 !== expected_dummy2) begin
            $error("FAIL");
        end
        else begin
            $display("PASSED!");
        end
        $display("----------------------------");

        $display("x = %b (dec: %d) should NOT be less than y = %b (dec: %d):", x, x, y, y);
        if (dummy3 !== expected_dummy3) begin
            $error("FAIL");
        end
        else begin
            $display("PASSED!");
        end
        $display("----------------------------");

        $display("x = %b (dec: %d) should be MORE or EQUAL than y = %b (dec: %d):", x, x, y, y);
        if (dummy4 !== expected_dummy4) begin
            $error("FAIL");
        end
        else begin
            $display("PASSED!");
        end

        $display("----------------------------");
        $display("TESTCASE #2 END");
        $display("----------------------------");
        $display("-");

        // TESTCASE # 3 ===================================================================
        x = 6'b000000;
        y = 6'b000000;
        op = 4'b1010;
        #10;
        x = 6'b011111;
        y = 6'b100000;

        $display("----------------------------");
        $display("Testcase #3.1: ADD 011111 to 100000, check result EQUAL to 011111");
        $display("Starting values:");
        $display("x = %b (dec: %d)", x, x);
        $display("y = %b (dec: %d)", y, y);
        $display("z = %b (dec: %d)", z, z);
        $display("BAF=%b, IOF=%b, ZF=%b", BAF, IOF, ZF);
        $display("----------------------------");

        #10;

        // save ADD result to x;
        y = z;

        // check x to be equal to y
        op = 4'b0010;
        #10;

        // save equal to dummy1
        dummy1 = z;

        // show values
        expected_dummy1 = 1'b1;
        $display("Register check!");
        $display("x = %b (dec: %d)", x, x);
        $display("y = %b (dec: %d)", y, y);
        $display("z = %b (dec: %d)", z, z);
        $display("BAF=%b, IOF=%b, ZF=%b", BAF, IOF, ZF);

        // asserts
        $display("----------------------------");
        $display("x = %b (dec: %d) should be EQUAL to y = %b (dec: %d):", x, x, y, y);
        if (dummy1 !== expected_dummy1) begin
            $error("FAIL");
        end
        else begin
            $display("PASSED!");
        end
        $display("----------------------------");

        $display("Testcase #3.2  AND with 010101, LESS OR EQUAL WITH 010101");
        $display("----------------------------");
        // AND with 010101;
        y = 6'b010101;
        op = 4'b1110;
        #10;

        // save that value to x and compare if less or equal to 010101 (y)
        x = z;
        op = 4'b0111;
        #10;

        // save the result to dummy2;
        dummy2 = z;


        // set expected
        expected_dummy2 = 1'b1;
        $display("Register check!");
        $display("x = %b (dec: %d)", x, x);
        $display("y = %b (dec: %d)", y, y);
        $display("z = %b (dec: %d)", z, z);
        $display("BAF=%b, IOF=%b, ZF=%b", BAF, IOF, ZF);

        $display("----------------------------");
        $display("x = %b (dec: %d) should be LESS OR EQUAL to y = %b (dec: %d):", x, x, y, y);
        if (dummy2 !== expected_dummy2) begin
            $error("FAIL");
        end
        else begin
            $display("PASSED!");
        end
        $display("----------------------------");
        $display("TESTCASE #3 END");
        $display("----------------------------");
        $display("-");


        // TESTCASE # 4 ===================================================================
        x = 6'b000000;
        y = 6'b000000;
        op = 4'b1110;
        #10;
        x = 6'b111111;
        #10;

        $display("----------------------------");
        $display("Testcase #4: DEC from 111111, SUB result - 000101, OR result | 110011, MORE result 101111 & UNUSED command 0001");
        $display("Starting values:");
        $display("x = %b (dec: %d)", x, x);
        $display("y = %b (dec: %d)", y, y);
        $display("z = %b (dec: %d)", z, z);
        $display("BAF=%b, IOF=%b, ZF=%b", BAF, IOF, ZF);
        $display("----------------------------");

        // DEC from 111111
        op = 4'b1001;
        #10;

        // save the DEC result to x
        x = z;

        // SUB from 000101
        y = 6'b000101;
        op = 4'b1011;
        #10;

        // save the SUB result to x
        x = z;

        // OR result from 110011
        y = 6'b110011;
        op = 4'b1111;
        #10;

        // save the OR result to x
        x = z;

        // check if result MORE than 101111
        y = 6'b101111;
        op = 4'b0100;
        #10;

        // save more check result to dummy1, because unused command will switch Z to 0
        dummy1 = z;

        // AND unexpected command
        op = 4'b0001;
        #10;

        $display("Register check!");
        $display("x = %b (dec: %d)", x, x);
        $display("y = %b (dec: %d)", y, y);
        $display("z = %b (dec: %d)", z, z);
        $display("BAF=%b, IOF=%b, ZF=%b", BAF, IOF, ZF);

        expected_dummy1 = 1'b0;
        expected_BAF = 1'b1;
        expected_ZF = 1'b1;
        expected_IOF = 1'b1;
        
        $display("----------------------------");
        $display("x = %b (dec: %d) should NOT be more than y = %b (dec: %d):", x, x, y, y);
        if (dummy1 !== expected_dummy1) begin
            $error("FAIL");
        end
        else begin
            $display("PASSED!");
        end
        $display("----------------------------");

        $display("----------------------------");
        $display("expected IOF: %b, expected ZF: %b, expected BAF: %b", expected_IOF, expected_ZF, expected_BAF);
        if ((expected_IOF !== IOF) || (expected_BAF !== BAF) || (expected_ZF !== ZF)) begin
            $error("FAIL => IOF: %b, ZF: %b, BAF: %b", IOF, ZF, BAF);
        end
        else begin
            $display("PASSED!");
        end

        $display("----------------------------");
        $display("TESTCASE #4 END");
        $display("----------------------------");

        // End simulation
        $finish;
    end
    
endmodule