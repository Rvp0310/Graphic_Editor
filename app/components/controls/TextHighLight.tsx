import React, { useEffect, useState } from 'react'
import { Canvas, IText} from 'fabric';

const TextHighLight = ({selectedObject, canvas, saveState}: { selectedObject: IText; canvas: Canvas | null; saveState: () => void; }) => {
    if (!selectedObject || !canvas) return null;

    const [highlight, setHighlight] = useState<string>('#fff');

    useEffect(() => {
      setHighlight(selectedObject.backgroundColor || '#fff');
    }, [selectedObject])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHighlight(e.target.value);
      selectedObject.set({backgroundColor: e.target.value});
      canvas.renderAll();
    }

  return (
    <div className="highlight-wrapper">
    <span className="highlight-icon" style={{ backgroundColor: highlight }}>A</span>

    <input
      type="color"
      className="highlight-input"
      id="Highlight"
      value={highlight}
      onInput={handleChange}
      onBlur={saveState}
      title="Choose highlight color"
    />
</div>
  )
}

export default TextHighLight
