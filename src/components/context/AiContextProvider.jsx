import { createContext, PureComponent, useEffect } from "react";
import runChat from "../config/gemini";
import { useState } from "react";

export const AiContext = createContext()

const AiContextProvider = (props)=>{
    const [input,setInput] = useState("")
    const [recentPrompt,setRecentPrompt] = useState("")
    const [prevPrompt,setPrevPrompt] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)
    const [resultData , setResultData] = useState("")
    
    const delayParas = (index, nextWord)=>{
        setTimeout(()=>{
            setResultData(prev => prev+nextWord)
        },75*index)
    }

    const onSent = async(prompt)=>{
        setShowResult(false)
        setLoading(true)
        setResultData("")
            let response;
            if (prompt !== undefined) {
            setRecentPrompt(prompt);            
            response = await runChat(prompt);
        } else {
            
            if (!input.trim()) {
                setLoading(false);
                setShowResult(true);
                return;
            } 
            setRecentPrompt(input);
            response = await runChat(input);
        }


        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("###").join("<br/>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayParas(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
            
    }
    
    const contextVal = {
        prevPrompt,
        onSent,
        recentPrompt,
        input,
        setInput,
        loading,
        setLoading,
        setShowResult,
        resultData,
        showResult,
        loading,
        setRecentPrompt,
        setPrevPrompt
    }


    return (
        <AiContext.Provider value={contextVal}>
            {props.children}
        </AiContext.Provider>
    )
}

export default AiContextProvider  