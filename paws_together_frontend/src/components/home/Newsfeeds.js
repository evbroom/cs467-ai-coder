import NewsCard from './NewsCard';

const Newsfeeds = () => {
  // TODO: Replace dummy data with real data from the backend
  const dummyString50chrs =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';

  const dummyNews = [
    {
      title: 'Article Title',
      image: 'https://via.placeholder.com/150',
      publicationDate: '2021-09-01',
      description: dummyString50chrs,
    },
    {
      title: 'Article Title',
      image: 'https://via.placeholder.com/150',
      publicationDate: '2021-09-01',
      description: 'Description',
    },
    {
      title: 'Article Title',
      image: 'https://via.placeholder.com/150',
      publicationDate: '2021-09-01',
      description: 'Description',
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-3">
          {dummyNews.map((news, index) => {
            return <NewsCard key={index} news={news} />;
          })}
        </div>
      </div>
    </section>
  );
};
export default Newsfeeds;
