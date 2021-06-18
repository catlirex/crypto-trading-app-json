function NewsLink({ url }) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {url}
    </a>
  );
}

export default function NewsCard({ newsItem: { description }, index }) {
  return (
    <article className="newsfeed__card">
      <p>
        {description
          .substring(0, 200)
          .split(/(https?:\/\/.*\b\/?)/g)
          .map((match, i) =>
            /https?/.test(match) ? (
              <NewsLink key={index + i} url={match} />
            ) : (
              match
            )
          )}
      </p>
    </article>
  );
}
