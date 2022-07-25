import logo from "./globe.png";
import "./App.css";
import "./components/card.jsx";
import PromptCard from "./components/card";

function App() {
  const card = [
    {
      id: 1,
      question: "Afghanistan",
      lowerCase: "afghanistan",
      flag: "🇦🇫",
      answer: "Kabul",
    },
    {
      id: 2,
      question: "Azerbaijan",
      lowerCase: "azerbaijan",
      flag: "🇦🇿",
      answer: "Tirana",
    },
    {
      id: 3,
      question: "Algeria",
      lowerCase: "algeria",
      flag: "🇩🇿",
      answer: "Algiers",
    },
    {
      id: 4,
      question: "Andorra",
      lowerCase: "andorra",
      flag: "🇦🇩",
      answer: "Andorra la Vella",
    },
    {
      id: 5,
      question: "Bahamas",
      lowerCase: "bahamas-the",
      flag: "🇧🇸",
      answer: "Nassau",
    },
  ];

  const cardid = Math.floor(Math.random() * card.length);

  return (
    <div className="App">
      <header className="bg-white App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PromptCard card={card} />
      </header>
    </div>
  );
}

export default App;
