import {useEffect, useState} from 'react'
import './App.css'
import SingleCard from './SingleCard'

const cardImages = [
    {"src": "https://martinmihaylov27.github.io/SoccerCardMatch/images/ArsenalLogo.jpg", matched: false},
    {"src": "https://martinmihaylov27.github.io/SoccerCardMatch/images/ManCityLogo.png", matched: false},
    {"src": "https://martinmihaylov27.github.io/SoccerCardMatch/images/ManUtdLogo.png", matched: false},
    {"src": "https://martinmihaylov27.github.io/SoccerCardMatch/images/SpursLogo.png", matched: false},
    {"src": "https://martinmihaylov27.github.io/SoccerCardMatch/images/LiverpoolLogo.png", matched: false},
    {"src": "https://martinmihaylov27.github.io/SoccerCardMatch/images/ChelseaLogo.png", matched: false}
]
var matchesFound = 0
var gameWon = false

function App(){
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    //handle choices
    const handleChoice = (card) => {
        if(card.id === choiceOne?.id) return;
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }
    
    //compare if cards match
    useEffect(() => {
        if (choiceOne && choiceTwo){
            setDisabled(true)
            if(choiceOne.src === choiceTwo.src){
                matchesFound += 1
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src){
                            var src = document.getElementsByClassName("front")
                            for(const i of src){
                                if(i.getAttribute('src') === card.src){
                                    i.style.border = "5px solid rgb(255,215,0)"
                                }
                            }
                            return {...card, matched: true}
                        }else{
                            return card
                        }
                    })
                }) 
                resetTurn()
            }
            else{
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    //reset choices and update turns
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    //start a new game automatically
    useEffect(() => {
        shuffleCards()
    }, [])

    if (matchesFound === 6){
        gameWon = true
        matchesFound = 0
    }

    return(
        <div className="App">
            <h1>Soccer Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {cards.map(card => (
                    <SingleCard 
                        key={card.id} 
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
            <p>{gameWon ? "You won in " + turns + " turns!" : "Turns: " + turns}</p>
        </div>
    );
}

export default App
