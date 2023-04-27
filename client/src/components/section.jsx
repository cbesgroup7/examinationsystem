import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Session(){
    localStorage.removeItem('timeLeft');
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/exam');

    };
    const secArray = [
        {name:"Section 1",id:"s1"},
        {name:"Section 2",id:"s2"},
        {name:"Section 3",id:"s3"},
        {name:"Section 4",id:"s4"},
        {name:"Section 5",id:"s5"},
        {name:"Section 6",id:"s6"},
    ];
    function displaySec(props){
        document.getElementById('sDisBox').innerHTML = props.name;
        document.getElementById(props.id).style.border = "5px solid #00cd2e"
    }
    return(
        <div className="SessionContainer">
            <div className="sectionside">
            {secArray.map((sec,index)=> (
                    <div id={sec.id} onClick={()=> displaySec(sec)} key={index} className="sessionArray">
                       <span>{sec.name}</span> 
                    </div>
                ))}
            </div>
            <div className="boxSession">
                <div id="sDisBox" className="sessionDisplayBox">
                </div>
            </div>
            <div className="buttonClass">
          <button type="button"onClick={handleClick}>Next</button>
        </div>
        </div>
    );
}