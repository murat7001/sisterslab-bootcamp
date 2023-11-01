import { useEffect, useState } from 'react';
import { fetchCharacters } from '../api';
import CardItem from '../card';
import {
  Stack,
  TextField,
} from '@mui/material';


const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState([]);
  const getCharacters = async () => {
    const characters = await fetchCharacters();
    setCharacters(characters);
    setSelectedCharacter(characters);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const handleCharacterSelect = (e) => {
    setSelectedCharacter(characters.filter((character) => String(character.name).toLowerCase().includes(e.target.value)))
  };

  return (
    <Stack spacing={2}>
      <TextField id="outlined-basic" label="Search" variant="outlined"
        onChange={handleCharacterSelect}
        sx={{ width: 300 }}
        size="small"
      />
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {selectedCharacter.map((character) => (
          <CardItem character={character} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Characters;
