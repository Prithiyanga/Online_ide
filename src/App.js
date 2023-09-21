import axios from "axios";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./App.css";

var i = 1;

const Languages = {'Java': 'java', 'Python': 'python3', 'C++': 'cpp', 'C': 'c'}

function App() {

  const [lang ,  setLang] = useState("Python")
  const [inputRadio, setInputRadio] = useState("false")

  async function Compile(){
    console.log("compiling");
    const source_code = document.getElementById("code");
    source_code.contentEditable = "false"
    const code = source_code.value;
    var input; 
    if(inputRadio === 'true'){
      input = document.getElementById("input-value").value;
    }
    else{
       input = "";
    }
    const output = document.getElementById("output");
    const language = Languages[lang]
    
    try{
      axios.post('http://localhost:8000/execute',
      {code, input, language})
            .then(res=>{
                console.log("Res.data : " + res.data)
                const data = res.data.output
                output.innerHTML = data
            })
            .catch(err=>{
                console.log(err)
            })
    }
    catch(e){
      console.log("error in compilation\n " + e)
    }

    source_code.contentEditable = "true"


  }

  const Toggle = (e) =>{
    const tb = e.target.id;
    if(tb === "no-input"){
      document.getElementById("no-input").style.translate = "30px";
      document.getElementById("no-input").style.transitionTimingFunction = "linear"
      document.getElementById("no-input").style.transition = "1s";
      e.target.id = "input"
      document.getElementById("input-block").style.display = "block";
      setInputRadio("true")
    }
    else{
      document.getElementById("input").style.translate = "0px";
      document.getElementById("input").style.transitionTimingFunction = "linear"
      document.getElementById("input").style.transition = "1s";
      e.target.id = "no-input"
      document.getElementById("input-block").style.display = "none";
      setInputRadio("false")
    }
  }

  return (
    <div className="App">
      <h4 className="title">TRY IT YOURSELF:</h4>
      <div className="options">
        <div>
        <div className="selected-language" onClick={()=>{document.getElementById("drop-language").style.display = "flex"}}>
          {lang} <MdKeyboardArrowDown/>
        </div>
        <div className="language-drop" id="drop-language">
          <div className="language" onClick={(e) => {
            setLang(e.target.innerHTML)
            document.getElementById('drop-language').style.display = "none"
            }}>Python</div>
          <div className="language" onClick={(e) => {
            setLang(e.target.innerHTML)
            document.getElementById('drop-language').style.display = "none"
            }}>Java</div>
          <div className="language" onClick={(e) => {
            setLang(e.target.innerHTML)
            document.getElementById('drop-language').style.display = "none"
            }}>C</div>
        </div>
        </div>
        <div className="input-toggle"> 
          <div>INPUT</div>
          <div className="toggle-holder">
            <div className="toggle-button" id="no-input" onClick={Toggle}></div>
          </div>
        </div>
      </div>
      <div className="ide">
      <div className="code-result">
        <div className="program-segment">
          <header className="heading">SOURCE CODE</header>
          <div ><textarea contentEditable="true" id="code" className="ide-block textarea" type="text"></textarea></div>
        </div>
        <div className="input-segment" id="input-block">
          <header className="heading">INPUT</header>
          <textarea id="input-value" className=" ide-block textarea" contentEditable="true"></textarea>
        </div>
        </div>

        <button className="run " type="submit" onClick={Compile}>Run</button>
        <div className="output-segment">
          <header className="heading">OUTPUT</header>
          <pre id="output" className=" ide-block" ></pre>
        </div>
      </div>

      <br/>
    </div>
  );
}

export default App;