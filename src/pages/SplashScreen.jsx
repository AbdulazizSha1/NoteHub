import { useState , useEffect } from "react";
import logo from "../assets/logo.png";
import { Navigate } from "react-router";

export default function SplashScreen() {
    const [go,setGo] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setGo(true);
        },2500);
    },[])
    if(go){
        return(
            <Navigate to="/home"/>
        )
    }
        
    return (
        <>
            <div className="splash-screen">
                <img src={logo} alt="NoteHub logo"/>
            </div>
        </>
    )
}