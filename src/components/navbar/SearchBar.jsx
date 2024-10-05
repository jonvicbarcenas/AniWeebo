import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Autocomplete, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from '../../context/global';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
    const { handleSubmit, searchAnime, searchResults } = useGlobalContext();
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [value, setValue] = useState(null);

    // Ensure searchResults is always an array of objects with name and id
    const results = searchResults.map((result) => ({ 
        name: result.name || 'Untitled', 
        id: result.id 
    }));

    const handleOptionSelect = (event, newValue) => {
      if (newValue && newValue.id) {
        navigate(`/anime/${newValue.id}`);
        setValue(null);
        setInputValue('');
      }
    };

    // Function to handle input change
    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    // Memoized search function
    const debouncedSearch = useCallback(
        async (query) => {
            if (query.trim()) {
                setLoading(true);
                await searchAnime(query);
                setLoading(false);
            }
        },
        [searchAnime]
    );

    // Effect to handle search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            debouncedSearch(inputValue);
        }, 500); // Debounce for 500ms

        return () => clearTimeout(timeoutId);
    }, [inputValue, debouncedSearch]);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
        }}>
            <Autocomplete
                freeSolo
                options={results}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onChange={handleOptionSelect}
                loading={loading}
                value={value}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder='Search...'
                        variant="outlined"
                        fullWidth
                        className="search-bar custom-search-bar"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {params.InputProps.endAdornment}
                                    <InputAdornment position="end">
                                        <IconButton type="submit" aria-label="search">
                                            <SearchIcon className='search-icon' />
                                        </IconButton>
                                    </InputAdornment>
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
                noOptionsText={loading ? 'Loading...' : 'No options'}
            />
        </form>
    );
};

export default SearchBar;