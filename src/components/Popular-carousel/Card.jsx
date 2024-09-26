import React from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const Card = ({ anime }) => {
  return (
    <div className="w-full bg-gray-900 p-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper"
      >
        {anime.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative">
            <Link to={`/anime/${item.id}`} key={item.id}> {/*anime.id*/}
              <img
                src={item.poster}
                alt={item.name}
                className="w-full h-[450px] object-cover rounded-lg"
              />
              </Link>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white text-lg font-semibold">{item.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Card;