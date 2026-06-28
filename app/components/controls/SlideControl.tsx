import React from 'react'
import MoveDownIcon from '@mui/icons-material/MoveDown';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { MoveUp } from '@mui/icons-material';

const SlideControl = ({currentSlide, totalSlides, moveSlideUp, moveSlideDown, addSlide, deleteSlide}: {currentSlide: number, totalSlides: number, moveSlideUp: () => void, moveSlideDown: () => void, addSlide: () => void, deleteSlide: () => void}) => {
  return (
    <div className='slideCon'>
      <IconButton onClick={moveSlideDown} disabled = {totalSlides == 1 || currentSlide == totalSlides - 1}>
        <MoveDownIcon/>
      </IconButton>
      <IconButton onClick={moveSlideUp} disabled = {totalSlides == 1 || currentSlide == 0}>
        <MoveUp/>
      </IconButton>
      <IconButton onClick={addSlide}>
        <AddIcon/>
      </IconButton>
      <IconButton onClick={deleteSlide} disabled = {totalSlides == 1}>
        <DeleteForeverIcon/>
      </IconButton>
    </div>
  )
}

export default SlideControl
