import React from "react";
import {I_scoreData} from "../../types/types";
import style from './../Main.module.css';

interface I_props {
    title?: string,
    score: I_scoreData,
    closePopUp: () => void
}

const PopUpScore = ({title, score, closePopUp}: I_props) => {
    return (
        <div className={style.popUpWrapper} onClick={closePopUp}>
            {title && <span  onClick={closePopUp}>{title}</span>}
            <span>wins: {score.winsScore}</span>
            <span>fails: {score.failsScore}</span>
            <span>draws: {score.drawsScore}</span>
        </div>
    )
};
export default PopUpScore