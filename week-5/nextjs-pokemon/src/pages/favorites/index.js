import React, { useEffect, useState } from 'react'
import { fetchCharacters } from '../api';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    Stack,
} from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from "next/router";


function Favorites() {
    const [pokemons, setPokemons] = useState([])
    const [favorites, setFavorites] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getPokemons();
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const handleDetailsClick = (id) => {
        router.push(`/pokemon/${id}`);
    };

    const getPokemons = async () => {
        const pokemons = await fetchCharacters();
        setPokemons(pokemons);
    };

    const favoritePokemons = pokemons.filter((pokemon) =>
        favorites.includes(pokemon.id)
    );
    const isFavorite = (id) => favorites.includes(id);

    const handleFavoriteToggle = (id) => {
        const newFavorites = favorites.includes(id)
            ? favorites.filter((favoriteId) => favoriteId !== id)
            : [...favorites, id];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };
    return (
        <Stack sx={{ alignItems: 'center' }} spacing={2}>
            <Button  size="small" variant="contained" onClick={() => router.push('/')}>Home</Button>
            <Stack
                spacing={{ xs: 2, sm: 4 }}
                direction="row"
                useFlexGap
                justifyContent={'space-around'}
                flexWrap="wrap"
            >
                {favoritePokemons.map((pokemon, index) => (
                    <Card variant="outlined" key={index} sx={{ width: '250px', height: '150px', textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {pokemon.name.toUpperCase()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button sx={{ margin: '20px auto 0 auto' }} onClick={() => handleDetailsClick(pokemon.id)} size="small" variant="contained" endIcon={<DetailsIcon />}>
                                Details
                            </Button>
                            <FavoriteIcon
                                onClick={() => handleFavoriteToggle(pokemon.id)}
                                color={isFavorite(pokemon.id) ? 'error' : 'action'}
                            />
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Stack>
    )
}

export default Favorites
