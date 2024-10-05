import React from 'react'
import { useGlobalContext } from '../context/global'
import Card from './Popular-carousel/Card';
import './Homepage.css';
import TrendingView from './Popular-carousel/TrendingView';

export default function Homepage() {
    const { popularAnime, trendingAnime } = useGlobalContext();
    return (
        <>
        <div className="popular-anime">
            <div className="CarouselContainer">
                <Card anime={popularAnime} className="popular-card" />
                <TrendingView anime={trendingAnime}/>
            </div>
        </div>
        </>
    )
}


