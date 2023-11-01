import React from 'react'
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
} from '@mui/material';
import { fetchCharacters } from '../api';

function Pokemon() {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState([]);
    const getCharacters = async () => {
        const characters = await fetchCharacters();
        setCharacters(characters);
        setSelectedCharacter(characters);
    };
    const router = useRouter();

    useEffect(() => {
        getCharacters();
    }, []);

    const handleCharacterSelect = (e) => {
        setSelectedCharacter(characters.filter((character) => String(character.name).toLowerCase().includes(e.target.value)))
    };
    const handleDetailsClick = (name) => {
        router.push(`/pokemon/${name}`);
    };
    return (
        <Stack sx={{alignItems:'center'}} spacing={2}>
            <TextField  id="outlined-basic" label="Search" variant="outlined"
                onChange={handleCharacterSelect}
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
                {selectedCharacter.map((character, index) => (
                    <Card variant="outlined" key={index} sx={{ width: '250px', height: '150px', textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {character.name.toUpperCase()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button sx={{margin:'20px auto 0 auto'}} onClick={() => handleDetailsClick(character.name)} size="small" variant="contained" endIcon={<DetailsIcon />}>
                                Details
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Stack>
    );
};
export default Pokemon