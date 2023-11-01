import React, { useEffect, useState } from 'react';
import { fetchCharacter } from '../api';
import { useRouter } from 'next/router';
import { Stack, Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    const getCharacter = async () => {
      if (name) {
        try {
          const fetchedPokemon = await fetchCharacter(name);
          setPokemon(fetchedPokemon);
        } catch (error) {
          console.error('Pokemon detayları getirilirken bir hata oluştu:', error);
        }
      }
    };

    getCharacter();
  }, [name]);

  if (!pokemon) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ marginTop: '150px' }}
    >
      <Card sx={{ width: '200px',  }}>
        <CardMedia
          component="img"
          alt={pokemon.name}
          height="140"
          image={pokemon.sprites['front_default']}
          sx={{ margin: '10px' }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="div" textAlign="center">
            {pokemon.name.toUpperCase()}
          </Typography>
          {pokemon.stats.map((statObject, index) => {
            const statName = statObject.stat.name;
            const statValue = statObject.base_stat;

            return (

              <p key={index}  >
                {statName.toUpperCase()}: {statValue}
              </p>

            );
          })}
        </CardContent>
        <CardActions>
        <Button sx={{ margin: '20px auto 0 auto' }} onClick={() => router.push(`/`)} size="small" variant="contained" endIcon={<ArrowBackIcon />}>
          Home
        </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}

export default PokemonDetails;