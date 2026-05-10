import { createContext, PureComponent, useEffect } from "react";
import runChat from "../config/gemini";
import { useState } from "react";

export const AiContext = createContext()

const AiContextProvider = (props)=>{
    const [input,setInput] = useState("")
    const [recentPrompt,setRecentPrompt] = useState("")
    const [prevPrompt,setPreviousPrompt] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)
    const [resultData , setResultData] = useState("")
    
    const delayParas = (index, nextWord)=>{
        setTimeout(()=>{
            setResultData(prev => prev+nextWord)
        },75*index)
    }

    const onSent = async(prompt)=>{
        console.log("...procesing")
        setResultData("")
        setLoading(true)
        setShowResult(false)
        let resp;
        if(prompt !== undefined){
            setRecentPrompt(prompt)
            resp = await runChat(prompt)
        }
        else{
            setPreviousPrompt(prev => [...prev,input])
            setRecentPrompt(input)
            resp = await runChat(input)
        }
        let respArr = resp.split("**")
        let newResp = "";
        for(let i=0; i< respArr.length; i++){
            if(i === 0 || i%2 !== 1){
                newResp += respArr[i];
            }
            else{
                newResp += "<b>"+respArr[i]+"</b>"
            }
        }
        newResp = newResp.split(/[###*]/).join("</br>")
        let newRespArr = newResp.split(" ")
        for(let i=0; i< newRespArr.length;i++){
            const nextWord = newRespArr[i]
            delayParas(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")
        console.log("...finish")
    }
    
    const contextVal = {
        prevPrompt,
        onSent,
        recentPrompt,
        input,
        setInput,
        loading,
        resultData,
        showResult,
        loading,
        setRecentPrompt
    }


    return (
        <AiContext.Provider value={contextVal}>
            {props.children}
        </AiContext.Provider>
    )
}

export default AiContextProvider  