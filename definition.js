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
// Blockly.Blocks["yolobit_http_post_request"] = {
//   init: function () {
//     this.jsonInit({
//       colour: "#e65722",
//       nextStatement: null,
//       tooltip: "",
//       message0: "gọi HTTP %1 phương thức: %2 %3 URL: %4 dữ liệu: %5 tiêu đề: %6 khi thành công: %7 khi thất bại: %8",
//       previousStatement: null,
//       inputsInline: false,
//       args0: [
//         {
//           type: "input_dummy"
//         },
//         {
//           type: "field_dropdown",
//           name: "method",
//           options: [
//             [
//               "GET",
//               "get"
//             ],
//             [
//               "POST",
//               "post"
//             ],
//           ]
//         },
//         {
//           type: "input_dummy"
//         },
//         {
//           type: "input_value",
//           name: "url",
//           check: "String"
//         },
//         {
//           type: "input_value",
//           name: "data"
//         },
//         {
//           type: "input_value",
//           name: "header",
//           check: "Array"
//         },
//         {
//           type: "input_statement",
//           name: "successed_msg"
//         },
//         {
//           type: "input_statement",
//           name: "failed_msg"
//         }
//       ],
//       helpUrl: "",
//     });
//   },
// };


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


// Blockly.Python['yolobit_http_post_request'] = function(block) {
//   Blockly.Python.definitions_['import_http'] = 'import urequests';
//   var value_url = Blockly.Python.valueToCode(block, 'url', Blockly.Python.ORDER_ATOMIC);
//   var value_data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_ATOMIC);
//   var value_header = Blockly.Python.valueToCode(block, 'header', Blockly.Python.ORDER_ATOMIC);
//   var statements_successed_msg = Blockly.Python.statementToCode(block, 'successed_msg');
//   var statements_failed_msg = Blockly.Python.statementToCode(block, 'failed_msg');

//   // TODO: Assemble Python into code variable.
//   var globals = [];
//   var varName;
//   var workspace = block.workspace;
//   workspace.createVariable('http_response');
//   var variables = workspace.getAllVariables() || [];
//   for (var i = 0, variable; variable = variables[i]; i++) {
//     varName = variable.name;
//     globals.push(Blockly.Python.variableDB_.getName(varName,
//       Blockly.Names.NameType?Blockly.Names.NameType.VARIABLE:Blockly.Variables.NAME_TYPE));
//   }
//   globals = globals.length ? Blockly.Python.INDENT + 'global ' + globals.join(', ') : '';

//   var cbFunctionHttpOnSuccessed = Blockly.Python.provideFunction_(
//     'on_http_response_successed_callback',
//     ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
//       statements_successed_msg || Blockly.Python.PASS
//     ]);

//   var cbFunctionHttpOnFailed = Blockly.Python.provideFunction_(
//     'on_http_response_failed_callback',
//     ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
//       statements_failed_msg || Blockly.Python.PASS
//     ]);

//   var code = `http_response = urequests.post(${value_url}, data=None, json=${value_data}, headers=${value_header})\n`;
//   code += 'http_response.on_successed(' + cbFunctionHttpOnSuccessed + ')\n';
//   code += 'http_response.on_failed(' + cbFunctionHttpOnFailed + ')\n';``
//   return code;
// };

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
  
    console.log('second: ',globals);

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