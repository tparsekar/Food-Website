import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useOnlineStatus=()=>{

    const [OnlineStatus,setOnlineStatus]=useState(true);  //keeps track of whether there interet is ON

    //check if online
    
    useEffect(()=>{
        window.addEventListener("online", ()=>{
            setOnlineStatus(true);
        });

        window.addEventListener("offline", ()=>{
            setOnlineStatus(false);
        });

    },[]);

    //boolan value
    return OnlineStatus; //jo var ami use kela tot ret karta
}

export default useOnlineStatus;