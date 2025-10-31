import { useReducer, useState, useRef } from "react";
import CompStyle from "../styles/Comp.module.css"
import { useNavigate } from "react-router-dom";
import JSConfetti from 'js-confetti'

export default function HumanVsComp() {
    const jsConfetti = new JSConfetti()
    const navigate = useNavigate()
    const [count, setCount] = useState(0)
    const [player, setPlayer] = useState('O')
    const playerRef = useRef(null)
    const cellRef = useRef([])
    const [isGameActive, setIsGameActive] = useState(true)

    const restartGame = () => {
        for (let i = 0; i < 9; i++) {
            cellRef.current[i].innerHTML = ''
            cellRef.current[i].style.backgroundColor="white"
        }
        setPlayer("O")
        playerRef.current.innerHTML = "Your turn(O)"
        setIsGameActive(true)
    }

    const [time, setTime] = useState((new Date().getDate() + "/" + parseInt(new Date().getMonth() + 1) + "/" + new Date().getFullYear()))

    const playerClick = (index) => {

        if (!isGameActive) return 0;

        //human click
        if (player == 'O' && cellRef.current[index].innerHTML == '') {
            cellRef.current[index].innerHTML = "O"
            setCount(count + 1)
            if (checkWinner()) return 0;
            setPlayer("X")
            playerRef.current.innerHTML = "Computer's turn(X)"
        }
        else {
            alert("double click is not allowed")
            return 0;
        }

        if (count < 8 && isGameActive) {
            //computer click
            setTimeout(() => {
                handleComputerClick()
            }, 500)
        }



    }

    const handleComputerClick = () => {
        const emptyIndices = [];

        cellRef.current.map((item, index) => {
            if (cellRef.current[index].innerHTML == "") {
                emptyIndices.push(index)
            }
        })
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
        cellRef.current[randomIndex].innerHTML = "X"
        setCount(count + 1)
        if (checkWinner()) return 0;
        setPlayer("O")
        playerRef.current.innerHTML = "Your turn(O)"
    }

    const checkWinner = () => {
        let data = []
        for (let i = 0; i < 9; i++) {
            data.push(cellRef.current[i].innerHTML)
        }

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let [a, b, c] of winPatterns) {
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                cellRef.current[a].style.backgroundColor = "green"
                cellRef.current[b].style.backgroundColor = "green"
                cellRef.current[c].style.backgroundColor = "green"
                setIsGameActive(false)
                playerRef.current.innerHTML = (player == "O" ? "You" : "Computer") + " won <br> please restart the game"
                jsConfetti.addConfetti()
                return true;
            }
        }

        let click = 0;
        for(let i of data){
            if(i!='') click++;
        }

        if(click==9){
            playerRef.current.innerHTML = "Game drawn <br>Please restart the game"
            return true;
        }
    }

    return (
        <>
            <div style={{ display: "flex", padding: "6px", alignItems: "center", justifyContent: "space-between" }}>
                <span>Date: {time}</span>
                <button id={CompStyle.homebtn} onClick={()=> navigate("/")}>Go to Home</button>
            </div>
            <hr />
            <br /><br />

            <div id={CompStyle.gamearea}>

                <h1 ref={playerRef} style={{ fontFamily: "cursive", textAlign: "center" }}>Your Turn (O)</h1>

                <div id={CompStyle.gameboard}>
                    <div ref={(el) => cellRef.current[0] = el} className={CompStyle.cell} onClick={() => playerClick(0)}></div>
                    <div ref={(el) => cellRef.current[1] = el} className={CompStyle.cell} onClick={() => playerClick(1)}></div>
                    <div ref={(el) => cellRef.current[2] = el} className={CompStyle.cell} onClick={() => playerClick(2)}></div>
                    <div ref={(el) => cellRef.current[3] = el} className={CompStyle.cell} onClick={() => playerClick(3)}></div>
                    <div ref={(el) => cellRef.current[4] = el} className={CompStyle.cell} onClick={() => playerClick(4)}></div>
                    <div ref={(el) => cellRef.current[5] = el} className={CompStyle.cell} onClick={() => playerClick(5)}></div>
                    <div ref={(el) => cellRef.current[6] = el} className={CompStyle.cell} onClick={() => playerClick(6)}></div>
                    <div ref={(el) => cellRef.current[7] = el} className={CompStyle.cell} onClick={() => playerClick(7)}></div>
                    <div ref={(el) => cellRef.current[8] = el} className={CompStyle.cell} onClick={() => playerClick(8)}></div>
                </div>

                <button id={CompStyle.restartbtn} onClick={restartGame}>Restart</button>
            </div>
        </>
    );
}