import React from 'react'
import Yamde from 'yamde'

export const TextEditor = ({text,setText}) => {
  return <Yamde value={text} handler={setText} theme="light" />
}

export default TextEditor;