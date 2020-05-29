import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AceEditor from "react-ace";
import snippetValue from "./codeEditorSlice";
import styled from 'styled-components'

const welcomeHTML = `<h1>Welcome Devs!</h1>`;

// const initialState: CodeEditorState = {
//   value: welcomeHTML,
// };
const LiveHTML = styled.div`
  width: 50%;
`;

export function CodeEditor() {
  const dispatch = useDispatch();
  const [snippetValue, setSnippetValue] = useState(welcomeHTML);

  function onChange(newValue: string) {
    setSnippetValue(newValue);
    document.getElementById('live-html')!.innerHTML = snippetValue
  }

  return (
    <>
      <AceEditor value={snippetValue} onChange={onChange} />
      <LiveHTML id="live-html" />
    </>
  );
}
