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
            <DotPattern />
            <div className="popular-anime">
            <h2>Popular</h2>
                {conditionalRender()}
            </div>
        </PopularStyled>
    )
}

const PopularStyled = styled.div`
    display: flex;
    .popular-anime{
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
