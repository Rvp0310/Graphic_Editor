import React from 'react';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import FlipIcon from '@mui/icons-material/Flip';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import IconButton from '@mui/material/IconButton';

const ShapeFormatPannel: React.FC = () => {
  return (
    <div className="ShapePannel setting">
      <div className="PannelSection">
        <h5>Background</h5>
        <div className="algnLabel">
        <label htmlFor="backgroundColorInput" className="form-label">
          Fill
        </label>
        <input
          type="color"
          className="form-control form-control-color input"
          id="backgroundColorInput"
          defaultValue="#563d7c"
          title="Choose your color"
        />
        </div> {/* opacity included */}
      </div>

      <div className="PannelSection">
        <h5>Border</h5>
        <div className="inputGroup">
        <div className="algnLabel">
        <label htmlFor="borderColorInput" className="form-label">
          Fill
        </label>
        <input
          type="color"
          className="form-control form-control-color input"
          id="borderColorInput"
          defaultValue="#563d7c"
          title="Choose your color"
        /></div>
        <div className="algnLabel">
        <label htmlFor="borderRadiusInput" className="form-label">
          Radius (%)
        </label>
        <input
          type="number"
          id="borderRadiusInput"
          className="input"
          min={0}
          max={50}
          defaultValue={0}
        /></div>
        </div>
      </div>

      <div className="PannelSection">
        <h5>Size</h5>
        <div className="inputGroup">
        <div className="algnLabel">
          <label htmlFor="widthInput" className="form-label">
            Width
          </label>
          <input
            type="number"
            id="borderRadiusInput"
            className="input"
            min={0}
            max={100}
            defaultValue={0}
          />
        </div>
        <div className="algnLabel">
        <label htmlFor="heightInput" className="form-label">
          Height
        </label>
        <input
          type="number"
          id="borderRadiusInput"
          className="input"
          min={0}
          max={100}
          defaultValue={0}
        />
        </div>
        </div>
      </div>

      <div className="PannelSection">
        <h5>Orientation</h5>
        <div className="inputGroup">
        <IconButton>
          <Rotate90DegreesCcwIcon sx={{color: 'white'}}/>
        </IconButton>
        <IconButton>
          <Rotate90DegreesCwIcon sx={{color: 'white'}}/>
        </IconButton>
        <IconButton>
          <FlipIcon sx={{color: 'white'}}/>
        </IconButton>
        <IconButton>
          <FlipIcon sx={{ transform: 'rotate(90deg)', color: 'white' }} />
        </IconButton>
        </div>
      </div>

      <div className="PannelSection">
        <h5>Position</h5>
        <div className="inputGroup">
        <IconButton>
          <FlipToBackIcon sx={{color: 'white'}}/>
        </IconButton>
        <IconButton>
          <FlipToFrontIcon sx={{color: 'white'}}/>
        </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ShapeFormatPannel;
