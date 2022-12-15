import React from "react";
import styled from "styled-components";
import { MdOutlineRestartAlt } from "react-icons/md";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector, useDispatch } from "react-redux";
import { setReplay, setSelectedLang } from "../redux/wordSlice";

const Select = styled.select`
  width: 100px;
  height: 35px;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  position: absolute;
  left: 24%;

  option {
    color: black;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const Baslik = styled.h1`
  color: red;
  font-weight: bold;
  font-size: 2rem;
`;
const TimerWrapper = styled.div`
  /* position: absolute; */
  top: 27%;
  left: 17%;
  /* transform: translate(-50%, -50%); */
`;

const Header = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch(setSelectedLang(e.target.value));
  };

  const time = useSelector((state) => state.speed.time);
  const start = useSelector((state) => state.speed.start);
  const wrongWord = useSelector((state) => state.speed.wrongWord);
  const correctWord = useSelector((state) => state.speed.correctWord);
  const selectedLang = useSelector((state) => state.speed.selectedLang);
  // console.log(time,start)
  //swal
  const Swal = require("sweetalert2");

  //dispatch
  const dispatch = useDispatch();

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      Swal.fire({
        text: `${correctWord > 30 ? "Tebrikler!" : "Tekrar Dene!"}`,
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
            key={time}
            isPlaying={start === true ? true : false}
            duration={time}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            size={120}
          >
            {renderTime}
            {/* {({ remainingTime }) => remainingTime} */}
          </CountdownCircleTimer>
        </TimerWrapper>
        <Select name="Lang" onChange={handleChange}>
          <option value="turkishWord" disabled={selectedLang === "turkishWord"}>
            Türkçe
          </option>
          <option value="englishWord" disabled={selectedLang === "englishWord"}>
            İngilizce
          </option>
        </Select>
        <Baslik>Ne Kadar Hızlısın?</Baslik>
        <button onClick={() => dispatch(setReplay())}>
          <MdOutlineRestartAlt size={40} className="animas" />
        </button>
      </div>
    </div>
  );
};

export default Header;
