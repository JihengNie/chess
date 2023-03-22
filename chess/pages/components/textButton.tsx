import React from "react"
import { useState } from "react"

export default function TextButton() {
  let [inputValue, setInputValue] = useState(0);

  const handleInputChange = () => {
    setInputValue(inputValue+1);
  };
  return (
    <button onClick={handleInputChange}> Click Me! {inputValue} </button>
  )
}
