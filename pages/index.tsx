import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [feed, setFeed] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nutanbhogendrasharma/")
      .then(res => res.json())
      .then((data) => {
        setIsLoaded(true);
        setFeed(data.feed);
        setBlogs(data.items);
      }, (error) => { setIsLoaded(true); setError(error); })
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (<div className={styles.container}>
      <h1>{feed.title}</h1>
      {blogs.map(item => (<div className={styles.main}>
        <div> <img src={item.thumbnail}
          width='150px' height='150px' />
        </div>
        <div> <a href={item.link}
          target="_blank">{item.title}</a>
        </div>
      </div>))}
    </div>);
  }
}