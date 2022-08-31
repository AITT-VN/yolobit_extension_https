Blockly.Blocks["yolobit_http_connect_wifi"] = {
  init: function () {
    this.jsonInit({
      colour: "#e65722",
      nextStatement: null,
      tooltip: "Kết nối vào mạng WiFi",
      message0: "kết nối WiFi %1 %2 mật khẩu %3 %4",
      previousStatement: null,
      args0: [
        { type: "input_dummy" },
        { type: "input_value", name: "WIFI", check: "String" },
        { type: "input_dummy" },
        { type: "input_value", name: "PASSWORD", check: "String" },
      ],
      helpUrl: "",
    });
  },
};

Blockly.Blocks["yolobit_telegram_get_method"] = {
  init: function () {
    this.jsonInit({
      colour: "#e65722",
      nextStatement: null,
      tooltip: "Gửi tin nhắn lên Telegram",
      message0: "gửi lên Telegram token %1 %2 id %3 %4 tin nhắn %5 %6",
      previousStatement: null,
      args0: [
        { type: "input_dummy" },
        { type: "input_value", name: "TOKEN", check: "String" },
        { type: "input_dummy" },
        { type: "input_value", name: "ID", check: "String" },
        { type: "input_dummy" },
        { type: "input_value", name: "MESSEGE", check: "String" },
      ],
      helpUrl: "",
    });
  },
};

Blockly.Blocks["yolobit_http_get_request"] = {
  init: function () {
    this.jsonInit({
      colour: "#e65722",
      nextStatement: null,
      tooltip: "",
      message0: "gọi HTTP GET URL: %1 khi thành công: %2 khi thất bại: %3",
      previousStatement: null,
      inputsInline: false,
      args0: [
        {
          type: "input_value",
          name: "url",
          check: "String"
        },
        {
          type: "input_statement",
          name: "successed_msg"
        },
        {
          type: "input_statement",
          name: "failed_msg"
        }
      ],
      helpUrl: "",
    });
  },
};

Blockly.Blocks["yolobit_http_post_request"] = {
  init: function () {
    this.jsonInit({
      colour: "#e65722",
      nextStatement: null,
      tooltip: "",
      message0: "gọi HTTP POST URL: %1 data: %2 header: %3 khi thành công: %4 khi thất bại: %5",
      previousStatement: null,
      inputsInline: false,
      args0: [
        {
          type: "input_value",
          name: "url",
          check: "String"
        },
        {
          type: "input_value",
          name: "data"
        },
        {
          type: "input_value",
          name: "header",
        },
        {
          type: "input_statement",
          name: "successed_msg"
        },
        {
          type: "input_statement",
          name: "failed_msg"
        }
      ],
      helpUrl: "",
    });
  },
};


Blockly.Blocks["yolobit_http_get_status_code"] = {
  init: function () {
    this.jsonInit({
      colour: "#e65722",
      tooltip: "Trả về mã trạng thái phản hồi",
      message0: "mã kết quả trả về từ HTTP",
      helpUrl: "",
      output: "Number",
    });
  },
};

Blockly.Blocks["yolobit_http_get_data_text"] = {
  init: function () {
    this.jsonInit({
      colour: "#e65722",
      tooltip: "",
      message0: "kết quả trả về từ HTTP",
      helpUrl: "",
      output: "String",
    });
  },
};

Blockly.Blocks["yolobit_http_is_ok"] = {
  init: function () {
    this.jsonInit({
      colour: "#e65722",
      tooltip: "Trả về mã trạng thái phản hồi",
      message0: "truy cập HTTP thành công?",
      output: "Boolean",
      helpUrl: "",
    });
  },
};

Blockly.Blocks["yolobit_json_object"] = {
  init: function () {
    this.jsonInit({
      colour: "#e65722",
      tooltip: "",
      message0: "{ %1 %2 }",
      args0: [
        {
          type: "input_dummy"
        },
        {
          type: "input_statement",
          name: "MEMBERS"
        }
      ],
      output: "null",
      helpUrl: "",
    });
  },
};

Blockly.Blocks["yolobit_json_member"] = {
  init: function () {
    this.jsonInit({
      colour: "#e65722",
      tooltip: "",
      message0: "%1 %2 %3",
      args0: [
        {
          type: "field_input",
          name: "MEMBER_NAME",
          text: ""
        },
        {
          type: "field_label",
          name: "COLON",
          text: ":"
        },
        {
          type: "input_value",
          name: "MEMBER_VALUE"
        }
      ],
      previousStatement: null,
      nextStatement: null,
      helpUrl: "",
    });
  },
};

'use strict';

// Any imports need to be reserved words
Blockly.Python.addReservedWords('wifi');

