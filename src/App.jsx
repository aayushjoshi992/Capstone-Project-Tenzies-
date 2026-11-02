import { useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"

export default function App() {
    /**
     * Challenge: Add conditional styling to the Die component
     * so that if it's held (isHeld === true), its background color
     * changes to a light green (#59E391)
     * 
     * Remember: currently the Die component has no way of knowing
     * if it's "held" or not.
     */
    
    const [dice, setDice] = useState(generateAllNewDice())

    function generateAllNewDice() {
        const newDice=[]
        for(let i=1; i<=10;i++){
        const randomNumber=({
            value:Math.ceil(Math.random()*6),
            isHeld:true,
            id: nanoid()
        })
        newDice.push(randomNumber)
        }   
        return newDice
    }
    

    function rollDice() {
        setDice(generateAllNewDice())
    }

    const diceElements = dice.map(dieObj => (
        <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld}/>)
    )

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}