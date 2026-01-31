import React, {useState, useEffect} from 'react';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import OpacityIcon from '@mui/icons-material/Opacity';
import Arrange from './controls/Arrange';
import IconButton from '@mui/material/IconButton';
import { Canvas, FabricObject, Rect } from 'fabric';
import Duplicate from './controls/Duplicate';
import Delete from './controls/Delete';

const ShapeFormatPannel = ({selectedObject, canvas}: { selectedObject: FabricObject; canvas: Canvas | null; }) => {
  if (!selectedObject || !canvas) return null;
  
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [fillColor, setFillColor] = useState('#14116b');
  const [borderColor, setBorderColor] = useState('#000');
  const [borderRad, setBorderRad] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  useEffect(() => {
    if (!selectedObject) return;

    setStrokeWidth(selectedObject.strokeWidth || 1);
    setFillColor((selectedObject.fill as string) || '#14116b');
    setBorderColor((selectedObject.stroke as string) || '#000');
    setWidth(Math.round(selectedObject.getScaledWidth()));
    setHeight(Math.round(selectedObject.getScaledHeight()));
    setOpacity(selectedObject.opacity);

    if (selectedObject.type === 'rect') {
      const rect = selectedObject as Rect;
      setBorderRad(rect.rx || 0);
    } else {
      setBorderRad(0);
    }
  }, [selectedObject]);

  useEffect(() => {
    if (!canvas || !selectedObject) return;

    const updateSize = () => {
      setWidth(Math.round(selectedObject.getScaledWidth()));
      setHeight(Math.round(selectedObject.getScaledHeight()));

      if (selectedObject.type === "rect") {
        const rect = selectedObject as Rect;
        setBorderRad(Math.round(rect.rx || 0));
      }
    };

    canvas.on("object:scaling", updateSize);
    canvas.on("object:modified", updateSize);

    return () => {
      canvas.off("object:scaling", updateSize);
      canvas.off("object:modified", updateSize);
    };
  }, [canvas, selectedObject]);

  const isRect = (obj: any): obj is Rect => obj?.type === "rect";

  const borderRadius = isRect(selectedObject) ? selectedObject.rx || 0 : 0;

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(e.target.value);
    const scaleX = newWidth / selectedObject.getScaledWidth();
    selectedObject.scaleX *= scaleX;
    setWidth(newWidth);
    canvas.requestRenderAll();
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    const scaleY = newHeight / selectedObject.getScaledHeight();
    selectedObject.scaleY *= scaleY;
    setHeight(newHeight);
    canvas.requestRenderAll();
  }
  
  const handleFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFillColor(e.target.value);
    selectedObject.set({fill: e.target.value});
    canvas.renderAll();
  }

  const handleBorderFill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorderColor(e.target.value);
    selectedObject.set({stroke: e.target.value});
    canvas.renderAll();
  }

  const handleBorderWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedObject.stroke || selectedObject.stroke === 'transparent') {
      selectedObject.set('stroke', borderColor);
    }
    
    setStrokeWidth(+e.target.value);
    selectedObject.set({strokeWidth: +e.target.value});
    canvas.renderAll();
  }

  const handleBorderRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = Number(e.target.value);
    const maxRadius = Math.min(
      selectedObject.getScaledWidth(),
      selectedObject.getScaledHeight()
    ) / 2;
    const radiusPx = (percent / 50) * maxRadius;
    setBorderRad(percent);
    selectedObject.set({rx: radiusPx, ry: radiusPx});
    canvas.renderAll();
  }

  const handleOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setOpacity(val);
    selectedObject.set({ opacity: val });
    canvas.requestRenderAll();
  }

  const rotateCW = () => {
    selectedObject.rotate(((selectedObject.angle || 0) + 90) % 360);
    selectedObject.setCoords();
    canvas.requestRenderAll();
  }

  const rotateCCW = () => {
    selectedObject.rotate(((selectedObject.angle || 0) + 270) % 360);
    selectedObject.setCoords();
    canvas.requestRenderAll();
  }
  
  return (
    <div className="setting">
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
          value={fillColor}
          onChange={handleFillChange}
          title="Choose your color"
        />
        </div>
        <div className="algnLabel">
          <OpacityIcon/>
          <input
          className='rangeInput'
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={opacity}
            onChange={handleOpacity}
          />
        </div>
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
          value={borderColor}
          onChange={handleBorderFill}
          title="Choose your color"
        /></div>
        {
          isRect(selectedObject) &&
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
            value={borderRad}
            onChange={handleBorderRadius}
          />
          </div>
        }
        <div className="algnLabel">
        <label htmlFor="borderRadiusInput" className="form-label">
          Width
        </label>
        <input
          type="number"
          id="borderRadiusInput"
          className="input"
          min={0}
          max={50}
          value={strokeWidth}
          onChange={handleBorderWidth}
        />
        </div>
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
            min={1}
            value={width}
            onChange={handleWidthChange}
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
          min={1}
          value={height}
          onChange={handleHeightChange}
        />
        </div>
        </div>
      </div>

      <div className="PannelSection">
        <h5>Orientation</h5>
        <div className="inputGroup">
        <IconButton onClick={rotateCCW}>
          <Rotate90DegreesCcwIcon sx={{color: 'white'}}/>
        </IconButton>
        <IconButton onClick={rotateCW}>
          <Rotate90DegreesCwIcon sx={{color: 'white'}}/>
        </IconButton>
        {/* coming soon
        <IconButton>
          <BringToFront size={20} strokeWidth={1.75} />
        </IconButton>
        <IconButton>
          <FlipIcon sx={{ transform: 'rotate(90deg)', color: 'white' }} />
        </IconButton>
        */}
        </div>
      </div>

      <div className="PannelSection">
        <h5>Position</h5>
        <Arrange selectedObject={selectedObject} canvas={canvas} /> 
      </div>
      <div className="PannelSection">
        <h5>Tool Bar</h5>
        <span>
        <Duplicate canvas={canvas} selectedObject={selectedObject} /> 
        <Delete canvas={canvas} selectedObject={selectedObject} /> 
        </span>
      </div>
    </div>
  );
};

export default ShapeFormatPannel;
