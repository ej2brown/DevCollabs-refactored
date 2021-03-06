import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AceEditor from "react-ace";
import snippetValue from "./codeEditorSlice";
import styled from "styled-components";

// const initialState: CodeEditorState = {
//   value: welcomeHTML,
// };

const Div = styled.div`
  display: flex;
  justify-content: center;

`;

const LiveHTML = styled.div`
  // display: flex;
  border: solid 1px gray;
  height: 500px;
  width: 500px;
`;

const CodeEditor = (props : any) => {
  const [snippetValue, setSnippetValue] = useState("");

  function onChange(newValue: string) {
    setSnippetValue(newValue);
    props.function(newValue);
  }

  return (
    <Div>
      <AceEditor value={props.snippetValue} onChange={onChange} />
      <LiveHTML id="live-html" />
    </Div>
  );
}

export default CodeEditor;