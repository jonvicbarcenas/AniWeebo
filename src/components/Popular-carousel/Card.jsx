import React from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './style.css';

//* Material UI
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BlurIn from '../../../components/magicui/blur-in';
import BoxReveal from '../../../components/ui/box-reveal';


const Card = ({ anime }) => {
  return (
    <div className="w-full bg-gray-900 p-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper"
        loop={true} //* Add loop prop to enable looping
      >
        {anime.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative popular-card">
              <div className="image-container">
                <img
                  src={item.poster}
                  alt={item.name}
                  className="w-full h-[450px] object-cover rounded-lg"
                />
              </div>
              <div className="AnCon text-container absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="title">
                  <BlurIn word={item.name.length > 53 ? item.name.substring(0, 53) + '...' : item.name}/>
                </div>
                <div className="desc">
                  <BoxReveal duration={0.5} width="fit-content" boxColor="#5046e6">
                    <p>{item.description.length > 100 ? item.description.substring(0, 137) + '...' : item.description}</p>
                  </BoxReveal>
                </div>
                <div className="btn">
                  <div className="watch-btn">
                    <Button variant="contained" startIcon={<PlayArrowIcon />}>Watch Now</Button>
                  </div>
                  <div className="details">
                    <Link to={`/anime/${item.id}`} key={item.id}> {/*anime.id*/}
                      <Button variant="outlined">Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Card;