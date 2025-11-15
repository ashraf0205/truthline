

function InputPanel({
  input,
  setInput,
  onVerify,
  onQuickTest,
  onClear,
  loading,
}) {
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
            onClick={onQuickTest}
          >
            Quick test
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
      </form>
    </section>
  );
}

export default InputPanel;
