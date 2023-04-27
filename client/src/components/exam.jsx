// import React,{useState} from "react";
// import profileImage from "../assets/profile.png"
// import GridViewIcon from '@mui/icons-material/GridView';
// import { getQuestion } from "../helper/helper";

// export default function Exam() {
    
//     const [showBox, setShowBox] = useState();
//     const [boxMarkingPosition, setBoxMarkingPosition] = useState({});
//     const handleBoxMarkingDrag = (e) => {
//         const element = e.target;
//         const x = e.clientX - element.offsetWidth / 2;
//         const y = e.clientY - element.offsetHeight / 2;
//         setBoxMarkingPosition({ x, y });
//       };
    
//       const handleBoxMarkingDragEnd = (e) => {
//         const element = e.target;
//         const x = e.clientX - element.offsetWidth / 2;
//         const y = e.clientY - element.offsetHeight / 2;
//         setBoxMarkingPosition({ x, y });
//       };
//       function handleBox(){
//         setShowBox(!showBox);
//       }
//     return (
//         <div className="ExamContainer">
//             {showBox && (<div
//             id="boxQ"
//         className="boxMarking"
//         draggable="true"
//         onDragStart={(e) => {
//           e.dataTransfer.setData("text/plain", "");
//         }}
//         onDrag={handleBoxMarkingDrag}
//         onDragEnd={handleBoxMarkingDragEnd}
//         style={{ left: boxMarkingPosition.x, top: boxMarkingPosition.y }}
//       >
//         <h2>Questions</h2>
//         <div className="questinsBox">
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//             <div className="roundBox"></div>
//         </div>
//       </div>)}
//             <div className="topBar">
//                 <TopBar />
//             </div>
//             <div className="secondBar">
//                 <div className="secondBarContainer">
//                     <div className="secContents">
//                         <span onClick={handleBox}><GridViewIcon /></span>
//                         <span>{localStorage.getItem('university')}</span>
//                         <span>Questions : </span>
//                         <span>Answered : </span>
//                         <span>Marked For Review : </span>
//                         <span>Not Answered : </span>
//                         <button className="SubmitBtn">Finish</button>
//                     </div>
//                 </div>
//             </div>
//             <div className="restBody">
//                 <div className="BodyContainer">
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useRef, useState } from "react";
import profileImage from "../assets/profile.png";
import GridViewIcon from "@mui/icons-material/GridView";
import useFetch from "../hooks/fetch.hook";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FlagIcon from '@mui/icons-material/Flag';
import { useNavigate } from 'react-router-dom';





