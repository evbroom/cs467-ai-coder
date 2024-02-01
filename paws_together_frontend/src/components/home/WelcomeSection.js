import { Link } from 'react-router-dom';

const WelcomeSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            alt="A cute cat is welcoming you to PawsTogether!"
            className="aspect-video overflow-hidden rounded-xl object-bottom lg:order-last lg:aspect-square"
            src={require('../../images/cat.jpg')}
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Find Your Purr-fect Match
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                At PawsTogether, we believe that every pet deserves a loving
                home. We connect pets with caring owners through our
                user-friendly platform. Browse our pet profiles, search using
                filters, and create an account to facilitate the adoption
                process. Our team is dedicated to helping you find your ideal
                furry companion.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="/browse-pets"
              >
                Browse Pets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
