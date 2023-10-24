import React from 'react'
import diceImages from './../../assets/index'
import { Button, } from '@mui/material';


function Dice({ currentStatus }) {
  
  return (
    <div style={{marginTop: '10px'}} className="Coin-container">
      <img style={{ width: '100px' }}
        src={diceImages[`${currentStatus - 1}`]}
        alt=""
      />
    </div>
  )
}

export default Dice