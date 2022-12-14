import React from 'react'
import styled from 'styled-components'
import { MdOutlineRestartAlt } from "react-icons/md";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useSelector, useDispatch } from "react-redux";
import { setReplay } from "../redux/wordSlice";
import swal from "sweetalert";

const Select = styled.select`
width: 100px;
height: 35px;
color: gray;
padding-left: 5px;
font-size: 14px;
border: none;



option{
    color: black;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
}
`
const Baslik = styled.h1`
color: red;
`
const TimerWrapper = styled.div`
  /* position: absolute; */
  top: 27%;
  left: 17%;
  /* transform: translate(-50%, -50%); */
`;



 


const Header = () => {

   const handleChange = (e) => {
      console.log(e.target.value);
    //   dispatch(setSelectedLang(e.target.value));
    };

   const time = useSelector((state) => state.time);
   const start = useSelector((state) => state.start);
   const wrongWord = useSelector((state) => state.wrongWord);
   const correctWord = useSelector((state) => state.correctWord);

   //swal
   const Swal = require("sweetalert2");

   //dispatch
   const dispatch = useDispatch();

   const renderTime = ({ remainingTime }) => {
     if (remainingTime === 0) {
       Swal.fire({
         text: "Game Over!",
         title: `✅ ${correctWord} 🚫 ${wrongWord}`,
       }).then((confirmButton) => {
         if (confirmButton.value) {
           dispatch(setReplay());
         }
       });
     } else {
       return (
         <div>
           {remainingTime} <br />
           <span className="text-slate-400"> seconds </span>
         </div>
       );
     }
   };


  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TimerWrapper>
          <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            size={120}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </TimerWrapper>
        <Select name="Lang" onChange={handleChange}>
          <option value="turkishWord">Türkçe</option>
          <option value="englishWord">İngilizce</option>
        </Select>
        <Baslik>Parmaklarının Hızı Nasıl</Baslik>
        <button>
          <MdOutlineRestartAlt />
        </button>
      </div>
    </div>
  );
}

export default Header