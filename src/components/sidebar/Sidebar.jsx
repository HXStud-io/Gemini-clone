import React, { useContext } from 'react'
import './Sidebar.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { AiContext } from '../context/AiContextProvider'
const Sidebar = ( )=>{

    const [extended, setExtended] = useState(false);
    const {prevPrompt, onSent, setRecentPrompt, setLoading, setShowResult} = useContext(AiContext)
    const loadPrompt = async (prompt)=>{
        setRecentPrompt(prompt)    
        await onSent(prompt)
    }
    const newChat = () => {
        setLoading(false)
        setShowResult(true)
    }

    return(
        <>
        <div className="sidebar">
            <div className="top">
                <img className="menu" src={assets.menu_icon} alt="" onClick={(e)=>{setExtended(prev => !prev)}} />
                
                <div className="newchat" onClick={newChat}>
                    <img src={assets.plus_icon} alt=""/>
                    {extended && (<p>New Chat</p>)}
                </div>
                {extended && (
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {prevPrompt.map((item,index)=>(
                    <div className="recent-entry" key={index} onClick={()=>{loadPrompt(item)}}>
                        <img src={assets.message_icon}  alt="" />
                        <p>{item.slice(0,18)}...</p>
                    </div>
                    ))}   
                </div>
                )}
            
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended && (<p>Help</p>)}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended && (<p>Activity</p>)}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended && (<p>Setting</p>)}
                </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar 