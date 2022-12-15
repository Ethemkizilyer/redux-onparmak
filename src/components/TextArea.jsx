import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Word({ index, letter }) {
  const wordIndex = useSelector((state) => state.speed.wordIndex);
  const selectedLang = useSelector((state) => state.speed.selectedLang);
  const lang = useSelector((state) => state.speed.lang);
  const statu = useSelector((state)=> state.speed.statu)
  const currentWord = useRef();


  useEffect(() => {

   
    if (wordIndex === index) {
      currentWord.current.scrollIntoView();
      // console.log(wordIndex);
      // console.log(index);
    }

  }, [wordIndex, index]);

  return (
    <span
      ref={currentWord}
      key={index}
      //hangi yazı üzerinde ise onun style'ı
      className={`${
        //hangi yazı üzerinde ise onun style'ı
        index === wordIndex
          ? "bg-slate-200 text-white m-3 rounded-md py-1"
          : "text-indigo-300 m-3 py-1"
      }
    
      // correct or wrong style
      ${letter.status === "wrong" ? "text-red-500" : ""}
       ${letter.status === "correct" ? "text-green-500" : ""}
          `}
    >
      {letter[selectedLang ? selectedLang : lang[0]]}
    </span>
  );
}

function TextArea() {
  const words = useSelector((state) => state.speed.word);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "1rem auto",
        height: "150px",
        padding: "1rem",
        overflow: "hidden",

        textOverflow:"ellipsis",
        whiteSpace: "wrap",
      }}
    >
      <div
        style={{
          border: "1px solid blue",
          width: "50%",
          height: "100%",
          fontSize: "2rem",
          padding: "0.5rem",
          borderRadius: "10px",
          overflow: "hidden",
          
       
        }}
      >
        {words.map((letter, index) => {
          // console.log(letter);
          return (
            <Word index={index} key={index} letter={letter} words={words} />
          );
        })}
      </div>
    </div>
  );
}

export default TextArea;
