import React from "react";
import Image from 'next/image'

function Home() {
  return (
    <div>
       <Image src={`/home.jpg`} alt={`home.jpg`} 
       width="1920" 
       height="1080" 
        // layout="fill" 
        // objectFit="cover" 
        />
    </div>
  );
}

export default Home;
