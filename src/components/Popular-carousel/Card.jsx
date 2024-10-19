import React from 'react';
import { Link } from 'react-router-dom';
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
import { Skeleton } from '@mui/material';

import { useToast } from '../../context/ToastContext'; //remove this line if not needed

const Card = ({ anime }) => {
  const loading = !anime || anime.length === 0;

  const { showToast } = useToast(); //remove this line if not needed

  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper"
        loop={true} //* Add loop prop to enable looping
      >
        {loading ? (
          Array.from(new Array(5)).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="popular-card">
                <div className="image-container">
                  <Skeleton variant="rectangular" width="100%" height={200} />
                </div>
                <div className="AnCon text-container">
                  <Skeleton width="60%" />
                  <Skeleton width="80%" />
                  <Skeleton width="40%" />
                  <Skeleton width="30%" />
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          anime.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="popular-card">
                <div className="image-container">
                  <img
                    src={item.poster}
                    alt={item.name}
                  />
                </div>
                <div className="AnCon text-container">
                  <div className="spotlight">
                    <BoxReveal duration={0.5} width="fit-content" boxColor="#5046e6">
                      <p>#{item.rank} Spotlight</p>
                    </BoxReveal>
                  </div>
                  <div className="title">
                    <BlurIn className="font-extrabold text-xs" word={item.name.length > 53 ? item.name.substring(0, 53) + '...' : item.name}/>
                  </div>
                  <div className="desc">
                    <BoxReveal duration={0.5} width="fit-content" boxColor="#5046e6">
                      <p>{item.description.length > 250 ? item.description.substring(0, 250) + '...' : item.description}</p>
                    </BoxReveal>
                  </div>
                  <div className="btn">
                    <div className="watch-btn">
                      <Button variant="contained" onClick={() => showToast('>///< to be implemented!⚙️🔨\n use details button for naw', 'error')} startIcon={<PlayArrowIcon />}>Watch Now</Button>
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
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Card;