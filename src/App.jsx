import React, { useState,useEffect } from 'react'
import ShopAlert from './ShopAlert'
import Image from './components/Image';

const App = () => {
  const[show,setShow]=useState(true);
  useEffect(() => {
    const sh=setTimeout(()=>{
      setShow(false);
    },4000);
    return ()=>
      clearTimeout(sh);
  }, []);
  
  return (
    <>
    <div>
        {show ? <Image/> : <ShopAlert/>}
    </div>
    </>
  );
}

export default App
