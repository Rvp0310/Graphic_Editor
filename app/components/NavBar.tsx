import React from 'react'

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { useRouter } from "next/navigation";

import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const router = useRouter();
  const {user, logout} = useAuth();

  const [mode, setMode] = useState<"signup"|"login">("login");

  return (
    <nav className="nav navbar bg-body-tertiary nav1">
          <div className="container">
            <a className='logoLink' href="/">
              <img className='logo' src='/graphic_editor.png' alt="Smeargle" />
            </a>
            {user ? 
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled button group"
                className="btngrp"
              >
                <Button className='LogoutBtn' onClick={logout}>Logout</Button>
              </ButtonGroup>
              :
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled button group"
                className="btngrp"
              >
                  <Button className='LoginBtn' onClick={() => router.push("/auth?mode=login")}>Login</Button>
                  <Button className='SignUpBtn' onClick={() => router.push("/auth?mode=signup")}>Sign-Up</Button>
              </ButtonGroup>
            }
          </div>
        </nav>
  )
}

export default NavBar