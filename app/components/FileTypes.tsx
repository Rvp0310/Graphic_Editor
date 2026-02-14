import React from 'react'
import { UserType } from '../context/AuthContext'

const FileTypes = () => {
  return (
    <>
    Looking For:
      <div className='fileTypes'>
          <a href='/editor'>
              <img className='icons' src='/whiteboard.png' alt='whiteboard'/>
          </a>
      </div>
    </>
  )
}

export default FileTypes