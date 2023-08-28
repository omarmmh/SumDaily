import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Back = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const GNEWS_API_KEY = '79c2a99ae6a822a756dbaa31641408e2'; 

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
  
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  
    // Fetch top headlines from the GNews API.
    fetch(`https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=${GNEWS_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.code === 'error') {
          console.error(data.message); // Log the error message
        } else {
          // Handle the successful data fetch
          setNewsArticles(data.articles);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the data:", error);
      });
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        {/* The URL Input section */}
        <form
          className='relative flex justify-center items-center neumorphic-input'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='input-icon'
          />
          <input
            type='url'
            placeholder='Paste the article link...'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='url_input peer modern-input'
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 modern-submit-btn'
          >
            <p style={{ color: "#000" }}>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>

        {/* Display Today's News */}
        <h3 className="font-satoshi font-bold text-gray-600 text-xl">Today's <span style={{ color: '#FF2400' }}> News:</span></h3>
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {newsArticles.slice(0, 10).map((news, index) => (
            <div
              key={`news-${index}`}
              onClick={() => setArticle({ url: news.url, summary: "" })}
              className='link_card'
            >
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {news.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Oops, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span style={{ color: '#FF2400' }}>Summary:</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Back;