export default function Exam() {
  const [showBox, setShowBox] = useState(false);
  const [boxMarkingPosition, setBoxMarkingPosition] = useState({});
  const [{isLoading, apiData, serverError }] =  useFetch('getQuestion');
  const [markedQuestionsCount, setMarkedQuestionsCount] = useState(0);
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedQuestionIndexes, setMarkedQuestionIndexes] = useState([]);
  let questions = apiData?.data;
  // const handleBoxMarkingDrag = (e) => {
  //   const element = e.target;
  //   const x = e.clientX - element.offsetWidth / 2;
  //   const y = e.clientY - element.offsetHeight / 2;
  //   setBoxMarkingPosition({ x, y });
  // };

  // const handleBoxMarkingDragEnd = (e) => {
  //   const element = e.target;
  //   const x = e.clientX - element.offsetWidth / 2;
  //   const y = e.clientY - element.offsetHeight / 2;
  //   setBoxMarkingPosition({ x, y });
  // };
  const navigate = useNavigate();

  const handleClick = () => navigate('/feedback');

  const handleMarkForReview = () => {
    const currentIndex = currentQuestionIndex;
    const index = markedQuestions.indexOf(currentIndex);

    if (index === -1) {
      // add to marked questions
      setMarkedQuestions([...markedQuestions, currentIndex]);
      setMarkedQuestionsCount(markedQuestionsCount + 1);
      setMarkedQuestionIndexes([...markedQuestionIndexes, currentIndex]);
      localStorage.setItem('markedIndexes',markedQuestionIndexes)
    } else {
      // remove from marked questions
      const updatedMarkedQuestions = [...markedQuestions];
      updatedMarkedQuestions.splice(index, 1);
      setMarkedQuestions(updatedMarkedQuestions);
      setMarkedQuestionsCount(markedQuestionsCount - 1);
      setMarkedQuestionIndexes(markedQuestionIndexes.filter((i) => i !== currentIndex));
    }
  }



  const handleSubmissionClick = () => {
  };

  const [answers, setAnswers] = useState([]);

  const handleOptionChange = (event) => {
    const selectedOption = event.target;
    const selectedLabel = selectedOption.nextSibling;
    const prevSelectedOption = document.querySelector('.selected');
    if (prevSelectedOption) {
      const prevSelectedLabel = prevSelectedOption.nextSibling;
      prevSelectedOption.classList.remove('selected');
      prevSelectedLabel.style.backgroundColor = 'rgb(255, 44, 111)';
    }
    selectedOption.classList.add('selected');
    selectedLabel.style.backgroundColor = 'green';
    const answer = {
      question: currentQuestionIndex,
      optionSelected: selectedOption.value,
      optionIndex: event.index,
    };
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };
  console.log(answers)
  const resetOptionColors = () => {
    const optionLabels = document.querySelectorAll('.opCont label');
    optionLabels.forEach((label) => {
      label.style.backgroundColor = 'rgb(255, 44, 111)';
    });
  };
  
  return (
    <div className="ExamContainer">
      
      <div className="topBar">
        <TopBar />
      </div>
      
     
      <div className="restBody">
        <div className="left">
        <div className="BodyContainer">
        <div className="question">
          <span>{currentQuestionIndex + 1}. &nbsp;&nbsp; {apiData?.data[currentQuestionIndex].question}</span>
        </div>
        <div className="optionsContainer">
        <div className="opCont">
        {apiData?.data[currentQuestionIndex].options.map((option, index) => (
    <div key={index}>
      <input type="radio" name="option" id={`option${index + 1}`} value={option.text} onChange={(e) => handleOptionChange({ ...e, index: index })} />
      <label htmlFor={`option${index + 1}`} >{option.text}</label>
    </div>
  ))}
        </div>
          
        </div>
        <div className="buttonNextPrevious">
        <button
    className="NextBtn"
    onClick={() => {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      resetOptionColors();
    }}
    disabled={currentQuestionIndex === 0}
    >
    <ArrowLeftIcon sx={{color : 'red', backgroundColor : 'rgb(13, 26, 74) !important', scale : '2', '&:hover': { color: 'rgb(2, 197, 204)', fontSize:'2.3em' }}} />
  </button>
        <button
    className="NextBtn"
    onClick={() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetOptionColors();
    }}
    disabled={currentQuestionIndex === apiData?.data.length - 1}
  >
    <ArrowRightIcon sx={{color : 'red', backgroundColor : 'rgb(13, 26, 74) !important', scale : '2', '&:hover': { color: 'rgb(2, 197, 204)', fontSize:'2.3em' }}} />
  </button>
        </div>
        <div className="markForReview"  onClick={handleMarkForReview}>
          <FlagIcon sx={{color : 'green', backgroundColor : 'rgb(13, 26, 74) !important', scale : '2', '&:hover': { color: 'lightgreen', fontSize:'2.3em' }}}/>
        <span>Mark For Review</span>
        </div>
</div>
        </div>
        <div className="right">      
        <div
          id="boxQ"
          className="boxMarking"
          // draggable="true"
          // onDragStart={(e) => {
          //   e.dataTransfer.setData("text/plain", "");
          // }}
          // onDrag={handleBoxMarkingDrag}
          // onDragEnd={handleBoxMarkingDragEnd}
          // style={{ left: boxMarkingPosition.x, top: boxMarkingPosition.y }}
        >
          <h2>Questions</h2>
          <div className="questinsBox">
            {[...Array(apiData?.data.length)].map((_, i) => (
              <div
                key={i}
                className={`roundBox ${i === currentQuestionIndex ? "active" : ""} ${markedQuestionIndexes.includes(i) ? "marked-for-review" : ""}`}
                onClick={() =>{ setCurrentQuestionIndex(i);resetOptionColors()}}
              >{i+1}</div>
            ))}
          </div>
        </div>
        </div>
      

      </div>
      <div className="secondBar">
        <div className="secondBarContainer">
          <div className="secContents">
            <span>
              <GridViewIcon />
            </span>
            <span>{localStorage.getItem("university")}</span>
            <span>Questions : {apiData?.data.length}</span>
            <span>Answered : {answers?.length} </span>
            <span>Marked For Review : {markedQuestionsCount}</span>
            <span>Not Answered : {apiData?.data.length - answers?.length}</span>
            <button className="SubmitBtn" onClick={handleClick}>Finish</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export function TopBar() {
  const [timeLeft, setTimeLeft] = useState(parseInt(localStorage.getItem('timeLeft'), 10) || 480);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
      localStorage.setItem('timeLeft', timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  }
  if (timeLeft === 0) {
    navigate('/feedback')
  }

  return (
    <div className="TopBarContainer">
      <h1 className="appName">Online-Exam</h1>
      <span id="timee">{formatTime(timeLeft)}</span>
      <div className="profileContainer">
        <img src={profileImage} alt="profile Image"></img>
        <span>{localStorage.getItem('username')}</span>
      </div>
    </div>
  );
}

// function handleOption(){
// const optionsContainer = document.querySelector('.optionsContainer');
// console.log(optionsContainer);
// optionsContainer.addEventListener('click', (event) => {
//   const selectedOption = event.target;
//   if (selectedOption.tagName === 'LABEL') {
//     const options = optionsContainer.querySelectorAll('label');
//     options.forEach((option) => {
//       option.classList.remove('green');
//     });
//     selectedOption.classList.add('green');
//   }
// });
// }


