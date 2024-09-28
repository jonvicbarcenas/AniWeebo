import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from '../context/global'
import DotPattern from '../../components/magicui/dot-pattern';
import BlurIn from '../../components/magicui/blur-in';
import Card from './Popular-carousel/Card';
import './Homepage.css';

export default function Homepage(rendered) {
    const {popularAnime, isSearch} = useGlobalContext();

    const conditionalRender = () => {
        if(!isSearch){
            return(
                <div className="CarouselContainer">
                    <Card anime={popularAnime} className="popular-card"/>
                    
                </div>
            )
            // return popularAnime?.map((anime) => {
            //      console.log(anime);
            //     // return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}> {/*anime.id*/}
            //     //     <img src={anime.images.jpg.large_image_url} alt={anime.title}/> {/*anime.poster*/} {/*anime.name*/}
            //     // </Link>

                
            //     // return <Link to={`/anime/${anime.id}`} key={anime.id}> {/*anime.id*/}
            //     //     <img src={anime.poster} alt={anime.name}/> {/*anime.poster*/} {/*anime.name*/}
            //     // </Link>
            // })
        }
    }
        

    return (
        <PopularStyled>
            <DotPattern className="DotPat"/>
            <div className="popular-anime">
                <div className="condittionalRender"></div>
                {conditionalRender()}
            </div>
        </PopularStyled>
    )
}

const PopularStyled = styled.div`
    .DotPat{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
    }
`;
