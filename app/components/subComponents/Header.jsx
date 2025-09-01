import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function Header() {
    const HeaderRef=React.useRef(null)
    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger) 

        gsap.to(HeaderRef.current,{opacity:1,scrollTrigger:{
            trigger:HeaderRef.current,
           // markers:true,
            start:"top top",
            end: "bottom+=10000 center",
            pin:true
        }})
    })
  return (
    <div className="bg-black text-white h-[10vh] w-full z-50 absolute top-[100vh] left-0 opacity-0" ref={HeaderRef}>

    {/* Content here */}
  </div>
  )
}