import React from 'react'
import { UserType } from '../context/AuthContext'

const FileTypes = () => {
  return (
    <>
    Looking For:
      <div className='fileTypes'>
          <a href='/editor/whiteboard'>
              <img className='icons' src='/whiteboard.png' alt='whiteboard'/>
          </a>
          <a href='/editor/presentation'>
              <img className='icons' src='/presentation.png' alt='presentation'/>
          </a>
      </div>
    </>
  )
}

export default FileTypes