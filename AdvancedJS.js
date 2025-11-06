import React, { useEffect, useRef, useState } from "react";

// Dummy FAQ data since no file loading
const FAQ_DATA = [
  { question: "What is the bond?", answer: "The bond covers any damage to the courtesy phone." },
  { question: "Warranty period?", answer: "Warranty is valid for 24 months from purchase date." },
  { question: "Service fees?", answer: "A service fee applies if your phone is out of warranty." },
  { question: "How to reset?", answer: "You can reset the phone via settings menu." },
  { question: "Contact support?", answer: "Contact support via email or phone." },
];

// Chatbot responses
const CHAT_RESPONSES = {
  bond: "The bond covers any damage to the courtesy phone.",
  warranty: "Warranty is valid for 24 months from purchase date.",
  service: "A service fee applies if your phone is out of warranty.",
  hello: "Hi there! How can I help you today?",
};

export default function Advanced() {
  // State for demo selection (1-5)
  const [demo, setDemo] = useState(1);

  // --- Demo 1: Address Autocomplete ---
  const addressRef = useRef(null);

  useEffect(() => {
    if (demo === 1) {
      if (window.google && window.google.maps && window.google.maps.places) {
        new window.google.maps.places.Autocomplete(addressRef.current);
      } else {
        // Optionally lazy load Google Maps API here or show a message
        console.warn("Google Places API not loaded - address autocomplete disabled.");
      }
    }
  }, [demo]);

  // --- Demo 2: Theme & Font Preference ---
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [fontSize, setFontSize] = useState(() => localStorage.getItem("fontSize") || "16px");

  useEffect(() => {
    document.body.className = theme;
    document.body.style.fontSize = fontSize;
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
  }, [theme, fontSize]);

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));
  const toggleFontSize = () => setFontSize(f => (f === "16px" ? "18px" : "16px"));

  // --- Demo 3: Drag & Drop ---
  const [selectedPhone, setSelectedPhone] = useState(null);
  const phones = ["Phone 1", "Phone 2", "Phone 3"];

  function onDragStart(e, phone) {
    e.dataTransfer.setData("text/plain", phone);
  }
  function onDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    setSelectedPhone(data);
  }
  function onDragOver(e) {
    e.preventDefault();
  }

  // --- Demo 4: FAQ Search ---
  const [faqSearch, setFaqSearch] = useState("");
  const filteredFaqs = FAQ_DATA.filter(faq =>
    faq.question.toLowerCase().includes(faqSearch.toLowerCase())
  );

  // --- Demo 5: Chatbot ---
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleChatSend = e => {
    if (e.key === "Enter" && chatInput.trim()) {
      const userMsg = chatInput.trim();
      const lower = userMsg.toLowerCase();
      const keyFound = Object.keys(CHAT_RESPONSES).find(key => lower.includes(key));
      const botReply = keyFound
        ? CHAT_RESPONSES[keyFound]
        : "Sorry, I’m not sure about that. Try asking about bond, warranty, or service.";

      setChatMessages(msgs => [...msgs, { from: "user", text: userMsg }, { from: "bot", text: botReply }]);
      setChatInput("");
    }
  };

  // --- Initialize All ---
  function initAll() {
    setDemo(1);
    setTheme(localStorage.getItem("theme") || "light");
    setFontSize(localStorage.getItem("fontSize") || "16px");
    setSelectedPhone(null);
    setFaqSearch("");
    setChatInput("");
    setChatMessages([]);
    alert("All features reset and initialized!");
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2>Advanced JS Extension React Demos</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <nav style={{ display: "flex", flexDirection: "column", minWidth: "140px" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setDemo(n)}
              style={{
                marginBottom: 8,
                backgroundColor: demo === n ? "#007bff" : "#e0e0e0",
                color: demo === n ? "#fff" : "#000",
                cursor: "pointer",
                padding: "8px",
                borderRadius: 4,
                border: "none",
              }}
            >
              {`Demo ${n}`}
            </button>
          ))}
          <button
            onClick={initAll}
            style={{
              marginTop: "auto",
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "8px",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
            }}
          >
            Initialize All
          </button>
        </nav>

        <section
          style={{
            flexGrow: 1,
            border: "1px solid #ccc",
            padding: 16,
            borderRadius: 6,
            backgroundColor: "#fafafa",
            minHeight: 400,
          }}
        >
          {/* Demo 1: Address Autocomplete */}
          {demo === 1 && (
            <>
              <h3>Address Autocomplete</h3>
              <input
                ref={addressRef}
                id="address"
                type="text"
                placeholder="Start typing address..."
                style={{
                  width: "100%",
                  maxWidth: 400,
                  padding: 8,
                  fontSize: 16,
                  borderRadius: 4,
                  border: "1px solid #999",
                }}
                autoComplete="off"
              />
              <p style={{ fontSize: 12, marginTop: 8, color: "#666" }}>
                * Requires Google Places API. Add script with your API key for full functionality.
              </p>
            </>
          )}

          {/* Demo 2: Theme & Font Preferences */}
          {demo === 2 && (
            <>
              <h3>Theme & Font Preferences</h3>
              <p>
                Current theme: <b>{theme}</b>, Font size: <b>{fontSize}</b>
              </p>
              <button onClick={toggleTheme} style={{ marginRight: 12, padding: "8px 12px" }}>
                Toggle Theme
              </button>
              <button onClick={toggleFontSize} style={{ padding: "8px 12px" }}>
                Toggle Font Size
              </button>
            </>
          )}

          {/* Demo 3: Drag & Drop */}
          {demo === 3 && (
            <>
              <h3>Drag & Drop - Select a Courtesy Phone</h3>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <ul
                  id="phoneList"
                  style={{
                    listStyle: "none",
                    paddingLeft: 0,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    width: 140,
                    minHeight: 100,
                    backgroundColor: "#fff",
                  }}
                >
                  {phones.map((phone) => (
                    <li
                      key={phone}
                      draggable
                      onDragStart={(e) => onDragStart(e, phone)}
                      style={{
                        cursor: "grab",
                        userSelect: "none",
                        padding: 8,
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {phone}
                    </li>
                  ))}
                </ul>
                <div
                  id="selectedPhone"
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  style={{
                    flexGrow: 1,
                    border: "2px dashed #999",
                    height: 100,
                    borderRadius: 6,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selectedPhone ? "#d4edda" : "#f8f9fa",
                    fontWeight: "bold",
                    color: selectedPhone ? "#155724" : "#6c757d",
                  }}
                >
                  {selectedPhone ? `Selected: ${selectedPhone}` : "Drop selected phone here"}
                </div>
              </div>
            </>
          )}

          {/* Demo 4: FAQ Search */}
          {demo === 4 && (
            <>
              <h3>FAQ Search</h3>
              <input
                type="text"
                placeholder="Search FAQ..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                style={{
                  width: "100%",
                  maxWidth: 400,
                  padding: 8,
                  fontSize: 16,
                  borderRadius: 4,
                  border: "1px solid #999",
                  marginBottom: 12,
                }}
              />
              <div
                id="faqList"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  maxHeight: 180,
                  overflowY: "auto",
                  padding: 8,
                  backgroundColor: "#fff",
                }}
              >
                {filteredFaqs.length ? (
                  filteredFaqs.map(({ question, answer }, idx) => (
                    <div key={idx} className="faq-item" style={{ marginBottom: 12 }}>
                      <strong>{question}</strong>
                      <p style={{ marginTop: 4 }}>{answer}</p>
                    </div>
                  ))
                ) : (
                  <p>No FAQs matched your search.</p>
                )}
              </div>
            </>
          )}

          {/* Demo 5: Chatbot */}
          {demo === 5 && (
            <>
              <h3>Chatbot / Help Assistant</h3>
              <div
                id="chatMessages"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  height: 180,
                  padding: 10,
                  overflowY: "auto",
                  backgroundColor: "#fff",
                  marginBottom: 8,
                  fontSize: 14,
                  lineHeight: "1.4em",
                }}
              >
                {chatMessages.length === 0 ? (
                  <p style={{ color: "#666" }}>Ask me about bond, warranty, or service...</p>
                ) : (
                  chatMessages.map((msg, i) => (
                    <p
                      key={i}
                      style={{
                        textAlign: msg.from === "user" ? "right" : "left",
                        margin: "6px 0",
                      }}
                    >
                      <b>{msg.from === "user" ? "You" : "Bot"}:</b> {msg.text}
                    </p>
                  ))
                )}
              </div>
              <input
                id="chatInput"
                type="text"
                placeholder="Type message and press Enter"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleChatSend}
                style={{
                  width: "100%",
                  maxWidth: 400,
                  padding: 8,
                  fontSize: 16,
                  borderRadius: 4,
                  border: "1px solid #999",
                }}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
