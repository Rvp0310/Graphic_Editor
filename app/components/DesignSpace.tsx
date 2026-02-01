"use client"

import React, { useEffect, useState } from 'react'
import { UserType } from '../context/AuthContext';
import SavedDesign from './SavedDesign';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export type DesignType = {
  _id: string;
  name: string;
  thumbnail: string;
  updatedAt: string;
  fetchDesigns: () => void;
  onClick: () => void;
}

const DesignSpace = ({user}: { user: UserType; }) => {
  const router = useRouter();
  const [designs, setDesigns] = useState<DesignType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDesigns = async () => {
      try{
        console.log("calling backend")
        const res = await fetch("/api/design/save", {
          method: "GET",
          credentials: "include"
        });
        const data = await res.json();
        setDesigns(data.designs);
        console.log(data.designs);
      } catch {
        toast.error("Failed to fetch designs");
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    if(!user?.id) return;

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
          fetchDesigns = {fetchDesigns}
          onClick={() => {
            // navigate to editor
          
            router.push(`/editor/${design._id}`);
          }}
        />
      ))}
    </div>
  )
}

export default DesignSpace
