import requests

# set the API endpoint URL
url = 'https://lola-blockly.org/lola-to-verilog'

# set the code you want to send
multiplier_lola = '''
MODULE Multiplier (     (*NW 13.9.2014*)
  IN clk, run, u: BIT;
  OUT stall: BIT;
  IN x, y: WORD;   (*32 bit*)
  OUT z: [64] BIT);

  REG (clk) S: [6] BIT;   (*state*)
    P: [64] BIT;   (*product*)
  VAR w0: WORD;
    w1: [33] BIT;

BEGIN stall := run & (S # 33);
  w0 := P.0 -> y : 0;
  w1 := (S =32) & u -> {P.63, P[63:32]} - {w0.31, w0} : {P.63, P[63:32]} + {w0.31, w0};
  S := run -> S+1 : 0;
  P := (S = 0) -> {0'32, x} : {w1[32:0], P[31:1]};
  z := P
END Multiplier.
'''

alu_chat_gpt = '''
MODULE alu (
    operand_a: IN LONGINT,
    operand_b: IN LONGINT,
    alu_op: IN INTEGER,
    result: OUT LONGINT
);

VAR
    temp_result: LONGINT;

BEGIN
    CASE alu_op OF
        0: temp_result := operand_a + operand_b;  -- add
        1: temp_result := operand_a - operand_b;  -- subtract
        2: temp_result := operand_a & operand_b;  -- bitwise AND
        3: temp_result := operand_a | operand_b;  -- bitwise OR
        4: temp_result := operand_a ~ operand_b;  -- bitwise XOR
        5: temp_result := operand_a << operand_b; -- left shift
        6: temp_result := operand_a >> operand_b; -- right shift
        7: temp_result := ~operand_a;             -- bitwise NOT
        ELSE temp_result := -1;                   -- error
    END;

    result := temp_result;
END alu.
'''


code = alu_chat_gpt


# create the request payload as a dictionary
payload = {'code': code}

# set the headers to indicate that the request body is JSON
headers = {'Content-Type': 'application/json'}

# send the request
response = requests.post(url, json=payload, headers=headers)

# check the response status code
if response.status_code != 200:
    print('Request failed: {}'.format(response.text))

# handle successful response
response_data = response.json()

print(response_data)
# print('Request succeeded: {}'.format(response.text))

    
# print(response_data["compiled"])

# from pprint import pprint
# pprint(response_data['verilogCode'])
# write the verilogCode to a file
# with open('RISC5.v', 'w') as f:
#     f.write(response_data['verilogCode'])