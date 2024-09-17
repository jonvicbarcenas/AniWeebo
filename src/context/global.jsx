import React, { createContext, useContext, useEffect, useReducer} from 'react'

const GlobalContext = createContext();

// const baseUrl = 'https://api.jikan.moe/v4'
const baseUrl = 'https://aniweebu-api.onrender.com'

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

// reducer
const reducer = (state, action) => {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_POPULAR_ANIME:
            return {...state, popularAnime: action.payload, loading: false}
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
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],  
        isSearch: false,
        searchResults: [],
        loading: false,

    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // // fetch popular anime
    // const gethPopularAnime = async () => {
    //     dispatch({type: LOADING})
    //     const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`)//anime/home
    //     const data = await response.json();
    //     // console.log(data.data)
    //     dispatch({type: 'GET_POPULAR_ANIME', payload: data.data}) //data.spotlightAnimes
    // }

        // fetch popular anime
        const gethPopularAnime = async () => {
            dispatch({type: LOADING})
            const response = await fetch(`${baseUrl}/anime/home`)
            const data = await response.json();
            // console.log(data.data)
            dispatch({type: 'GET_POPULAR_ANIME', payload: data.spotlightAnimes}) 
        }




    //initial render
    useEffect(() => {
        gethPopularAnime()
    }, [])



    return (
        <GlobalContext.Provider value={{
            ...state
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}