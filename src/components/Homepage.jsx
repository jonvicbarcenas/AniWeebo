import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from '../context/global'
import DotPattern from '../../components/magicui/dot-pattern';

export default function Homepage(rendered) {
    const {popularAnime, isSearch} = useGlobalContext();

    const conditionalRender = () => {
        if(!isSearch){
            return popularAnime?.map((anime) => {
                 console.log(anime);
                // return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}> {/*anime.id*/}
                //     <img src={anime.images.jpg.large_image_url} alt={anime.title}/> {/*anime.poster*/} {/*anime.name*/}
                // </Link>

                
                return <Link to={`/anime/${anime.id}`} key={anime.id}> {/*anime.id*/}
                    <img src={anime.poster} alt={anime.name}/> {/*anime.poster*/} {/*anime.name*/}
                </Link>
            })
        }
    }
        

    return (
        <PopularStyled>
            <DotPattern className="DotPat"/>
            <div className="popular-anime">
                <div className="Popular">
                    <h2>Popular Anime</h2>
                </div>
                <div className="condittionalRender"></div>
                {conditionalRender()}
            </div>
        </PopularStyled>
    )
}

const PopularStyled = styled.div`
    display: flex;
    .DotPat{
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
    }
    .popular-anime{
        flex-direction: row;
        padding-top: 1rem;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));    
        display: flex;
        a{
            height: 350px;
            width: 200px;
            border-radius: 7px;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 7px;
            
        }
    }
`;
