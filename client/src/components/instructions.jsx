import React from "react";
import toast,{Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export default function Instruction(){
    const navigate = useNavigate();
    const handleClick = () => navigate('/demo');
    return(     
        <div className="InstructionContainer">
             <Toaster position="top-center"  reverseOrder={false}></Toaster>
            <div className="InsContainer">
            <h1>instructions</h1>
            <div className="list">
            <ul>
                <li>No cell phones or other secondary devices in the room or test area.</li><br></br>
                <li>Your desk/table must be clear or any materials except your test-taking device.</li><br></br>
                <li>No one else can be in the room with you.</li><br></br>
                <li>No talking.</li><br></br>
                <li>The testing room must be well-lit and you must be clearly visible.</li><br></br>
                <li>No dual screens/monitors.</li><br></br>
                <li>Do not leave the camera</li><br></br>
                <li>No use of additional applications or internet</li>
            </ul>
            </div>
            <div className="buttonClass">
            <button type="button" onClick={handleClick}>Next</button>
            </div>
        </div>
            </div>
    );
}