import './textEditor.css'

import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Import the relevant language files for syntax highlighting
// import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';

// Define a new language for custom highlighting
Prism.languages['custom-highlight'] = {
  'custom-keyword': /\b(?:custom1|custom2|custom3)\b/,
  // Add more custom words as needed
};

const CodeHighlighter = ({ code, language }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);



  // --------------
  function update(text) {
    let result_element = document.querySelector("#highlighting-content");
    // Handle final newlines (see article)
    if(text[text.length-1] == "\n") {
      text += " ";
    }
    // Update code
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
    // Syntax Highlight
    Prism.highlightElement(result_element);
  }

function syncScroll(element) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector("#highlighting");
  // Get and set x and y
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}

function checkTab(element, event) {
  let code = element.value;
  if(event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, element.selectionStart); // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
    let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
    element.value = before_tab + "\t" + after_tab; // add tab char
    // move cursor
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update(element.value); // Update text to include indent
  }
}
// ---------------


  return (
    // <pre>
    //   <code ref={codeRef} className={`language-${language}`}>
    //     {code}
    //   </code>
    // </pre>

    <div style={{height: '20px'}}>
      <textarea
      placeholder="Enter HTML Source Code"
      id="editing"
      spellCheck="false"
      onInput={(e) => update(e.target.value)}
      onScroll={(e) => syncScroll(e.target)}
      onKeyDown={(e) => checkTab(e.target, e)}
    ></textarea>

      <pre id="highlighting" aria-hidden="true">
        <code ref={codeRef} className={`language-${language}`} id="highlighting-content">
        </code>
      </pre>
    </div>
  );
};

export default CodeHighlighter;