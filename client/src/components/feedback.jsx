import React from "react";
import { useNavigate } from 'react-router-dom';


export default function Feedback(){
    localStorage.removeItem('token');
    const navigate = useNavigate();
    function handleLogout(){
        navigate('/');
    }
    return(
        <div className="FeedbackContainer">
            <div className="feedbackBodyTitle">
                <span>😀</span>
                <span className="thankY">THANK YOU :)</span>
                </div>
            <div className="feedbackBodyEmoji">
                <span>Rate Us : </span>
                <div className="reactionBox">😞</div>
                <div className="reactionBox">😕</div>
                <div className="reactionBox">😑</div>
                <div className="reactionBox">😊</div>
                <div className="reactionBox">😍</div>
            </div>
            <div className="feedbackBodyTextarea">
                <textarea name="feedback" id="feedback" cols="30" rows="10" placeholder="Write your Comment...">  
                </textarea>
                <button>Submit</button>
            </div>
            <div className="feedbackBodyExitBttn">
            <button onClick={handleLogout}>Exit</button>
            </div>
        </div>
    );
}