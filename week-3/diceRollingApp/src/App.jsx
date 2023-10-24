import { useState } from 'react';
import Dice from '../src/components/Dice';
import DiceRolling from '../src/components/DiceRolling';
import { Box, Paper } from '@mui/material';

function App() {
  const options = [1, 2, 3, 4, 5, 6];
  const [currentStatus, setCurrentStatus] = useState(options[0]);
  const [results, setResults] = useState([]);
  const [rotate, setRotate] = useState();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#457b9d', height: '100vh' }}>
      <Paper sx={{ textAlign: 'center', width: '300px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '25px 0', bgcolor: '#8ecae6' }} elevation={3}>
        <Dice currentStatus={currentStatus}  />
        <DiceRolling currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} options={options}  />
      </Paper>
    </Box>
  );
}

export default App;
