import React, { useState, useRef } from "react";

function News() {
  //   const API = "ff149af248d24ea889a83704b3ac7953";
  const API = "f568caf94d8638d32c70199d2739a69e";

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const progressRef = useRef(null);

  async function news_data() {
    setError(null);
    setArticles([]);
    setLoading(true);
    setProgress(5);

    // simulated loading progress
    progressRef.current = setInterval(() => {
      setProgress((p) =>
        p >= 90 ? 90 : p + Math.floor(Math.random() * 8) + 4
      );
    }, 350);

    try {
      //   const response = await fetch(
      //     `https://newsapi.org/v2/everything?q=technology&from=2025-11-13&sortBy=popularity&apiKey=${API}`
      //   );
      const response = await fetch(
        `https://api.mediastack.com/v1/news?access_key=${API}&countries=in`
      );
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      console.log(data);

      setArticles(data.data || []);

      // finish progress
      clearInterval(progressRef.current);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    } catch (err) {
      clearInterval(progressRef.current);
      setProgress(0);
      setLoading(false);
      setError(err.message);
    }
  }

  return (
    <div className="w-4xl ">
      {/* Top loading bar */}
      <div className="h-1 bg-gray-200 relative overflow-hidden rounded mb-5">
        <div
          className="h-1 bg-indigo-600 absolute top-0 left-0 transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-3">Latest News</h1>

        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={news_data}
            disabled={loading}
            className={`px-4 py-2 text-white rounded ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Loading..." : "Load News"}
          </button>

          <button
            onClick={() => {
              setArticles([]);
              setError(null);
            }}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Clear
          </button>

          <span className="ml-auto text-sm text-gray-500">
            {loading ? `Loading: ${progress}%` : `${articles.length} articles`}
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-600 text-sm mb-4">
            Error fetching news: {error}
          </div>
        )}

        {/* Articles UI */}
        <div className="space-y-4">
          {articles.length === 0 && !loading && !error && (
            <p className="text-gray-500 text-sm">No articles to display.</p>
          )}

          {articles.map((article, index) => (
            <div
              key={index}
              className=" border flex rounded p-4 bg-gray-50 hover:shadow-sm transition cursor-pointer"
             >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <img src={article.image} alt="image" className="mx-auto h-56 w-lg rounded-md drop-shadow-xs" />
                <h2 className="font-semibold">{article.title}</h2>
                <p className="text-xs text-gray-500 mt-1">
                  {article.source} •{" "}
                  {new Date(article.published_at).toLocaleString()}
                </p>
                {article.description && (
                  <p className="text-sm mt-2 text-gray-700">
                    {article.description}
                  </p>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
