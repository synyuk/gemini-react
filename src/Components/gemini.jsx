import "./gemini.css";
import key from '../services/gemini-api-key';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {useState} from "react";

const genAI = new GoogleGenerativeAI(key);
let question;

function requestApi(e){
    question = e.target.value;
}

function Gemini() {
    const [response, setResponse] = useState("");

    const handleChat = async () => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(question);
            setResponse(result.response.text());
        } catch (error) {
            setResponse("Ошибка: " + error.message);
        }
    };

    return (
        <div className="gemini">
            <h1>Google Gemini AI</h1>
            <div className="gemini-wrap">
                <input onChange={requestApi} type="text"/>
                <button onClick={handleChat}>Ask AI</button>
            </div>
            <p className="gemini-response">{response}</p>
        </div>
    );

}

export default Gemini;