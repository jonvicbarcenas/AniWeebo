import React, { useState } from 'react';

function SelectGenre() {
    const [expanded, setExpanded] = useState(false);

    const genres = [
        'Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons',
        'Drama', 'Test', 'Fantasy', 'Game', 'Harem', 'Historical',
        'Horror', 'Isekai', 'Josei', 'Kids', 'Magic', 'Martial Arts',
        'Mecha', 'Military', 'Music', 'Mystery', 'Parody', 'Police'
    ];

    const colors = [
        'text-green-300',
        'text-pink-300',
        'text-red-300',
        'text-gray-300',
        'text-emerald-300',
        'text-yellow-300'
    ];

    const getColor = (index) => colors[index % colors.length];

    const visibleGenres = expanded ? genres : genres.slice(0, 18);

    return (
        <>
            <div className='flex flex-col w-full mr-3'>
                <span className='pt-9 pb-2 font-medium text-2xl text-blue-500'>Genres</span>
                <div className="bg-gray-700 p-6 lg:max-w-md">
                    <div className="grid grid-cols-3 mb-4">
                        {visibleGenres.map((genre, index) => (
                            <button
                                key={index}
                                className={`${getColor(index)} rounded-none bg-transparent hover:bg-gray-600/50 transition-opacity text-left font-medium text-base truncate`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full py-2 text-gray-300 bg-gray-800 rounded hover:bg-blue-400 transition-colors text-sm focus:outline-none hover:outline-none"
                    >
                        Show {expanded ? 'less' : 'more'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SelectGenre;