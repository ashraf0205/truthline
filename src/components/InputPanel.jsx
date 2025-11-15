import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

function InputPanel({
  input,
  setInput,
  onVerify,
  // onQuickTest,
  onClear,
  loading,
}) {
  const API = "AIzaSyDczbO_tGVjz6LV5O-BCQDuXXf3IQUX8fU";
  const ai = new GoogleGenAI({ apiKey: API });
  const [aioutput, setaiouput] = useState("");
  async function main(text) {
    const prompt = { text };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log(response.text);
    return response.text;
  }

  function handleAi(e) {
    e.preventDefault();
    console.log(input);
    setaiouput(main(input));
  }
  return (
    <section className="bg-white p-4 rounded-lg shadow-sm">
      <form onSubmit={onVerify}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paste URL or text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="https://news.site/article or paste the claim here"
        />

        <div className="flex items-center gap-3 mt-3">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Checking..." : "Verify"}
          </button>

          <button
            type="button"
            className="px-3 py-2 border rounded-md text-sm"
            onClick={handleAi}
          >
            Quick test with Ai
          </button>

          <button
            type="button"
            className="px-3 py-2 border rounded-md text-sm"
            onClick={onClear}
          >
            Clear
          </button>

          <div className="ml-auto text-xs text-gray-500">
            Simulated AI + ledger
          </div>
        </div>
        <div className="my-9">{aioutput}</div>
      </form>
    </section>
  );
}

export default InputPanel;
