import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const HomePage = () => {
  const catImageUrl =
    'https://images.pexels.com/photos/6631855/pexels-photo-6631855.jpeg?auto=compress&cs=tinysrgb&w=600';
  return (
    <section className="py-8 md:py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-0">
          <img
            alt="The img is from https://www.pexels.com/ credit to Mariam Antadze"
            className="w-4/5 aspect-sqaure rounded-xl"
            src={catImageUrl}
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="font-bold tracking-tighter sm:text-5xl">
                Find Your Purr-fect Match
              </h1>
              <p className="text-gray-500 md:text-xl">
                At PawsTogether, we believe that every pet deserves a loving
                home. We connect pets with caring owners through our
                user-friendly platform. Browse our pet profiles, search using
                filters, and create an account to facilitate the adoption
                process. Our team is dedicated to helping you find your ideal
                furry companion.
              </p>
            </div>
            <div>
              <Button as={Link} to="/browse-pets" variant="dark">
                Browse Pets
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomePage;