Blockly.Python['yolobit_http_connect_wifi'] = function(block) {
  Blockly.Python.definitions_['import_wifi'] = 'from yolobit_wifi import *';
  var value_wifi = Blockly.Python.valueToCode(block, 'WIFI', Blockly.Python.ORDER_ATOMIC);
  var value_password = Blockly.Python.valueToCode(block, 'PASSWORD', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'wifi.connect_wifi(' + value_wifi + ', ' + value_password + ')\n';
  return code;
};

Blockly.Python['yolobit_telegram_get_method'] = function(block) {
  Blockly.Python.definitions_['import_http'] = 'import urequests';
  var value_token = Blockly.Python.valueToCode(block, 'TOKEN', Blockly.Python.ORDER_ATOMIC);
  var value_id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_ATOMIC);
  var value_messege = Blockly.Python.valueToCode(block, 'MESSEGE', Blockly.Python.ORDER_ATOMIC);

  var telegram_url = `(''.join([str(x) for x in ['https://api.telegram.org/bot', ${value_token}, '/sendMessage?text=', ${value_messege}, '&chat_id=', ${value_id}]]))`;

  console.log(telegram_url);

  // TODO: Assemble Python into code variable.
  var workspace = block.workspace;
  workspace.createVariable('http_response');

  var code = `http_response = urequests.get(${telegram_url})\n`;
  return code;
};

Blockly.Python['yolobit_http_post_request'] = function(block) {
  Blockly.Python.definitions_['import_http'] = 'import urequests';
  var value_url = Blockly.Python.valueToCode(block, 'url', Blockly.Python.ORDER_ATOMIC);
  var value_data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_ATOMIC);
  var value_header = Blockly.Python.valueToCode(block, 'header', Blockly.Python.ORDER_ATOMIC);
  var statements_successed_msg = Blockly.Python.statementToCode(block, 'successed_msg');
  var statements_failed_msg = Blockly.Python.statementToCode(block, 'failed_msg');

  // TODO: Assemble Python into code variable.
  var globals = [];
  var varName;
  var workspace = block.workspace;
  workspace.createVariable('http_response');
  var variables = workspace.getAllVariables() || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    globals.push(Blockly.Python.variableDB_.getName(varName,
      Blockly.Names.NameType?Blockly.Names.NameType.VARIABLE:Blockly.Variables.NAME_TYPE));
  }
  globals = globals.length ? Blockly.Python.INDENT + 'global ' + globals.join(', ') : '';

  var cbFunctionHttpOnSuccessed = Blockly.Python.provideFunction_(
    'on_http_response_successed_callback',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
      statements_successed_msg || Blockly.Python.PASS
    ]);

  var cbFunctionHttpOnFailed = Blockly.Python.provideFunction_(
    'on_http_response_failed_callback',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
      statements_failed_msg || Blockly.Python.PASS
    ]);

  var code = `http_response = urequests.post(${value_url}, data=None, json=${value_data}, headers=${value_header})\n`;
  code += 'http_response.on_successed(' + cbFunctionHttpOnSuccessed + ')\n';
  code += 'http_response.on_failed(' + cbFunctionHttpOnFailed + ')\n';``
  return code;
};

Blockly.Python['yolobit_http_get_request'] = function(block) {
  Blockly.Python.definitions_['import_http'] = 'import urequests';
  var value_url = Blockly.Python.valueToCode(block, 'url', Blockly.Python.ORDER_ATOMIC);
  var statements_successed_msg = Blockly.Python.statementToCode(block, 'successed_msg');
  var statements_failed_msg = Blockly.Python.statementToCode(block, 'failed_msg');

  // TODO: Assemble Python into code variable.
  var globals = [];
  var varName;
  var workspace = block.workspace;
  workspace.createVariable('http_response');
  var variables = workspace.getAllVariables() || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    globals.push(Blockly.Python.variableDB_.getName(varName,
      Blockly.Names.NameType?Blockly.Names.NameType.VARIABLE:Blockly.Variables.NAME_TYPE));
  }
  globals = globals.length ? Blockly.Python.INDENT + 'global ' + globals.join(', ') : '';

  var cbFunctionHttpOnSuccessed = Blockly.Python.provideFunction_(
    'on_http_response_successed_callback',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
      globals,
      statements_successed_msg || Blockly.Python.PASS
    ]);
  
  var cbFunctionHttpOnFailed = Blockly.Python.provideFunction_(
    'on_http_response_failed_callback',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
      globals,
      statements_failed_msg || Blockly.Python.PASS
    ]);

  var code = `http_response = urequests.get(${value_url})\n`;
  //var code = `http_response = http.request("GET", ${value_url}, None, None, ['User-Agent: OhStem'])\n`;
  code += 'http_response.on_successed(' + cbFunctionHttpOnSuccessed + ')\n';
  code += 'http_response.on_failed(' + cbFunctionHttpOnFailed + ')\n';``
  return code;
};

Blockly.Python['yolobit_http_get_status_code'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'http_response.status_code';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['yolobit_http_get_data_text'] = function(block) {
  var code = 'http_response.text';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['yolobit_http_is_ok'] = function(block) {
  var code = 'http_response.is_successed()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['yolobit_json_object'] = function(block) {
  var statement_members = Blockly.Python.statementToCode(block, 'MEMBERS');
  var code = '{\n' + statement_members + '\n}';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['yolobit_json_member'] = function(block, opt_thisOnly) {
  var name = block.getFieldValue('MEMBER_NAME');
  var value = Blockly.Python.valueToCode(block, 'MEMBER_VALUE', Blockly.Python.ORDER_ATOMIC);
  //var value = Blockly.Python.valueToCode(block, 'MEMBER_VALUE', Blockly.Python.PRECEDENCE);
  var code = `"${name}" : ${value}`;
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !opt_thisOnly){
    return code + ',\n';
  } else {
    return code;
  }
};