import Dice from "./dice";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./index.css";

export default function Main() {
  const [newDice, setNewDice] = React.useState(() => generateAllNewDice());

  const buttonRef = React.useRef(null);

  const gameWon =
    newDice.every((die) => die.isHeld) &&
    newDice.every((die) => die.value === newDice[0].value); //checks if each die is held && if it has the same value

  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const diceElements = newDice.map((e) => (
    <Dice
      key={e.id}
      value={e.value}
      isHeld={e.isHeld}
      hold={() => hold(e.id)}
    />
  ));

  function diceRoll() {
    if (!gameWon) {
      setNewDice(
        newDice.map((hold) => {
          return hold.isHeld
            ? hold
            : { ...hold, value: Math.ceil(Math.random() * 6) };
        })
      );
    } else setNewDice(generateAllNewDice());
  }

  function hold(id) {
    setNewDice(
      newDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  return (
    <div className="tenzies">
      <main>
        {gameWon && <Confetti recycle={false} numberOfPieces={1000} />}
        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again</p>
          )}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button ref={buttonRef} className="roll-dice" onClick={diceRoll}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}
