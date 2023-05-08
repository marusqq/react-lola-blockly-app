//
// Module UART_V.address_decode.tbl
//
// Created:
//          by - user.group (host.domain)
//          at - 16:14:36 01/03/2001
//
// Generated by Mentor Graphics' HDL Designer(TM) 2001.0
//

`resetall
`timescale 1ns/10ps
module address_decode( 
   addr, 
   clk, 
   rst, 
   clk_div_en, 
   clr_int_en, 
   ser_if_select, 
   xmitdt_en
);


// Internal Declarations

input  [2:0] addr;
input        clk;
input        rst;
output       clk_div_en;
output       clr_int_en;
output [1:0] ser_if_select;
output       xmitdt_en;


wire [2:0] addr;
wire clk;
wire rst;
reg clk_div_en;
reg clr_int_en;
reg [1:0] ser_if_select;
reg xmitdt_en;

// Local declarations
 

///////////////////////////////////////////////////////////////////////////
always @ (addr) begin

   // Global Actions
   clk_div_en = 0;
   xmitdt_en = 0;
   clr_int_en = 0;
   ser_if_select = 2'b0;


   // Block 1
   case (addr)
      0 :
         clk_div_en = 1;
      1 :
         clk_div_en = 1;
      4 :
         begin
            xmitdt_en = 1;
            ser_if_select = addr[1:0];
         end
      5 :
         ser_if_select = addr[1:0];
      6 :
         ser_if_select = addr[1:0];
      7 :
         clr_int_en = 1;
      default:
         begin
            clk_div_en = 0;
            xmitdt_en = 0;
            ser_if_select = "11";
            clr_int_en = 0;
         end
   endcase
end

endmodule // address_decode
