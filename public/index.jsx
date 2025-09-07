import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const emojis = ["😃", "😊", "😎", "🤩", "😍"];

function App() {
  const [votes, setVotes] = useState(() => {
    const saved = localStorage.getItem("votes");
    return saved ? JSON.parse(saved) : Array(emojis.length).fill(0);
  });

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
  }, [votes]);

  const addVote = (index) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };

  const clearVotes = () => {
    setVotes(Array(emojis.length).fill(0));
    localStorage.removeItem("votes");
  };

  const maxVotes = Math.max(...votes);
  const winnerIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h2>Голосування</h2>

      <div>
        {emojis.map((emoji, i) => (
          <button
            key={i}
            onClick={() => addVote(i)}
            style={{ fontSize: "2rem", margin: "10px" }}
          >
            {emoji} ({votes[i]})
          </button>
        ))}
      </div>

      <button onClick={clearVotes}>Очистити результати</button>

      <h3>Results:</h3>
      {maxVotes > 0 && (
        <p>
          Winner: {emojis[winnerIndex]} (Votes: {maxVotes})
        </p>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);