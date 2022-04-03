import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card.js"


function Deck() {


  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [autoDraw, setAutoDraw] = useState(false);
  let [count, setCount] = useState(0);


  const timerId = useRef();

    useEffect(function setCounter() {
        if (count === 52) {
            setIsEnd(true);
            return
        } else if (autoDraw === false) {
            return
        }
        try {
        timerId.current  = setInterval( async() => {
            setCount(c => (c + 1));
            const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
            let card = res.data.cards[0]
            setCards(cards =>
                [
                    card, ...cards, 
                ]
                );
            }, 1000)
        }
        catch (err) {
            alert(err);
        }
        return function cleanUpClearTimer() {
            clearInterval(timerId.current);
        };
    
    }, [autoDraw])


  useEffect(() => {
      //is there a better way to name my useEffects?
    async function pickDeck () {
    const deck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    setDeck(deck.data.deck_id)
    }
    pickDeck()
  }, []);



const toggleAutoDraw = () => {
    setAutoDraw(auto => !auto)
  };

  return (
   
    <div>
    <button onClick={toggleAutoDraw}> {autoDraw ? "Stop Autodraw" : "Autodraw!"}
    </button>
    <p>{isEnd ? "You've ran out of cards in the deck." : 'Click the above button to toggle autodraw.'}</p> 
       {cards.map(({code, suite, image, value}) => (
                <Card code = {code} suite= {suite} image={image} value={value} />)
                )}
    {/* < Card /> */}
  
    </div>
);



}






export default Deck;



    // function setCounter() {
    //     console.log('effect ran');

    //     timerId.current  = setInterval( async() => {
            
    //         console.log('count2', count)
    //         setCount(count + 1);

    //     }, 1000)
    //     if (count === 52) {
    //     return function cleanUpClearTimer() {
    //         console.log("Unmount ID", timerId.current);
    //         clearInterval(timerId.current);
    //     };
    // }}
    // setCounter()