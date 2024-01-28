import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css"
import Alert from "./Alert";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const passwordRef = useRef(null);

  // useCallback is used to optimize and for it to store it in cache
  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let char = "!@#$%^&*-_+=[]{}~`";

    if (numberAllowed) str += num;
    if (charAllowed) str += char;

    // to atleast select one number and character

    if (numberAllowed) pass += num.charAt(Math.floor(Math.random() * num.length));
    if (charAllowed) pass += char.charAt(Math.floor(Math.random() * char.length));

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    // Shuffle the generated password to randomize the positions of the required characters
    pass = pass.split('').sort(() => Math.random() - 0.5).join('');
    setPassword(pass)

  }, [length, charAllowed, numberAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    // for adding select effect on password upon copy
    passwordRef.current?.select();

    // To copy password to clipboard
    window.navigator.clipboard.writeText(password);

    // For Alert and removing it after seconds
    setVisible(true);
    setTimeout(() => {
      setVisible(false)
    }, 2000)
  }, [password, visible])

  useEffect(() => {
    passwordGenrator();
  }, [length, numberAllowed, charAllowed, passwordGenrator])

  return (
    <>
      <Alert messege="Copied to Clipboard!" visibility={visible} />
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
