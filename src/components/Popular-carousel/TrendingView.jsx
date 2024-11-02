import React from 'react';
import './TrendingViewStyled.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; 
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';

export default function TrendingView({ anime }) {
  const loading = !anime || anime.length === 0;

  return (
    <>
      <div className="trending-anime">
        <h2 className='font-medium text-2xl text-blue-500'>Trendings</h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          breakpoints={{
            420: {
              slidesPerView: 2, // For small screens
            },
            768: {
              slidesPerView: 3, // For medium screens
            },
            1024: {
              slidesPerView: 5, // For larger screens
            },
            1280: {
              slidesPerView: 8, // For extra large screens
            },
          }}
          navigation
        >
          {loading ? (
            Array.from(new Array(8)).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="trendings">
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </div>
              </SwiperSlide>
            ))
          ) : (
            anime.map((item) => (
              <SwiperSlide key={item.name}>
                <div className="trendings">
                  <div className="trendings-content">
                    <Link to={`/anime/${item.id}`} key={item.id}>
                      <div className="trendings-overlay">
                        <p>{item.name}</p>
                        <div className='rankings'>
                          <span>{item.rank}</span>
                        </div>
                      </div>
                    </Link>
                    <img src={item.poster} alt={item.name} />
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </>
  );
}