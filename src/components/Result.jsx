

function Result({ result, vote, onVote }) {
  if (!result) return null;

  return (
    <section className="mt-5 bg-white p-4 rounded-lg shadow-sm border-t pt-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">{result.verdict}</h2>
          <p className="text-sm text-gray-600">
            Score: <span className="font-mono">{result.score}</span>
          </p>
          <p className="text-xs text-gray-500">Analyzed: {result.time}</p>
        </div>
        <div className="text-right max-w-xs">
          <div className="text-xs text-gray-600">Excerpt</div>
          <div className="mt-1 text-sm text-gray-800 break-words">
            {result.excerpt}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-sm mb-2">Claims</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {result.claims.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-sm mb-2">Evidence</h3>
          <ul className="text-sm text-gray-700">
            {result.evidence.map((e, i) => (
              <li key={i} className="flex justify-between">
                <span>{e.source}</span>
                <span
                  className={`font-mono ${
                    e.match ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {e.match ? "Match" : "No match"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="text-sm">Community vote:</div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md border ${
              vote === "true" ? "bg-green-50" : ""
            }`}
            onClick={() => onVote("true")}
          >
            True
          </button>
          <button
            className={`px-3 py-1 rounded-md border ${
              vote === "mixed" ? "bg-yellow-50" : ""
            }`}
            onClick={() => onVote("mixed")}
          >
            Mixed
          </button>
          <button
            className={`px-3 py-1 rounded-md border ${
              vote === "false" ? "bg-red-50" : ""
            }`}
            onClick={() => onVote("false")}
          >
            False
          </button>
        </div>
        {vote && (
          <div className="ml-auto text-sm text-gray-600">
            You voted: <strong>{vote}</strong>
          </div>
        )}
      </div>
    </section>
  );
}


export default Result