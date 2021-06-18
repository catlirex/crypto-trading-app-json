import { useEffect, useState } from "react";
import { STATUS_UPDATES } from "../constants";
import NewsCard from "./NewsCard";

function NewsFeedList() {
  const [newsFeeds, setNewsFeed] = useState([]);

  useEffect(() => {
    fetch(STATUS_UPDATES)
      .then((resp) => resp.json())
      .then((data) => setNewsFeed(data.status_updates));
  }, []);

  return (
    <ul className="newsfeed">
      {newsFeeds.map((item, index) => (
        <NewsCard newsItem={item} key={index} index={index} />
      ))}
    </ul>
  );
}

export default NewsFeedList;
