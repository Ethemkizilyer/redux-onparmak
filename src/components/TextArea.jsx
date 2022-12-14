import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Word({ index, letter }) {
  const wordIndex = useSelector((state) => state.speed.wordIndex);
  const selectedLang = useSelector((state) => state.speed.selectedLang);
  const lang = useSelector((state) => state.speed.lang);
  const currentWord = useRef();

  useEffect(() => {
    //yazının kayması icin, style da overflow:hidden yapmayı unutma
    if (wordIndex === index) {
      currentWord.current.scrollIntoView();
    }
  }, [wordIndex, index]);

  return (
    <span
      ref={currentWord}
      key={index}
    
      style={
        //hangi yazı üzerinde ise onun style'ı
        `${index} === ${wordIndex}`
          ? {
              background: "gray",
              color: "white",

              margin: " 3rem 1rem ",
              lineHeight:"4rem",
              borderRadius: "10px",
              padding: "0.5rem 0",
            }
          : {
              color: "#E5E5E5",
              margin: "0.5rem",
              padding: "0.5rem 0",
            }// correct or wrong style
            `${letter.status} === "wrong"` &&
            {
              color: "red",
            }`${letter.status} === "correct"` && {
              color: "green",
            }
      }
    >
      {letter[selectedLang ? selectedLang : lang[0]]}
    </span>
  );
}

function TextArea() {
  const words = useSelector((state) => state.speed.word);

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"10px",overflow:"hidden",height:"5rem",padding:"0.5rem" }} >
      <div style={{border:"1px solid red", width:"50%",height:"100%",fontSize:"2rem",padding:"1rem",borderRadius:"10px",overflow:"hidden"}} >
        {words.map((letter, index) => {
          return (
            <Word index={index} key={index} letter={letter} words={words} />
          );
        })}
      </div>
    </div>
  );
}

export default TextArea;
