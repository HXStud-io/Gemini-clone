import { GoogleGenerativeAI } from "@google/generative-ai";

const API_key = "AIzaSyAp1MXWkgRJHFiVqqk-BPdW75vrw5k8ZWE"
const genAI = new GoogleGenerativeAI(API_key,{apiVersion: 'v1'});

const runChat = async (prompt)=>{
    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview"
    });

    try{
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    }catch(error){
        console.error("Modle error : ",error)
        return "Error fetching response"
    }
}

export default runChat