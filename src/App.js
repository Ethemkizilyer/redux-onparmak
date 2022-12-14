
import styled from 'styled-components';
import './App.css';
import {Title} from "./asd"
import Header from './components/Header';
import Home from './components/Home';
import Main from './components/Main';

// const Title=styled.h1`
// font-size:1.5rem;
// color:red;
// `;

const Button=styled.button`
color:${props => props.primary ? "red" : "orange"}`

function App() {
  return (
    <div className="App">
    
<Header/>
<Home/>
<Main/>

    </div>
  );
}

export default App;
