import React, { useState } from 'react';
import Button from '@mui/material/Button';

function DiceRolling({ options, setCurrentStatus, currentStatus}) {
    const [loading, setLoading] = useState(false);

    const getRandomElFromArr = (arr) => {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomItem = arr[randomIndex];
        setCurrentStatus(randomItem);
    };

    const helloHandler = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            getRandomElFromArr(options);
        }, 2000);
    };

    return (
        <div style={{marginTop: '10px'}}>
            {loading && <div style={{fontSize: '24px'}}>Loading...</div>}
            {!loading && <div style={{fontSize: '24px'}}>Dice: {`${currentStatus}`}</div>}
            <Button  size="medium" style={{color: 'black',backgroundColor: "#F3F0CA", marginTop: '16px', marginBottom: '10px'}} onClick={helloHandler} variant="contained">Random</Button>
        </div>
    );
}

export default DiceRolling;