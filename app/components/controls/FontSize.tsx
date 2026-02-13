import React, { useState, useEffect } from 'react';
import { Canvas, IText } from 'fabric';

const FontSize = ({selectedObject, canvas, saveState}: { selectedObject: IText; canvas: Canvas | null; saveState: () => void; }) => {
    if (!selectedObject || !canvas) return null;
    const [fontSize, setFontSize] = useState(16);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = +e.target.value;
        selectedObject.set({ fontSize: newSize });
        setFontSize(newSize);
        selectedObject.setCoords();
        canvas.requestRenderAll();
    };

    const updateFontSize = () => {
        const scaledFontSize = Math.round((selectedObject.fontSize || 16) * (selectedObject.scaleY || 1));
        setFontSize(scaledFontSize);
    }

    const normalizeTextScale = () => {
        const newFontSize =
            (selectedObject.fontSize || 16) * (selectedObject.scaleY || 1);

        selectedObject.set({
            fontSize: Math.round(newFontSize),
            scaleX: 1,
            scaleY: 1,
        });

        selectedObject.setCoords();
        canvas?.requestRenderAll();
    };

    useEffect(() => {
        setFontSize(selectedObject.fontSize || 24);

        canvas.on("object:scaling", updateFontSize);
        canvas.on("object:modified", normalizeTextScale);

        return () => {
        canvas.off("object:scaling", updateFontSize);
        canvas.off("object:modified", normalizeTextScale);
        };
    }, [canvas, selectedObject]);

    return (
        <div className='algnLabel'>
            <label htmlFor='fontSize'>Size:</label>
            <input
                className='input'
                id='fontSize'
                type='number'
                max={100}
                min={1}
                value={fontSize}
                onChange={handleChange}
                onBlur={saveState}
            />
        </div>
    );
};

export default FontSize;
