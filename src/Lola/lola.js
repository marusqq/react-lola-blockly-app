import Blockly from "blockly";


export const generator = generateLolaGenerator()

function generateLolaGenerator() {
    let generator = new Blockly.Generator('Lola');

    generator.ORDER_ATOMIC = 0; // 0 "" ...
    generator.ORDER_COLLECTION = 1; // tuples, lists, dictionaries
    generator.ORDER_STRING_CONVERSION = 1; // `expression...`
    generator.ORDER_MEMBER = 2.1; // . []
    generator.ORDER_FUNCTION_CALL = 2.2; // ()
    generator.ORDER_EXPONENTIATION = 3; // **
    generator.ORDER_UNARY_SIGN = 4; // + -
    generator.ORDER_BITWISE_NOT = 4; // ~
    generator.ORDER_MULTIPLICATIVE = 5; // * / // %
    generator.ORDER_ADDITIVE = 6; // + -
    generator.ORDER_BITWISE_SHIFT = 7; // << >>
    generator.ORDER_BITWISE_AND = 8; // &
    generator.ORDER_BITWISE_XOR = 9; // ^
    generator.ORDER_BITWISE_OR = 10; // |
    generator.ORDER_RELATIONAL = 11; // in, not in, is, is not,
    //     <, <=, >, >=, <>, !=, ==
    generator.ORDER_LOGICAL_NOT = 12; // not
    generator.ORDER_LOGICAL_AND = 13; // and
    generator.ORDER_LOGICAL_OR = 14; // or
    generator.ORDER_CONDITIONAL = 15; // if else
    generator.ORDER_LAMBDA = 16; // lambda
    generator.ORDER_NONE = 99; // (...)

    // Function for getting all blocks where more than one statement is placed
    generator.scrub_ = function (block, code, opt_thisOnly) {
        const nextBlock =
            block.nextConnection && block.nextConnection.targetBlock();
        let nextCode = '';
        if (nextBlock) {
            nextCode =
                opt_thisOnly ? '' : '\n' + generator.blockToCode(nextBlock);
        }
        return code + nextCode;
    };

    // Setup nameDB_
    generator.init = function (workspace) {
        // Call Blockly.Generator's init.
        Object.getPrototypeOf(this).init.call(this);

        if (!this.nameDB_) {
            this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
        } else {
            this.nameDB_.reset();
        }

        this.nameDB_.setVariableMap(workspace.getVariableMap());
        this.nameDB_.populateVariables(workspace);
        this.nameDB_.populateProcedures(workspace);

        let defvars = [];
        // Add developer variables (not created or named by the user).
        let devVarList = Blockly.Variables.allDeveloperVariables(workspace);
        for (let i = 0; i < devVarList.length; i++) {
            defvars.push(this.nameDB_.getName(devVarList[i],
                Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = None');
        }

        // Add user variables, but only ones that are being used.
        let variables = Blockly.Variables.allUsedVarModels(workspace);
        for (let i = 0; i < variables.length; i++) {
            defvars.push(this.nameDB_.getName(variables[i].getId(),
                Blockly.VARIABLE_CATEGORY_NAME) + ' = None');
        }

        this.definitions_['variables'] = defvars.join('\n');
        this.isInitialized = true;
    };

    // ---------------------- Lola generator rules -----------------------------

    // Module - old, no declarations or parameters
    generator['module_block'] = function (block) {

        const moduleDeclarations =
            generator.statementToCode(block, 'module_declarations');

        const moduleStatements =
            generator.statementToCode(block, 'module_statements');

        const moduleName = block.getFieldValue('moduleName')

        // full converted module code:
        let moduleCode;

        // MODULE
        moduleCode = 'MODULE ' + moduleName + ';\n';

        // DECLARATIONS
        moduleCode = moduleCode + moduleDeclarations + '\n';

        // BEGIN
        moduleCode = moduleCode + 'BEGIN \n'

        // STATEMENTS 
        moduleCode = moduleCode + moduleStatements + '\n';

        // END
        moduleCode = moduleCode + 'END ' + moduleName + '.\n';

        return moduleCode
    }

    // Module - new, with module params and begin declarations
    generator['module_block_module_begin'] = function (block) {

        const moduleParameters =
            generator.statementToCode(block, 'module_parameters_input')

        const moduleDeclarations =
            generator.statementToCode(block, 'module_declaration_input');

        const beginStatements =
            generator.statementToCode(block, 'begin_parameters_input');

        const moduleStatements =
            generator.statementToCode(block, 'module_statements_input');

        const moduleName = block.getFieldValue('moduleName')

        // full converted module code:
        let moduleCode;

        // MODULE name
        moduleCode = 'MODULE ' + moduleName + ' ( \n';

        // MODULE PARAMS
        moduleCode = moduleCode + moduleParameters + '\n'
        moduleCode = moduleCode + ');\n'

        // DECLARATIONS
        moduleCode = moduleCode + moduleDeclarations + '\n';

        // BEGIN
        moduleCode = moduleCode + 'BEGIN' + beginStatements + '\n'

        // STATEMENTS
        moduleCode = moduleCode + moduleStatements + '\n';

        // END
        moduleCode = moduleCode + 'END ' + moduleName + '.\n';

        return moduleCode
    }

    // Type
    generator['type_block'] = function (block) {
        const type_declarations =
            generator.statementToCode(block, 'type_declarations');

        const type_statements =
            generator.statementToCode(block, 'type_statements');

        const type_name = block.getFieldValue('type_name');

        // full converted type code:
        let type_code;

        // TYPE
        type_code = 'TYPE ' + type_name + ';\n';

        // DECLARATIONS
        type_code = type_code + type_declarations + '\n';

        // BEGIN
        type_code = type_code + 'BEGIN \n'

        // STATEMENTS 
        type_code = type_code + type_statements + '\n';

        // END
        type_code = type_code + 'END ' + type_name + ';\n';

        return type_code
    }

    // ================================== VARIABLES ==================================
    // Constant declaration block
    generator['constant_declaration_block'] = function (block) {
        let argument0 = generator.valueToCode(block, 'variable_value',
            generator.ORDER_NONE) || '0';
        let varName = generator.nameDB_.getName(block.getFieldValue('variable'),
            Blockly.VARIABLE_CATEGORY_NAME);
        return 'CONST ' + varName + ' := ' + argument0 + ';'
    };

    // Variable declaration
    generator['variable_declaration_block'] = function (block) {
        const variable_in_out =
            generator.valueToCode(block, 'variable_in_out', generator.ORDER_NONE) || '0';

        const variable_in_out_type = block.getFieldValue('variable_in_out_type')

        const variable_type = block.getFieldValue('variable_type')

        let code = variable_in_out_type + ' ' + variable_in_out.trim() + ': ' + variable_type + ';';
        return code;
    };

    generator['variable_declaration_block_2'] = function (block) {

        const variable_name =
            generator.valueToCode(block, 'variable_name', generator.ORDER_NONE) || '0';
        const variable_in_out =
            generator.valueToCode(block, 'variable_in_out', generator.ORDER_NONE) || '0';

        const variable_type = block.getFieldValue('variable_type')
        let code = variable_name + ': ' + variable_in_out.trim() + ' ' + variable_type + ';';
        return code
    };

    // Variable setter
    generator['variables_set'] = function (block) {
        let argument0 = generator.valueToCode(block, 'VALUE',
            generator.ORDER_NONE) || '0';
        let varName = generator.nameDB_.getName(block.getFieldValue('VAR'),
            Blockly.VARIABLE_CATEGORY_NAME);

        return varName + ' := ' + argument0 + ';'
    };

    // Variable getter
    generator['variables_get'] = function (block) {
        let value = generator.valueToCode(block, 'VALUE',
            generator.ORDER_NONE) || '0';
        return value
    };

    // Variable name getter
    generator['variables_name_get'] = function (block) {
        let varName = generator.nameDB_.getName(block.getFieldValue('VAR'),
            Blockly.VARIABLE_CATEGORY_NAME);

        return [varName, generator.ORDER_NONE]
    };

    generator['brackets_block'] = function (block) {

        let bracketTypes = {
            'curlyLeft': '{',
            'normalLeft': '(',
            'squaredLeft': '[',
            'curlyRight': '}',
            'normalRight': ')',
            'squaredRight': ']',
        };

        let leftBracket = bracketTypes[block.getFieldValue('bracketsLeft')]
        let rightBracket = bracketTypes[block.getFieldValue('bracketsRight')]

        let variable = generator.valueToCode(block,'variableInside', generator.ORDER_NONE)
        let code = leftBracket + variable + rightBracket

        return [code, generator.ORDER_NONE]
    };

    // Comment block
    generator['comment_block'] = function (block) {
        const comment_text = block.getFieldValue('comment')
        return '(*' + comment_text + '*)'
    };


    // Math arithmetic block
    generator['math_arithmetic'] = function (block) {
        let OPERATORS = {
            'ADD': ['+', generator.ORDER_NONE],
            'MINUS': ['-', generator.ORDER_NONE],
            'MULTIPLY': ['*', generator.ORDER_NONE],
            'DIVIDE': ['/', generator.ORDER_NONE],
            'POWER': ['**', generator.ORDER_NONE],
            'STATEMENT1': ['&', generator.ORDER_NONE],
            'STATEMENT2': ['#', generator.ORDER_NONE],
            'STATEMENT3': ['->', generator.ORDER_NONE],
            'STATEMENT4': ['<-', generator.ORDER_NONE],
            'STATEMENT5': [':', generator.ORDER_NONE],
            'STATEMENT6': ['=', generator.ORDER_NONE]
        };
        let tuple = OPERATORS[block.getFieldValue('OP')];
        let operator = tuple[0];
        let order = tuple[1];
        let argument0 = generator.valueToCode(block, 'A', order) || '0';
        let argument1 = generator.valueToCode(block, 'B', order) || '0';
        let code = argument0 + ' ' + operator + ' ' + argument1;
        return [code, order];
    }

    // Math arithmetic three block 
    generator['math_arithmetic_three'] = function (block) {
        let OPERATORS = {
            'ADD': ['+', generator.ORDER_NONE],
            'MINUS': ['-', generator.ORDER_NONE],
            'MULTIPLY': ['*', generator.ORDER_NONE],
            'DIVIDE': ['/', generator.ORDER_NONE],
            'POWER': ['**', generator.ORDER_NONE],
            'STATEMENT1': ['&', generator.ORDER_NONE],
            'STATEMENT2': ['#', generator.ORDER_NONE],
            'STATEMENT3': ['->', generator.ORDER_NONE],
            'STATEMENT4': ['<-', generator.ORDER_NONE],
            'STATEMENT5': [':', generator.ORDER_NONE],
            'STATEMENT6': ['=', generator.ORDER_NONE]
        };
        let tuple1 = OPERATORS[block.getFieldValue('OP')];
        let operator1 = tuple1[0];
        var order = tuple1[1];

        let tuple2 = OPERATORS[block.getFieldValue('OP2')];
        let operator2 = tuple2[0];
        var order = tuple2[1];

        let argument0 = generator.valueToCode(block, 'A', order) || '0';
        let argument1 = generator.valueToCode(block, 'B', order) || '0';
        let argument2 = generator.valueToCode(block, 'C', order) || '0';
        let code = argument0 + ' ' + operator1 + ' ' + argument1 + ' ' + operator2 + ' ' + argument2;
        return [code, order];
    }

    // Math number block
    generator['math_number'] = function (block) {
        let code = Number(block.getFieldValue('NUM'));
        let order;
        if (code === Infinity) {
            code = 'float("inf")';
            order = generator.ORDER_FUNCTION_CALL;
        } else if (code === -Infinity) {
            code = '-float("inf")';
            order = generator.ORDER_UNARY_SIGN;
        } else {
            order = code < 0 ? generator.ORDER_UNARY_SIGN :
                generator.ORDER_ATOMIC;
        }
        return [code, order];
    };

    ////// -------------------------------------------

    // Array
    generator['lists_create_with'] = function (block) {
        const values = [];
        // const qqq = generator.statementToCode(block, 'ADD0')
        // return qqq
        for (let i = 0; i < block.itemCount_; i++) {
            let valueCode = generator.statementToCode(block, 'ADD' + i);
            if (valueCode) {
                values.push(valueCode);
            }
        }
        const valueString = values.join(',\n');
        const indentedValueString =
            generator.prefixLines(valueString, generator.INDENT);
        const codeString = '[\n' + indentedValueString + '\n]';
        return [codeString, generator.ORDER_NONE];
    };

    // Loop
    generator['controls_for'] = function (block) {
        let variable0 = generator.nameDB_.getName(
            block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
        let argument0 = generator.valueToCode(block, 'FROM',
            generator.ORDER_NONE) || '0';
        let argument1 = generator.valueToCode(block, 'TO',
            generator.ORDER_NONE) || '0';
        let increment = generator.valueToCode(block, 'BY',
            generator.ORDER_NONE) || '1';
        let branch = generator.statementToCode(block, 'DO');


        let code = 'FOR ' + variable0 + ':=' + argument0 + '..' + argument1 + ' DO\n'
        code = code + branch + '\n'
        code = code + 'END;'


        return code
    }

    // Text
    generator['text'] = function (block) {
        let textValue = block.getFieldValue('TEXT');
        return [textValue, generator.ORDER_NONE]
    };

    generator['logic_null'] = function (block) {
        return ['null', generator.ORDER_NONE];
    };

    // ------------------------------ HELPERS ------------------------------

    generator['text_helper_variable'] = function (block) {
        let textValue = block.getFieldValue('text_help')
        return [textValue, generator.ORDER_NONE]
    }

    generator['text_helper_statement'] = function (block) {
        return block.getFieldValue('text_help') + ';'
    }

    generator['text_helper_statement_no_semicolon'] = function (block) {
        return block.getFieldValue('text_help')
    }

    // ---------------------- LISTS -----------------------------------
    generator['lists_create_with'] = function(block) {
        const values = [];
        for (let i = 0; i < block.itemCount_; i++) {
            const valueCode = generator.valueToCode(block, 'ADD' + i,
                generator.ORDER_NONE);
            if (valueCode) {
                values.push(valueCode);
            }
        }

        return values.join(', ')
    };

    return generator
}


export const toolbox = `
  <xml id="toolbox">

    <category name="Modules">
      <block type="module_block_module_begin"></block>
      <block type="module_block_module"></block>
      <block type="module_block_begin"></block>
      <block type="module_block"></block>
    </category>
    
    <category name="Types">
        <block type="type_block"></block>
    </category>

    <category name="Variables">
      <button text="Create Variable" callbackKey="createVariableButton"></button>
      <block type="variables_set"></block>
      <block type="variables_get"></block>
      <block type="variables_name_get"></block>
      <block type="constant_declaration_block"/>
      <block type="variable_declaration_block"/>
      <block type="variable_declaration_block_2"/>
      <block type="brackets_block"/>
    </category>

    <category name="Loops">
      <block type="controls_for"/>
    </category>

    <category name="Text">
      <block type="comment_block"/>
    </category>

    <category name="Math">
      <block type="math_number"><field name="NUM">0</field></block>
      <block type="math_arithmetic"/>
      <block type="math_arithmetic_three"/>
    </category>

    <category name="Logic">
      <block type="logic_null"/>
    </category>
    
    <category name="Lists">
      <block type="lists_create_with"/>
    </category>
    
    <category name="Helpers">
      <block type="text_helper_statement"/>
      <block type="text_helper_statement_no_semicolon"/>
      <block type="text_helper_variable"/>
    </category>
    
  </xml>`

export const oldToolbox = `
<xml id="toolbox" style="display: none">

  <category name="Modules and Types">
    <block type="module_block"></block>
    <block type="type_block"></block>
  </category>

  <category name="Variables">
    <button text="Create Variable" callbackKey="createVariableButton"></button>
    <block type="variables_set"></block>
    <block type="variables_get"></block>
    <block type="variables_name_get"></block>
    <block type="constant_declaration_block"/>
    <block type="variable_declaration_block"></block>
  </category>

  <category name="Loops">
    <block type="controls_for"/>
  </category>

  <category name="Text">
    <block type="text"><field name="TEXT"/></block>
    <block type="comment_block"/>
  </category>

  <category name="Math">
    <block type="math_number"><field name="NUM">0</field></block>
    <block type="math_arithmetic"/>
    <block type="math_arithmetic_three"/>
    <block type="math_single"/>
  </category>

  <category name="Other">
    <block type="logic_boolean"><field name="BOOL">TRUE</field></block>
    <block type="logic_null"/>
    <block type="lists_create_with"><mutation items="3"/></block>
  </category>
</xml>`