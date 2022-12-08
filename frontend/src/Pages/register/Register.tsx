import React, {useRef, useState, useEffect} from 'react';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../api/axios';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = '/signup';

const Register = () => {
    const userRef = React.useRef<HTMLInputElement>(null);
    const errRef = React.useRef<HTMLParagraphElement>(null);

    const [userName, setUserName] = React.useState('');
    const [validName, setValidName] = React.useState(false);
    const [userFocus, setUserFocus] = React.useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = React.useState(false)
    const [passwordFocus, setPasswordFocus] = React.useState(false)

    const [matchPassword, setMatchPassword] = React.useState('')
    const [validMatch, setValidMatch] = React.useState(false)
    const [matchFocus, setMatchFocus] = React.useState(false) 

    const [errMsg, setErrMsg] = React.useState('');
    const [success, setSucess] = React.useState(false);

     
    React.useEffect(() => {
      userRef.current?.focus()
    }, [])
    
    React.useEffect(() => {
        setValidName(USER_REGEX.test(userName))
    }, [userName])


    React.useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        const match = password === matchPassword;
        setValidMatch(match)
    }, [password, matchPassword])

    React.useEffect(() => {
        setErrMsg('');
    }, [userName, password, matchPassword])


    // submit Function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
    //    if button enabled with JS HACK
        const v1 = USER_REGEX.test(userName);
        const v2 = PWD_REGEX.test(password);
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return
        }
        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({userName, password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
                )
                console.log(response.data)
                setSucess(true)
        } catch (error:any) {
            if(!error?.response){
                setErrMsg('No Server Response')
            } else if(error.response?.status === 409){
                setErrMsg('Username Taken')
            }else{
                setErrMsg('Registration Failed')
            }
            errRef.current?.focus()
        }
    }

  return ( 
        <React.Fragment>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    {/* put a react router link */}
                    <a href='#'>Sign In</a>
                </p>
            </section>
        ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            {/* username */}
            <label htmlFor='username'>
                Username:
                <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validName || !userName ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            <input
                type='text'
                id='username'
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUserName(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
            />
            <p id='uidnote' className={userFocus && userName && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                5 to 25 characters.<br/>
                Must begin with a letter.<br/>
                Letters, numbers, underscores hyphens allowed
            </p>

            {/* password */}
            <label htmlFor='password'>
                Password:
                <span className={validPassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validPassword || !password ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>

            <input
                type="password"
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
            />
            <p id='pwdnote' className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                6 to 24 characters.<br/>
                Must include uppercase and lowercase letters, a number and a special character.<br/>
                Allowed special characters: <span aria-label='exclamation mark'>!</span>
                <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>
                <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
            </p>

                {/* confirm Password */}
            <label htmlFor='confirm_pwd'>
                confirm Password:
                <span className={validMatch && matchPassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            <input
                type="password"
                id='confirm_pwd'
                onChange={(e) => {
                    setMatchPassword(e.target.value)
                }}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
            />
            <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Must match the first password input field
            </p>

                {/* submit button */}
                <button disabled={!validName || !validPassword || !validMatch ? true : false}>Sign Up</button>
        </form>

                <p>Already registered?<br/>
                    <span className='line'>
                        <a href='#'>Sign In</a>
                    </span>
                </p>
    </section>
        )}
        </React.Fragment>
  )
}

export default Register;