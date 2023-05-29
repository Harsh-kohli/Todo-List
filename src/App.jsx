import React, { useEffect, useState } from "react";
import "./App.css";
import img from "./PngTo.png";

const getLocalItems =()=>{
  const list = localStorage.getItem('lists')
  if (list) {
    return JSON.parse(localStorage.getItem('lists'))
  }else{
    return[]
  }
}

function App() {
  const [Text, setText] = useState("")
  const [Input, setInput] = useState(getLocalItems())
  const handleSubmit = (e) => {
    e.preventDefault()
    const TextDescription = document.querySelector("input").value
    setText(TextDescription)
    if (!Text) {

    } else {
      setInput([...Input, TextDescription])
      setText("")
    }
  }
  const deleteItem= (id)=>{
    const updatedItems = Input.filter((elem,ind)=>{
        return(ind!==id)
    })
    setInput(updatedItems)
  }
  const deleteAll=()=>{
    setInput([])
  }

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(Input))
  }, [Input])

  return (
    <>
      <div className="Contents">
        <div className="content-Container">
          <div className="headerContainer">
            <div className="input-wrapper">
              <img src={img} alt="" />
              <form onSubmit={handleSubmit}>
                <input className="input inputID" type="text" name="text" value={Text} onChange={(e) => setText(e.target.value)} placeholder="Whats the task for today?...."
                />
                <button className="iconSpan" type="submit">
                  <i className="bi bi-plus-circle-fill" title="Add Item" style={{ fontSize: "25px" }}></i>
                </button>
              </form>
            </div>
          </div>
          <div className="task-Container">
            {
              Input.map((elem, ind) => {
                return (
                  <div className="description" key={ind}>
                    <p>{elem}</p>
                    <button className="deleteBtn" onClick={()=>deleteItem(ind)}>
                    <i className="bi bi-trash-fill" title="Delete"></i>
                    </button>
                  </div>
                )
              })
            }
            
          </div>
          <button className="delBtn" style={Input.length==0?{display:"none"}:{}} onClick={deleteAll}>
              <span className="delSpan">Delete All</span>
              <i className="bi bi-trash delI"></i>
            </button>
        </div>
      </div>
    </>
  );
  
}

export default App;
