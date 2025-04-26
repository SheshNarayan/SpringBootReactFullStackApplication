import React, {useState, useEffect, useRef } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

const ChatBot = () => {
    const [input, setInput] = useState(""); // Store User Inputs
    const [messages, setMessages] = useState([]); // Store Chat message
    const chatEndRef = useRef(null); // Used to auto scroll chat to the latest message

    // Function to sent user message to ChatGPT API
    const sendMessage = async() => {
        if(!input.trim()) return;

        const userMessage = {text: input, sender: "user"};
        setMessages([...messages, userMessage]);

        setInput(""); // Clear the input nox after sending message

        try{
            const respose = await axios.post("http://localhost:8080/api/chat", {prompt:input},
                {headers:{"Content-Type":"application/json"},
            });

            const botMessage = {text:respose.data, sender:"bot"}
            setMessages([...messages, userMessage, botMessage]);
        }catch(error){
            console.log("Error getching Response "+error);
            setMessages([...messages, userMessage, {text:"Error retriving response", sender:"bot"}]);
        }
    };

    // Scroll caht message to bottm automatically when new message come
    useEffect(()=> {
        chatEndRef.current?.scrollIntoView({behavior: "smooth" });
    },[messages]);

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
            <div className="bg-primary text-white text-center mx-auto my-3" 
                style={{ width: "100%", padding: "10px 30px", borderRadius: "50px" }}>
                <h4 className="mb-0">🤖 ChatGPT Chatbot by "Shesh"</h4>
            </div>

                <div className="card-body chat-box" style={{height:"300px", overflow: "auto"}}>
                   {messages.map((msg, index) => (
                        <div key={index} className={`d-flex mb-3 ${msg.sender==="user" ? "justify-content-end":"justify-content-start"}`}>
                            <div className={`p-3 rounded shadow ${msg.sender==="user" ?"bg-primary text-white": "bg-light text-dark"}`}  style={{ maxWidth: "80%" }}>
                              {msg.text}
                            </div>
                        </div>
                   ))}
                   <div ref={chatEndRef} />
                </div>

                <div className="card-footer">
                   <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type you message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage() }
                    />
                    <button className="btn btn-primary" onClick={sendMessage}>
                        Send
                    </button>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;