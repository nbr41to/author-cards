import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Home() {
  const [deck, setDeck] = useState([]);
  const [me, setMe] = useState([]);
  const [you, setYou] = useState([]);
  const [meP, setMeP] = useState(0);
  const [youP, setYouP] = useState(0);
  const [player, setPlayer] = useState("me");
  console.log(deck, me, you);
  /* start */
  const start = () => {
    let _deck = [];
    for (let i = 1; i < 6; i++) {
      _deck.push(i);
      _deck.push(i);
      _deck.push(i);
    }
    const shuffledDeck = shuffle(_deck);
    setMe(shuffledDeck.slice(0, 3));
    setYou(shuffledDeck.slice(3, 6));
    setDeck(shuffledDeck.slice(6));
  };
  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  /* player select */
  const playerSelect = (player) => {
    setPlayer(player);
  };
  /* drow */
  const drowMe = () => {
    setMe(prev => [...prev, ...deck.slice(0, 1)]);
    setDeck((prev) => prev.slice(1));
  };
  const drowYou = () => {
    setYou(prev => [...prev, ...deck.slice(0, 1)]);
    setDeck((prev) => prev.slice(1));
  };
  /* 3重複チェック */
  const threeCheck = (arr) => {
    const targetNum = arr.find(keyNum => {
      const length = arr.filter(num => keyNum === num).length;
      console.log(length);
      if (length > 2) return true;
    });
    return arr.filter(num => targetNum !== num);
  };
  /* 数宣言 */
  const declareGettingMe = (num) => {
    const get = you.filter(n => num === n);
    setMe(prev => [...prev, ...get]);
    setYou(prev => prev.filter(n => num !== n));
  };
  const declareGettingYou = (num) => {
    const get = me.filter(n => num === n);
    setYou(prev => [...prev, ...get]);
    setMe(prev => prev.filter(n => num !== n));
  };

  return (
    <div>
      <h2>Game</h2>
      <Button onClick={start}>Start</Button>
      <Button onClick={() => playerSelect("me")}>player1</Button>
      <Button onClick={() => playerSelect("you")}>player2</Button>
      <div>me{meP}:{me.map((num, index) => <button key={index} onClick={() => declareGettingMe(num)}>{num}</button>)}</div>
      <div>you{youP}:{you.map((num, index) => <button key={index} onClick={() => declareGettingYou(num)}>{num}</button>)}</div>
      <Button onClick={drowMe}>drowMe</Button>
      <Button onClick={drowYou}>drowYou</Button>
      <br />
      <Button onClick={() => { setMe(threeCheck(me)); setMeP(prev => prev + 1); }}>checkMe</Button>
      <Button onClick={() => { setYou(threeCheck(you)); setYouP(prev => prev + 1); }}>checkYou</Button>
    </div>
  );
}
