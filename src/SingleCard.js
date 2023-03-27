import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}){

    const handleClick = () => {
        if (!disabled){
            handleChoice(card)
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="front of card"/>
                <img 
                className="back" 
                src="https://martinmihaylov27.github.io/SoccerCardMatch/images/PLLogo.png" 
                onClick={handleClick} 
                alt="back of card" 
                />
            </div>
        </div>
    )
}