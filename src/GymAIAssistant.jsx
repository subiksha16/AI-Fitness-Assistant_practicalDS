import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react'; // Assuming you have these icons

const GymAIAssistant = ({ showAIAssistant, setShowAIAssistant }) => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: "Hi! I'm your AI fitness assistant. Ask me about workouts, form tips, substitutions, or equipment alternatives!", sources: [] }
  ]);
  const [chatMessage, setChatMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!chatMessage.trim() || loading) return;

    // Add user message
    const userMessage = { id: Date.now(), role: 'user', content: chatMessage };
    setMessages(prev => [...prev, userMessage]);
    const tempMessageId = Date.now() + 1;
    
    // Add loading message
    setMessages(prev => [...prev, { id: tempMessageId, role: 'assistant', content: '', sources: [], loading: true }]);
    setLoading(true);
    setChatMessage('');

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (!response.ok) throw new Error('Backend not running');

      const data = await response.json();
      
      // Replace loading message
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessageId 
          ? { ...msg, content: data.answer, sources: data.sources, loading: false }
          : msg
      ));
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessageId 
          ? { ...msg, content: "Error: Make sure backend is running on localhost:8000 (uvicorn app:app --port 8000)", sources: [], loading: false }
          : msg
      ));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!showAIAssistant) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 max-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-lg">Gym AI Coach</h3>
            <p className="text-xs text-emerald-400 font-medium">RAG-Powered Workouts</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAIAssistant(false)} 
          className="p-1.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-all text-slate-400 hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 h-80 overflow-y-auto bg-gradient-to-b from-slate-900/90 to-slate-950/50 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${message.role === 'user' 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
              : 'bg-slate-800/70 border border-slate-700/50 text-slate-200'
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              
              {message.loading && (
                <div className="flex items-center space-x-1 mt-2 pt-2 border-t border-slate-600/50">
                  <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                  <span className="text-xs text-slate-500">Thinking...</span>
                </div>
              )}
              
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-600/50">
                  <p className="text-xs text-emerald-400 font-semibold mb-1">Sources:</p>
                  <div className="space-y-1">
                    {message.sources.map((source, i) => (
                      <div key={i} className="text-xs bg-emerald-500/20 p-1.5 rounded border border-emerald-500/30">
                        <span className="font-medium">{source.exercise}</span>
                        <span className="text-emerald-300 ml-1">({source.body_part})</span>
                        {source.equipment !== 'Bodyweight' && (
                          <span className="text-slate-400 ml-1">• {source.equipment}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask: 'chest exercises for beginners' or 'biceps no equipment'..."
            disabled={loading}
            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !chatMessage.trim()}
            className={`p-3 rounded-xl transition-all flex items-center justify-center ${
              loading || !chatMessage.trim()
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25'
            }`}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-1 text-center">
          Powered by local RAG • 100% private
        </p>
      </div>
    </div>
  );
};

export default GymAIAssistant;