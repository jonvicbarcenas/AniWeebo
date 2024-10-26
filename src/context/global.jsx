import React, { createContext, useContext, useEffect, useReducer, useState} from 'react'

const GlobalContext = createContext();

const baseUrl = 'https://jvbarcenas.tech/api/v2'

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_TRENDING_ANIME = "GET_TRENDING_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

// reducer
const reducer = (state, action) => {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_POPULAR_ANIME:
            return {...state, popularAnime: action.payload, loading: false}
        case GET_TRENDING_ANIME:
            return {...state, trendingAnime: action.payload, loading: false}
        case GET_UPCOMING_ANIME:
            return {...state, upcomingAnime: action.payload, loading: false}
        case GET_AIRING_ANIME:
            return {...state, airingAnime: action.payload, loading: false}
        case SEARCH:
            return {...state, searchResults: action.payload, isSearch: true}
        default:
            return state;
    }
}


export const GlobalContextProvider = ({children}) => {

    // initial state
    const initialState = {
        popularAnime: [],
        trendingAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],  
        isSearch: false,
        searchResults: [],
        loading: false,

    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        if (e && e.target) {
            setSearch(e.target.value);
            console.log(e.target.value);
        } else {
            console.warn("handleChange received an invalid event.");
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(search)
        if(search){
            searchAnime(search)
        }
        
    }

        //TODO search anime
        const searchAnime = async (anime) => {
            dispatch({type: LOADING})
            const response = await fetch(`${baseUrl}/hianime/search?q=${anime}`)
            const result = await response.json();
            const data = result.data;
            dispatch({type: SEARCH, payload: data.animes}) 
        }
        
        const gethPopularAnime = async () => {
            dispatch({type: LOADING})
            const response = await fetch(`${baseUrl}/hianime/home`)
            const result = await response.json();
            const data = result.data;
            dispatch({type: 'GET_POPULAR_ANIME', payload: data.spotlightAnimes}) 
        }
        
        const getTrendingAnime = async () => {
            dispatch({type: LOADING})
            const response = await fetch(`${baseUrl}/hianime/home`);
            const result = await response.json();
            const data = result.data; // Extract the data object
            dispatch({type: GET_TRENDING_ANIME, payload: data.trendingAnimes});
        } 
          


    //initial render
    useEffect(() => {
        gethPopularAnime()
        getTrendingAnime()
    }, [])



    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}