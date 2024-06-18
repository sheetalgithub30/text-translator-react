import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [options, setOption] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState("");
  const[targetLanguage,setTargetLanguage] = useState("");
  const [inputValue, setInputValue] = useState();
  const [outputValue, setOutputValue] = useState("Translated Text");

  useEffect(() => {
    const getList = async () => {
      const url = "https://text-translator2.p.rapidapi.com/getLanguages";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "75a5a70114mshd579c697a03cc19p1fa835jsn133f11245987",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setOption(result.data.languages);
      } catch (error) {
        console.error(error);
      }
    };

    getList();
  }, []);


    const getTranslate = async () => {
      const url = "https://text-translator2.p.rapidapi.com/translate";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "75a5a70114mshd579c697a03cc19p1fa835jsn133f11245987",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        body: new URLSearchParams({
          source_language: `${sourceLanguage}`,
          target_language: `${targetLanguage}`,
          text: `${inputValue}`,
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data.translatedText);
        setOutputValue(result.data.translatedText);
      } catch (error) {
        console.error(error);
      }
    };


    function source(){
      let utterance = new SpeechSynthesisUtterance(`${inputValue}`);
          utterance.lang = {sourceLanguage};
          speechSynthesis.speak(utterance);
    }

    function target(){
      let utterance = new SpeechSynthesisUtterance(`${outputValue}`);
      utterance.lang = {targetLanguage};
      speechSynthesis.speak(utterance);
    }




  return (
    <div id="container">
      <div id="navbar">
        <img src="https://png.pngtree.com/png-vector/20191022/ourmid/pngtree-translation-from-japanese-to-english-icon-png-image_1838566.jpg"></img>
      <h1>Text Translator</h1>
      </div>
   
      <div id="left">
      <div className="select">
        <select
          onChange={(e) => {
            setSourceLanguage(e.currentTarget.value);
          }}
        >
          <option>Select Source Language</option>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.code}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
        <textarea placeholder="Text to be translated" onChange={(e) => setInputValue(e.currentTarget.value)}>
          {inputValue}
        </textarea>
        <button className="speaker" onClick={source}>🔊</button>
      </div>

      <div id="right">
        <div className="select">
        <select
          onChange={(e) => {
            setTargetLanguage(e.currentTarget.value);
          }}
        >
          <option>Select Target Language</option>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.code}>
                {option.name}
              </option>
            );
          })}
        </select>
        </div>
     
        <p>{outputValue}</p>
      </div>
      <button className="speaker" onClick={target}>🔊</button>
       <div id="button">
       <button onClick={getTranslate}>Translate</button>

       </div>
    </div>
  );
}

export default App;
