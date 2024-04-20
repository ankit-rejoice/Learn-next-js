import React from "react";
import Image from 'next/image'

function Home() {
  return (
    <div>
       <Image src={`/supermanlogo.jpg`} alt={`supermanlogo.jpg`} 
       width="1920" 
       height="1080" 
        // layout="fill" 
        // objectFit="cover" 
        />
    </div>
  );
}

export default Home;
