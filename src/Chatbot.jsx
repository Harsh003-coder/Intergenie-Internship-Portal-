import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const chatbotResponses = {
  greetings: ["Hello! I'm your Intergenie assistant. How can I help you today?", "Hi there! Looking for jobs, internships, or courses?"],
  fallback: ["I'm not quite sure I understand. Could you rephrase?", "I'm still learning! Try asking about jobs, internships, courses, or career paths."],
  keywords: {
    "job": "We have a curated list of trending tech jobs. Head over to the Jobs tab or try our Advanced Search to find roles matching your skills!",
    "internship": "Looking for entry-level experience? Check out the Internships tab for the latest openings from top companies.",
    "course": "Upskilling is essential! We have top-rated courses listed. You can find them in the Courses tab.",
    "career": "Not sure which path to take? Our Career Finder analyzes your grades and skills to recommend the best roles for you.",
    "skill": "Adding skills to our Advanced Search filter can help you find jobs perfectly tailored for you.",
    "help": "I can help you navigate Intergenie! Ask me about jobs, internships, courses, or how to use the Career Finder."
  }
};

const predefinedQueries = [
  "Find a tech job",
  "Looking for internships",
  "Career advice",
  "Upskill with courses"
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: chatbotResponses.greetings[0] }]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate bot thinking
    setTimeout(() => {
      let botResponse = chatbotResponses.fallback[Math.floor(Math.random() * chatbotResponses.fallback.length)];
      const lowerText = text.toLowerCase();
      
      // Basic keyword matching
      for (const [key, response] of Object.entries(chatbotResponses.keywords)) {
        if (lowerText.includes(key)) {
          botResponse = response;
          break;
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(inputText);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Floating Action Button */}
      {!isOpen && (
        <button className="chat-fab hover-lift" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window slide-up">
          <div className="chat-header">
            <h4>Intergenie Assistant</h4>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble-container ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
                <div className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length < 3 && (
            <div className="chat-suggestions">
              {predefinedQueries.map((query, idx) => (
                <button key={idx} className="suggestion-btn" onClick={() => handleSend(query)}>
                  {query}
                </button>
              ))}
            </div>
          )}

          <div className="chat-footer">
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="send-btn" onClick={() => handleSend(inputText)}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
