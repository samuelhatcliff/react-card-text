import React, { useState, useEffect } from "react";
import axios from "axios";


function Deck() {
  const [deck, setDeck] = useState(null);

  // this is called *after* component first added to DOM
  useEffect(() => {
    async function pickDeck () {
    const deck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    setDeck(deck.data);
    }
  }, []);

  return (
      console.log(deck)
  );
};



export default Deck;
