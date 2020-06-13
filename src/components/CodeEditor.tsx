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
  display: flex;
  border: solid 1px gray;
  height: 500px;
  width: 500px;
`;

export function CodeEditor(props : any) {
  const dispatch = useDispatch();
  const [snippetValue, setSnippetValue] = useState("");

  function onChange(newValue: string) {
    setSnippetValue(newValue);
    props.function(newValue);
  }

  return (
    <Div>
      <AceEditor value={snippetValue} onChange={onChange} />
      <LiveHTML id="live-html" />
    </Div>
  );
}