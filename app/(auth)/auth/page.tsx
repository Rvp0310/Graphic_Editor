"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Button from '@mui/material/Button';

import { isValidEmail, isStrongPassword } from "@/app/lib/validators";
import toast from "react-hot-toast";

const AuthPage = () => {

  const searchParams = useSearchParams();
  const rawMode = searchParams.get("mode");

  const initialMode: "login" | "signup" =
  rawMode === "signup" ? "signup" : "login";
  
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  const handleLogin = async () => {

    const res = await fetch("api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, password})
    });

    const data = await res.json();

    if(!res.ok){
      toast.error("Login Failed");
      return;
    }

    window.location.href = "/";
  };

  const handleSignup = async () => {

    if(!isStrongPassword(password)) {
      toast.error("Password must be 8 characters long");
      return;
    }

    if(!isValidEmail(email)){
      toast.error("Invalid email id detected");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, email, password})
    });

    const data = await res.json();

    if(!res.ok){
      toast.error("Sign-up Failed");
      return;
    }

    window.location.href = "/auth?mode=login";
  }

  return (
    <div className="authBoard">
      
      {/* LEFT — Login */}
      {mode == 'login' ? 
      <div className="login">
        <h2 className="authTitle">Welcome back</h2>

        <form className="loginform">
          <input className="input in" placeholder="Username" value = {username} onChange= {(e) => setUsername(e.target.value)}/>
          <input className="input in" type="password" placeholder="Password" value = {password} onChange= {(e) => setPassword(e.target.value)}/>

          <Button className='LoginBtn' style={{marginTop: "3.5px"}} onClick={handleLogin}>Login</Button>
        </form>
      </div>
      : 
      <div className="cover" style={{backgroundImage:"url('/signup_active.jpg')"}}>
        <div className="overlay">
        <p className="switchTitle"> Already A User ? </p>
        <Button className='LoginBtn' onClick={() => setMode("login")}>Login</Button>
        </div>
      </div>
      }

      {/* RIGHT — Signup */}
      {mode == 'signup' ? 
      <div className="signup">
        <h2 className="authTitle">New here?</h2>

        <form className="signupform">
          <input className="input in" placeholder="Username" value = {username} onChange= {(e) => setUsername(e.target.value)}/>
          <input className="input in" placeholder="Email" value = {email} onChange= {(e) => setEmail(e.target.value)}/>
          <input className="input in" type="password" placeholder="Password" value = {password} onChange= {(e) => setPassword(e.target.value)}/>
          <input className="input in" type="password" placeholder="Confirm Password" value = {confPassword} onChange= {(e) => setConfPassword(e.target.value)}/>

          <Button className='SignUpBtn' style={{marginTop: "3.5px"}} onClick={handleSignup}>Sign-Up</Button>
        </form>
      </div>
      :
      <div className="cover" style={{backgroundImage:"url('/login_active.jpg')"}}>
        <div className="overlay">
        <p className="switchTitle"> New Here? </p>
        <Button className='SignUpBtn' onClick={() => setMode("signup")}>Sign-Up</Button>
        </div>
      </div>
      }
    </div>
  );
}

export default AuthPage;