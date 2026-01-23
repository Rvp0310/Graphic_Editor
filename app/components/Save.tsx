import React, {useState} from 'react'
import { Canvas } from 'fabric';
import NameField from './NameField';

const Save = ({ canvas }: { canvas: Canvas | null }) => {
    const [display, setDisplay] = useState<boolean>(false);

  return (
    <>
      <button className="editOp" onClick={() => setDisplay(true)}>
        <img className="editOpIcon" src="/save.svg" alt="Save" />
        <p>Save</p>
      </button>
        {display && <NameField canvas={canvas} setDisplay={setDisplay} />}
    </>
  )
}

export default Save
