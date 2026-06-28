import React from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';

const SlideScroll = ({goDown, goUp, totalSlides, currentSlide}: {goDown: () => void, goUp: () => void, totalSlides: number, currentSlide: number}) => {
  return (
    <div className='scroll'>
      <IconButton onClick={goUp} disabled = {totalSlides == 1 || currentSlide == 0}>
        <ArrowDropUpIcon fontSize="large"/>
      </IconButton>
      <IconButton onClick={goDown} disabled = {totalSlides == 1 || currentSlide == totalSlides - 1}>
        <ArrowDropDownIcon fontSize="large"/>
      </IconButton>
    </div>
  )
}

export default SlideScroll
