import homeStyle from "../styles/Home.module.css"
import { useNavigate } from "react-router-dom";


export default function Home() {

    const navigate = useNavigate()

    return (
        <>
            <div id={homeStyle.main}>

                <h2>0️⃣Tic Tac Toe❌</h2>

                <h1>Choose a game mode</h1>

                <div id={homeStyle.playerBox}>
                    <div className={homeStyle.players} onClick={()=>navigate("/vsHuman")}>
                        <img src="./icons/man.png" alt="" width="35" />
                        <span>Vs</span>
                        <img src="./icons/man.png" alt="" width="35" />
                    </div>

                    <div className={homeStyle.players} onClick={() => navigate("/vsComputer")}>
                        <img src="./icons/man.png" alt="" width="35" />
                        <span>Vs</span>
                        <img src="./icons/ai.png" alt="" width="35" />
                    </div>
                </div>
            </div>
        </>
    );
}