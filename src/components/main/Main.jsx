import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { AiContext } from '../context/AiContextProvider'
import { useContext } from 'react'

const Main = ()=>{

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(AiContext)

    return(
        <>
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className='main-container'>
                {showResult ? 
                <>
                <div className="Greet">
                    <p><span>Hello, Dev</span></p>
                    <p>How can I help you today</p>
                </div> 
                <div className='cards'>
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for our wor retreat </p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
                :
                <>
                <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} />
                        {loading?(<div className="loader">
                        <hr />
                        <hr />
                        <hr /></div>):
                        (<p dangerouslySetInnerHTML={{__html:resultData}}></p>)}
                    </div>
                </div>
                </>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                        value={input}
                        onChange={(e)=>{setInput(e.target.value)}}
                        type="text" placeholder="Enter the prompt here" />
                        <div>
                            <img src={assets.gallery_icon} />
                            <img src={assets.mic_icon} />
                            <img 
                            onClick={()=>{onSent(input)}}
                            src={assets.send_icon} />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate information, including about people, so double-chec its responses. You privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Main