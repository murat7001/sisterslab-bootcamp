import React, { useCallback } from 'react'
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import DetailsIcon from '@mui/icons-material/Details';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    Stack,
    TextField,
    IconButton,
    Skeleton,
} from '@mui/material';
import { fetchCharacters } from '../api';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Pokemon() {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setselectedPokemon] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const getCharacters = async () => {
        const pokemons = await fetchCharacters();
        setPokemons(pokemons);
        setselectedPokemon(pokemons);
    };
    const router = useRouter();

    useEffect(() => {
        getCharacters();
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const handlePokemonSelect = useCallback((e) => {
        setselectedPokemon(pokemons.filter((pokemon) => String(pokemon.name).toLowerCase().includes(e.target.value)));
    }, [pokemons]);

    const handleDetailsClick = (id) => {
        router.push(`/pokemon/${id}`);
    };

    const handleFavoriteToggle = (id) => {
        const newFavorites = favorites.includes(id)
            ? favorites.filter((favoriteId) => favoriteId !== id)
            : [...favorites, id];

        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };


    const isFavorite = (id) => favorites.includes(id);

    return (
        <Stack sx={{ alignItems: 'center' }} spacing={2}>
            <Button sx={{ margin: '30px' }} size="small" variant="contained" onClick={() => router.push('/favorites')}>Favorites</Button>
            <TextField id="outlined-basic" label="Search" variant="outlined"
                onChange={handlePokemonSelect}
                sx={{ width: 300 }}
                size="small"
            />
            <Stack
                spacing={{ xs: 2, sm: 4 }}
                direction="row"
                useFlexGap
                justifyContent={'space-around'}
                flexWrap="wrap"
            >
                {selectedPokemon.map((pokemon, index) => (
                    <Card variant="outlined" key={index} sx={{ width: '250px', height: '150px', textAlign: 'center' }}>
                        <CardContent>
                            {pokemon ? (<Typography variant="h5" component="div">
                                {pokemon.name.toUpperCase()}
                            </Typography>) : (<Skeleton variant="text" sx={{ fontSize: '1rem' }} />)
                            }
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            {pokemon ? (<Button sx={{ marginTop: '20px' }} onClick={() => handleDetailsClick(pokemon.id)} size="small" variant="contained" endIcon={<DetailsIcon />}>
                                Details
                            </Button>) : (<Skeleton sx={{ marginTop: '20px' }} variant="rounded" width={100} height={30} />)}
                            {pokemon ? (<FavoriteIcon sx={{ marginTop: '20px' }}
                                onClick={() => handleFavoriteToggle(pokemon.id)}
                                color={isFavorite(pokemon.id) ? 'error' : 'disabled'}
                            />) : (<Skeleton sx={{ marginTop: '20px' }} variant="circular" width={40} height={40} />)}
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Stack>
    );
};
export default Pokemon