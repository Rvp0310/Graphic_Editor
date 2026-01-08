import React, { useState, useEffect } from 'react';
import { Canvas, IText } from 'fabric';

const FontSize = ({ selectedObject, canvas }: { selectedObject: IText; canvas: Canvas | null; }) => {
    if (!selectedObject || !canvas) return null;
    const [fontSize, setFontSize] = useState(16);

    useEffect(() => {
        setFontSize(selectedObject.fontSize || 24);
    }, [selectedObject]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = +e.target.value;
        selectedObject.set({ fontSize: newSize });
        setFontSize(newSize);
        selectedObject.setCoords();
        canvas.requestRenderAll();
    };

    return (
        <div className='algnLabel'>
            <input
                className='input'
                type='number'
                max={100}
                min={1}
                value={fontSize}
                onChange={handleChange}
            />
        </div>
    );
};

export default FontSize;
