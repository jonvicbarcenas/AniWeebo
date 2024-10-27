import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/global';
import Card from './Popular-carousel/Card';
import './Homepage.css';
import TrendingView from './Popular-carousel/TrendingView';
import Loader from './screens/Loader';
import ScheduleComponent from './Schedule/Schedule';
import ContinueWatching from './ContinueWatching/ContinueWatching';

export default function Homepage() {
    const { popularAnime, trendingAnime } = useGlobalContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (Array.isArray(popularAnime) && popularAnime.length > 0 && Array.isArray(trendingAnime) && trendingAnime.length > 0) {
                setLoading(false);
            }
        }, 100);
    
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
                        <ScheduleComponent/>
                        <ContinueWatching/>
                    </>
                )}
            </div>
        </div>
        </>
    );
}
