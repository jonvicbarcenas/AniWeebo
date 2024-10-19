import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/global';
import Card from './Popular-carousel/Card';
import './Homepage.css';
import TrendingView from './Popular-carousel/TrendingView';
import Loader from './screens/Loader';

export default function Homepage() {
    const { popularAnime, trendingAnime } = useGlobalContext();
    const [loading, setLoading] = useState(true);

    // Add a delay of 2 seconds before showing the anime content
    useEffect(() => {
        const timer = setTimeout(() => {
            if (popularAnime && trendingAnime) {
                setLoading(false);
            }
        }, 900); 

        // Clean up the timer if the component unmounts
        return () => clearTimeout(timer);
    }, [popularAnime, trendingAnime]);

    return (
        <>
        <div className="popular-anime">
            <div className="CarouselContainer">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Card anime={popularAnime} className="popular-card" />
                        <TrendingView anime={trendingAnime} />
                    </>
                )}
            </div>
        </div>
        </>
    );
}
