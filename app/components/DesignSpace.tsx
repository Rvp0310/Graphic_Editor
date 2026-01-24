"use client"

import React, { useEffect, useState } from 'react'
import { UserType } from '../context/AuthContext';
import SavedDesign from './SavedDesign';

export type DesignType = {
  _id: string;
  name: string;
  thumbnail: string;
  updatedAt: string;
  onClick: () => void;
}

const DesignSpace = ({user}: { user: UserType; }) => {

  const [designs, setDesigns] = useState<DesignType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!user?.id) return;
    
    const fetchDesigns = async () => {
      try{
        const res = await fetch("api/design/save", {
          method: "GET",
          headers: {
                    'Content-Type': 'application/json'
                }
        });
        const data = await res.json();
        setDesigns(data.designs);
        console.log(designs);
      } catch (err) {
        console.error("Failed to fetch designs", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDesigns();
  }, [user?.id])

  if (loading) return <p>Loading your masterpieces…</p>;

  if (designs != null && !designs.length)
    return <p>No designs yet. Go create chaos 🎨</p>;

  return (
    <div className='designSpace'>
      {designs && designs.map((design) => (
        <SavedDesign
          key={design._id}
          _id={design._id}
          name={design.name}
          thumbnail={design.thumbnail}
          updatedAt={design.updatedAt}
          onClick={() => {
            // navigate to editor
            window.location.href = `/editor/${design._id}`;
          }}
        />
      ))}
    </div>
  )
}

export default DesignSpace
