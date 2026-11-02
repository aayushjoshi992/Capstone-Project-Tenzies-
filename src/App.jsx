import { useState,useRef,useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
    
    const [dice, setDice] = useState(()=>generateAllNewDice())
    const buttonRef=useRef(null)
    
    const gameWon=
        dice.every(die=>die.isHeld) && 
        dice.every(die=>die.value===dice[0].value)

    useEffect(()=>{
        if(gameWon){
            buttonRef.current.focus()
        }
    },[gameWon])
    

    function generateAllNewDice() {
        const newDice=[]
        for(let i=1; i<=10;i++){
        const randomNumber=({
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id: nanoid()
        })
        newDice.push(randomNumber)
        }   
        return newDice
    }
      function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    function rollDice() {
        if(!gameWon)
        {
        setDice(oldDice=>oldDice.map(item=>{
            return item.isHeld?item:{...item,
                value:Math.ceil(Math.random()*6)
            }
        }
        ))
    }
    else{
        setDice(generateAllNewDice())
    }
    }

    const diceElements = dice.map(dieObj => (
        <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} onClick={hold} id={dieObj.id}/>)
    )

    

    return (
        <main>
            {gameWon && <Confetti/>}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
            className="roll-dice" 
            onClick={rollDice}
            ref={buttonRef}
            >{gameWon?"New Game":"Roll"}</button>
        </main>
    )
}