import './App.css';
import React from 'react'

import Blockly from "blockly";
import { createPlayground, toolboxCategories } from "@blockly/dev-tools";


// goog.require('Blockly.minimalist.Renderer');
// goog.require('Blockly.Themes.Zelos');///

function App() {
  // start()
  return (
    <div className="App">
      <header className="App-header">
        {/* <div id="blocklyArea"></div> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

const createWorkspace = (blocklyDiv, options) => {
  return Blockly.inject(blocklyDiv, options);
};

const defaultOptions = {
  toolbox: toolboxCategories
};

createPlayground(
  document.getElementById("blocklyArea"),
  createWorkspace,
  defaultOptions,
  /** PlaygroundConfig */ {},
  /** Monaco Editor Path */ "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.19.2/min/vs"
);

function start() {
  console.log('test')
}


export default App;
