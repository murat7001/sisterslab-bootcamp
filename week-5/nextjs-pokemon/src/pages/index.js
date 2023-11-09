import Pokemon from "./pokemon";
import { Stack } from '@mui/material';



export default function Home() {
  return (
    <Stack sx={{marginTop:'20px'}} spacing={1}>
      <h1 style={{textAlign:'center'}}>Pokemons</h1>
      <Pokemon />
    </Stack>
  )
}
