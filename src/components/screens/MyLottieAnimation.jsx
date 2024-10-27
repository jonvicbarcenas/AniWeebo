import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/catto.json';

const MyLottieAnimation = () => {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default MyLottieAnimation;