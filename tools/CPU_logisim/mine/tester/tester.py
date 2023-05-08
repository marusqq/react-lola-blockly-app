#!/usr/bin/env python
# -*- coding: UTF-8 -*-
__author__ = "Marius Pozniakovas"
__email__ = "pozniakovui@gmail.com"
"""script for generating test RAM data for logisim CPU project"""

import json
import os

HEX_IMMED = ["swi", "lwi"]
JUMPS = ["jmpi", "jnzi", "jzi", "jnbafi", "jbafi"]

COMMANDS_USING_RD = [
    "lw",
    "sw",
    "mov",
    "lwi",
    "swi",
    "lii",
    "vld",
    "neg",
    "inc",
    "dec",
    "cmpz",
    "inv",
    "shl",
    "shr",
    "rol",
    "ror",
    "not",
    "n1",
    "n0",
    "add",
    "sub",
    "mul",
    "div",
    "op1",
    "op2",
    "op3",
    "xor",
    "and",
    "or",
]

COMMANDS_USING_RS = [
    "lw",
    "sw",
    "mov",
    "add",
    "sub",
    "mul",
    "div",
    "op1",
    "op2",
    "xor",
    "and",
    "or",
]

COMMANDS_USING_IMMED = ["lwi", "swi", "jmpi", "jnzi", "jzi", "jnbafi", "jbafi", "lii"]

def is_hex(s):
    try:
        int(s, 16)
        return True
    except ValueError:
        return False


def _check_for_single_digit_hex(hex_value):
    if len(hex_value) < 2:
        return "0" + hex_value
    return hex_value


def _bin2hex(bin_val):
    dec_command_value = int("00" + bin_val, 2)
    hex_val = format(dec_command_value, "x")
    return _check_for_single_digit_hex(hex_val)


def _dec2bin(dec_val):
    return "{0:03b}".format(dec_val)


def _dec2hex(dec_val):
    bin_value = _dec2bin(dec_val)
    return _bin2hex(bin_value)


def _pretty_print_json(json_data):
    print(json.dumps(json_data, indent=4, sort_keys=True))


def check_if_commands_okay(data):

    print(json.dumps(data, indent=4, sort_keys=True))
    print("--------------------------------------------------")

    print("Please check if operation codes above are correct")
    input("Press any key to continue\n")

    os.system("clear")

    return


def convert_commands_to_hex(data):
    """returns a new dict with data[command] converted to hex"""
    data_hex = {}

    for name, command in data.items():

        hex_command_value = _bin2hex(command)
        data_hex[name] = hex_command_value

    return data_hex


def convert_registers_to_hex(r_destination=0, r_source=0):
    """returns hex value of two registers
    input: dec value of registers"""

    if r_destination > 8 or r_destination < 0 or r_source > 8 or r_source < 0:
        quit("Bad r_destination or r_source value")

    full_bin = "{0:03b}".format(r_destination) + "{0:03b}".format(r_source)
    return _bin2hex(full_bin)


def create_file(name, test=True):
    if test:
        file_end = "_TEST"
    else:
        file_end = "_HELPER"

    test_file = open(os.getcwd() + "/tests/" + name.upper() + file_end, "w+")

    return test_file


def write_to_test_file(test_data):

    os.system("clear")

    test_file_name = input("Enter name:  ")

    test_file = create_file(test_file_name, test=True)
    test_file.write("v2.0 raw\n")

    command_no = 1
    for hex_data in test_data:

        if command_no == 8:
            test_file.write(hex_data)
            test_file.write("\n")
            command_no = 0

        else:
            test_file.write(hex_data + " ")

        command_no += 1

    return test_file_name


def write_to_helper_file(data, test_file_name):

    helper_file = create_file(test_file_name, test=False)

    for test_line in data:
        helper_file.write(" ".join(test_line) + "\n")

    return


def start_building_test(hex_commands):

    test_data = []
    history = []

    while True:
        test_line, history_line = build_test_line(hex_commands, history)

        # end if no command
        if test_line == "end":
            return test_data, history

        elif test_line == "bad input":
            print("--------------------------------------------------")
            print("Error:")
            input("Bad input, press enter to retry!")
            os.system("clear")

        else:
            # append test_lines
            for test in test_line:
                test_data.append(test)

            # append history_lines
            history.append(history_line)


def build_test_line(hex_commands, history):

    print("Enter command(name), rd(dec), rs(dec) and value(dec)")
    print("Entering no command will finish the file")
    print("--------------------------------------------------")
    print("Possible commands:")
    print(", ".join(hex_commands))
    print("--------------------------------------------------")
    if history:
        print("History:")
        command_counter = 1
        for hist in history:
            print(str(command_counter) + ". " + " ".join(hist))
            command_counter += 1
        print("--------------------------------------------------")

    print("")

    history_line = []
    test_data = []

    # get command
    command = input("C:  ")
    if command == "":
        return "end", None
    elif command not in hex_commands:
        return "bad input", None
    command_hex = hex_commands[command]

    test_data.append(command_hex)
    history_line.append(command)

    # get reg1
    if command in COMMANDS_USING_RD:
        reg1 = input("RD:  ")
        if reg1 == "":
            reg1 = "0"

        if not reg1.isdigit():
            return "bad input", None
        elif int(reg1) < 0 or int(reg1) > 7:
            return "bad input", None
        else:
            reg1_bin = _dec2bin(int(reg1))

        # start collecting full register
        reg_6bit = reg1_bin

    else:
        reg_6bit = "000"

    # get reg2
    if command in COMMANDS_USING_RS:
        reg2 = input("RS:  ")
        if reg2 == "":
            reg2 = "0"

        if not reg2.isdigit():
            return "bad input", None
        elif int(reg2) < 0 or int(reg2) > 7:
            return "bad input", None
        else:
            reg2_bin = _dec2bin(int(reg2))

        # finish collecting full register
        reg_6bit += reg2_bin

    # if we don't have RS register
    else:
        reg_6bit += "000"

    if command in COMMANDS_USING_RD:
        reg_hex = _bin2hex(reg_6bit)
        test_data.append(reg_hex)
        history_line.append(reg1)

    if command in COMMANDS_USING_RS:
        history_line.append(reg2)

    if command in JUMPS:
        test_data.append('00')

    if command in COMMANDS_USING_IMMED:
        # get val
        value = input("V:  ")
        if value == "":
            value = "0"

        if command not in JUMPS and command not in HEX_IMMED:
            if not value.isdigit():
                return "bad input", None

            value_hex = _dec2hex(int(value))
        
        else:
            if not is_hex(value):
                return "bad input", None

            value_hex = _check_for_single_digit_hex(value)

        test_data.append(value_hex)
        history_line.append(value) 


    os.system("clear")

    return test_data, history_line


def read_commands(directory):
    try:
        with open(directory) as f:
            data = json.load(f)
    except:
        quit("Error: commands.json not found")

    return data


# -------------------------------------------
# read commands.json file
data = read_commands(os.getcwd() + "/commands.json")

# check if commands are okay
check_if_commands_okay(data)

# convert them to hex
data_hex = convert_commands_to_hex(data)

# for more tests
while True:

    # build test_data
    test_data, helper_data = start_building_test(data_hex)

    # write to test file
    test_file_name = write_to_test_file(test_data)

    # create helper file for test file
    write_to_helper_file(helper_data, test_file_name)

    # ask for another
    another = input("Another test? y for yes ---->  ")
    os.system("clear")
    if another.lower() != "y":
        break
