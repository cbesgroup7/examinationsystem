import React from "react";
import demoVideo from '../assets/demovideo.mp4'
import { useNavigate } from 'react-router-dom';

export default function Demo(){
  const navigate = useNavigate();
  const handleClick = () => navigate('/session');
    return (
        <div className="DemoContainer">
          <div className="demContainer">
            <div className="box">
              <h2>Demo Video</h2>
              <video width="420" height="340" autoPlay muted>
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="buttonClass">
            <button type="button" onClick={handleClick}>Next</button>
          </div>
        </div>
      );
}