module ALU(
  input [5:0] x,
  input [5:0] y,
  output [5:0] z,
  output [5:0] zNoRing,
  input [3:0] op,
  output [0:0] BAF,
  output [0:0] IOF,
  output [0:0] ZF
);

  assign zNoRing = (
    op[3] ? (
      op[2] ? (
        op[1] ? (
          op[0] ? (x | y) : (x & y)
        ) : (
          op[0] ? (x ^ y) : (~x | ~y)
        )
      ) : (
        op[1] ? (
          op[0] ? (x - y) : (x + y)
        ) : (
          op[0] ? (x - 1) : (x + 1)
        )
      )
    ) : (
      op[2] ? (
        op[1] ? (
          op[0] ? (x <= y) : (x < y)
        ) : (
          op[0] ? (x >= y) : (x > y)
        )
      ) : (
        op[1] ? (
          op[0] ? (x != y) : (x == y)
        ) : (
          op[0] ? 0 : ~x
        )
      )
    )
  );

  assign BAF = ((x >= 32) ? 1 : ((y >= 32) ? 1 : 0));
  assign IOF = ((op == 1) ? 1 : 0);
  assign ZF = ((zNoRing == 0) ? 1 : 0);

  assign z = ((zNoRing >= 32) ? (zNoRing - 32) : zNoRing);

endmodule