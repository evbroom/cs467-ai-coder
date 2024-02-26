import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getPetProfiles } from '../../utils/api'; // Adjust the import path as needed

const HomePage = () => {
  const [petsWithNews, setPetsWithNews] = useState([]);
  const [error, setError] = useState('');
  const catImageUrl =
    'https://images.pexels.com/photos/6631855/pexels-photo-6631855.jpeg?auto=compress&cs=tinysrgb&w=600';

  useEffect(() => {
    console.log('petsWithNews type:', typeof petsWithNews);
    const loadPetsWithNews = async () => {
      try {
        const petsData = await getPetProfiles();
        // Assuming petsData is an object containing pets
        console.log('petsData:', petsData);
        // const petsArray = Object.values(petsData); // Extracting pet objects into an array
        // const filteredPets = petsArray.filter(pet => pet.news && pet.news.length > 0);
        // console.log('filteredPets:', filteredPets);
        // setPetsWithNews(filteredPets);
      } catch (err) {
        setError('Failed to fetch pets with news.');
      }
    };

    loadPetsWithNews();
  }, []);

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

        {/* Newsfeed Section */}
        <div className="newsfeed-section mt-12">
          <h2 className="text-2xl font-bold mb-4">Newsfeed</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petsWithNews.map((pet) => (
              <div key={pet.id} className="pet-news-item bg-white p-6 shadow rounded-lg">
                <img src={pet.picture_url} alt={`Picture of ${pet.type}`} className="w-full h-48 object-cover object-center rounded-lg mb-4" />
                {pet.news.map((newsItem, index) => (
                  <p key={index} className="text-gray-700 text-sm">{newsItem}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};
export default HomePage;
