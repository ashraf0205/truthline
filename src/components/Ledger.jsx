function Ledger({ ledger }) {
  return (
    <aside className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium">Ledger (mock)</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {ledger.length === 0 && (
          <li className="text-gray-500">No entries yet — run a test</li>
        )}
        {ledger.map((item) => (
          <li key={item.id} className="border p-2 rounded-md">
            <div className="flex justify-between items-baseline">
              <div className="font-medium">
                #{item.id} — {item.title}
              </div>
              <div className="font-mono text-sm">{item.score}</div>
            </div>
            <div className="text-xs text-gray-500">{item.time}</div>
            {item.communityVote && (
              <div className="text-xs mt-1">
                Community: {item.communityVote}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 text-xs text-gray-600">
        This is a frontend-only demo. Replace fakeVerify with real API calls and
        store ledger entries on-chain or in a backend.
      </div>
    </aside>
  );
}

export default Ledger