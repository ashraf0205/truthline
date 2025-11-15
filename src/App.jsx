import { useState } from "react";
import Header from "./components/Header";
import InputPanel from "./components/InputPanel";
import Result from "./components/Result";
import Ledger from "./components/Ledger";
import Footer from "./components/Footer";
import News from "./components/News";
import "./App.css";



export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [vote, setVote] = useState(null);


  function fakeVerify(text) {
    setLoading(true);
    setResult(null);
    setVote(null);

    setTimeout(() => {
      const score = Math.floor(Math.random() * 61) + 20; // 20-80
      const verdict =
        score > 60
          ? "Likely True"
          : score > 40
          ? "Mixed / Needs Checks"
          : "Likely False";
      const claims = [
        "Claim: Important event occurred",
        "Claim: Organization X made a statement",
        "Claim: Image/video authenticity",
      ];
      const evidence = [
        { source: "Reuters", match: Math.random() > 0.4 },
        { source: "AP", match: Math.random() > 0.5 },
        { source: "FactCheck.org", match: Math.random() > 0.7 },
      ];

      const res = {
        score,
        verdict,
        claims,
        evidence,
        excerpt: typeof text === "string" ? text.slice(0, 280) : "",
        time: new Date().toLocaleString(),
      };
      const entry = {
        id: ledger.length + 1,
        title: verdict,
        score,
        time: res.time,
      };

      setResult(res);
      setLedger((prev) => [entry, ...prev].slice(0, 10));
      setLoading(false);
    }, 800 + Math.random() * 900);
  }

  function handleVerify(e) {
    e.preventDefault();
    if (!input.trim()) return;
    fakeVerify(input.trim());
  }

  function handleQuickTest() {
    const sample = "Breaking: Example company launches new product today.";
    setInput(sample);
    fakeVerify(sample);
  }

  function handleClear() {
    setInput("");
    setResult(null);
    setVote(null);
  }

  function handleVote(choice) {
    setVote(choice);
    setLedger((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      copy[0] = { ...copy[0], communityVote: choice };
      return copy;
    });
  }

  return (
    <div className="min-h-screen bg-blue-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <InputPanel
              input={input}
              setInput={setInput}
              onVerify={handleVerify}
              onQuickTest={handleQuickTest}
              onClear={handleClear}
              loading={loading}
            />

            <Result result={result} vote={vote} onVote={handleVote} />
          </div>

          <Ledger ledger={ledger} />
          <News />
        </div>

        <Footer />
      </div>
    </div>
  );
}
