import React,{useState, useEffect} from "react";
import './styles.scss';
import { useNavigate } from "react-router-dom";
import toast,{Toaster} from 'react-hot-toast'
import { useAsync } from "react-use";
import { getUser } from "../helper/helper";
import {useFormik} from 'formik'
import {verifyPassword} from '../helper/helper'
import {passwordValidate} from '../helper/validate'

export default function Login() {
    const navigate = useNavigate()
localStorage.removeItem('token');
  const [username, setUsername] = useState();
  const [questionpaper, setQuestionPaper] = useState();
  const [regno, setRegno] = useState();
  const [university, setUniversity] = useState();

  const { value: userData } = useAsync(getUser, []);

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setQuestionPaper(userData.questionPaperCode);
      setRegno(userData.regno);
      setUniversity(userData.university);
    }
  }, [userData]);
  const formik = useFormik(
    {
        initialValues : {
            password : ''
        },
        validate : passwordValidate,
        validateOnBlur : false,
        validateOnChange : false,
        onSubmit : async values => {
            let loginPromise = verifyPassword({ username,password : values.password });
        toast.promise(loginPromise, {
            loading : "Checking...",
            success : <b>Login success...!</b>,
            error : <b>Password not match!</b>
        });
        loginPromise.then(res => {
            let { token } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("questionpaper", questionpaper);
            localStorage.setItem("university", university);
            navigate("/instruction");
        })
        }
    }
);
  return (
    <div className="LoginContainer">
      <Toaster position="top-centere" reverseOrder={false}></Toaster>
      <div className="profileImage">
        <div className="proCont">
          <img alt="profileimage" />
        </div>
      </div>
      <div className="LoginBox">
        <div className="box">
          <div className="insideBox">
            <h3>{regno || "XXX19XX000"}</h3>
            <form onSubmit={formik.handleSubmit} >
              <input
              {...formik.getFieldProps('password')}
                type="password"
                name="password"
                id="pass"
                placeholder="Enter Password"
              />
              <input
                type="submit"
                name="submitBtn"
                id="submitBtn"
                value="LOGIN"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
