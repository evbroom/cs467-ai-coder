const NewsCard = ({ news }) => {
  return (
    <div className="flex">
      <img className="inline" src={news.image} alt={news.title} />
      <div className="flex flex-col mx-4">
        <h2 className="m-0">{news.title}</h2>
        <p className="m-0">{news.publicationDate}</p>
        <p>{news.description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
