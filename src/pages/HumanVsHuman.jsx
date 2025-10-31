import HumanStyle from "../styles/Human.module.css"
import { useState, useRef } from "react";
import JSConfetti from 'js-confetti'
import { useNavigate } from "react-router-dom";

export default function HumanVsHuman() {
    const jsConfetti = new JSConfetti()
    const navigate = useNavigate()
    const [time, setTime] = useState((new Date().getDate() + "/" + parseInt(new Date().getMonth() + 1) + "/" + new Date().getFullYear()))
    const [isGameActive, setIsGameActive] = useState(true)
    const [player, setPlayer] = useState("O")

    const playerRef = useRef(null)
    const cellRef = useRef([])

    const restartGame = () => {
        window.location = "/vsHuman"
    }

    const playerClick = (index) => {
        if (!isGameActive || cellRef.current[index].innerHTML!='') return 0;

        if(player=="O"){
            cellRef.current[index].innerHTML = "O"
            if(checkWinner()) return 0;
            setPlayer("X")
        }
        
        else{
            cellRef.current[index].innerHTML = "X"
            if(checkWinner()) return 0;
            setPlayer("O")
        }
    }

    const checkWinner = ()=>{
        let data = cellRef.current.map((item)=>item.innerHTML)
        const winPattern = [
            [0,1,2],[3,4,5],[6,7,8],    //rows 
            [0,3,6],[1,4,7],[2,5,8],    //column
            [0,4,8],[2,4,6]        //diagonals
        ];

        for(let [a,b,c] of winPattern){
            if(data[a] && data[a]==data[b] && data[a]==data[c]){
                playerRef.current.innerHTML = `${player} is the winner <br>Please restart the game`
                setIsGameActive(false)
                cellRef.current[a].style.backgroundColor = "green"
                cellRef.current[b].style.backgroundColor = "green"
                cellRef.current[c].style.backgroundColor = "green"
                jsConfetti.addConfetti()
                return true;
            }
        }
    }

    return (
        <>
            <div style={{display:"flex",padding:"6px" ,alignItems:"center", justifyContent:"space-between"}}>
                <span>Date: {time}</span>
                <button id={HumanStyle.homebtn} onClick={()=> navigate("/")}>Go to Home</button>
            </div>
            <hr />
            <br /><br />

            <div id={HumanStyle.gamearea}>

                <h1 ref={playerRef} style={{ fontFamily: "cursive", textAlign: "center" }}>{player}'s turn</h1>

                <div id={HumanStyle.gameboard}>
                    <div ref={(el) => cellRef.current[0] = el} className={HumanStyle.cell} onClick={() => playerClick(0)}></div>
                    <div ref={(el) => cellRef.current[1] = el} className={HumanStyle.cell} onClick={() => playerClick(1)}></div>
                    <div ref={(el) => cellRef.current[2] = el} className={HumanStyle.cell} onClick={() => playerClick(2)}></div>
                    <div ref={(el) => cellRef.current[3] = el} className={HumanStyle.cell} onClick={() => playerClick(3)}></div>
                    <div ref={(el) => cellRef.current[4] = el} className={HumanStyle.cell} onClick={() => playerClick(4)}></div>
                    <div ref={(el) => cellRef.current[5] = el} className={HumanStyle.cell} onClick={() => playerClick(5)}></div>
                    <div ref={(el) => cellRef.current[6] = el} className={HumanStyle.cell} onClick={() => playerClick(6)}></div>
                    <div ref={(el) => cellRef.current[7] = el} className={HumanStyle.cell} onClick={() => playerClick(7)}></div>
                    <div ref={(el) => cellRef.current[8] = el} className={HumanStyle.cell} onClick={() => playerClick(8)}></div>
                </div>

                <button id={HumanStyle.restartbtn} onClick={restartGame}>Restart</button>
                
            </div>
        </>
    );
}