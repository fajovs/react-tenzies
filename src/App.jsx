import { nanoid } from "nanoid";
import Dice from "./components/Dice";
import { useState} from "react";
import ReactConfetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

 

  function hold(id) {
    setDice((preValue) => {
      return preValue.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const diceElements = dice.map((el) => (
    <Dice
      key={el.id}
      value={el.value}
      isHeld={el.isHeld}
      onClick={() => hold(el.id)}
    />
  ));

  return (
    <>
      <main>
        {gameWon && <ReactConfetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>

        <button className="roll-dice" onClick={rollDice}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}

export default App;
