import React, {useState} from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {I_fieldItem, I_scoreData, I_winner} from "../../types/types";
import {getCurrentTurn, getFields, getIsFrozen, getScore, getWinner} from "../../game/selectors";
import {onUserMove, resetCount} from "../../game/actions";
import GameField from "./FieldElement";
import crossImg from './../../assets/icons/cross.svg'
import zeroImg from './../../assets/icons/zero.svg'
import style from './../Main.module.css'
import PopUpScore from "./PopUp";

interface I_props {
    title?: string
}

interface I_connectedProps {
    fields: Array<I_fieldItem>,
    winner: I_winner,
    isFrozen: boolean,
    currentTurn: string | null
    score: {
        player1Score: I_scoreData,
        player2Score: I_scoreData,
    }
}

interface I_dispatchedProps {
    onUserMove: (pressedField: I_fieldItem) => void,
    resetCount: () => void
}

interface I_mainProps extends I_connectedProps, I_dispatchedProps, I_props {
}

const GameScreen = ({fields, isFrozen, onUserMove, winner, resetCount, currentTurn, score, title}: I_mainProps) => {
    //Displaying cells
    let [isPopUpOpen, setPopUpOpen] = useState('');

    let gameButtons = fields.map((f: I_fieldItem, index: number) =>
        <GameField
            key={index}
            winner={winner}
            isFrozen={isFrozen}
            onUserTurn={onUserMove}
            field={f}
        />);

    let showStats = (val: string) => {
        setPopUpOpen(val);
    };

    let bgImage = () => currentTurn === 'CROSS' ? crossImg : zeroImg;

    return (
        <div className={style.fieldSizeWrapper}>

            {title &&
            <h1 onClick={resetCount} className={style.win}>
                {title}
            </h1>}
            {winner &&
            <h2 onClick={resetCount} className={style.win}>
                {winner === "DRAW" ? 'Nobody' : winner} is winner, click here to reset
            </h2>}
            {!winner && <h2>TIC-TAC-TOE</h2>}

            {!winner && <div className={style.row}>
                <span>Current turn :</span>
                <img className={style.icon} src={bgImage()}  alt={bgImage()}/>
            </div>}

            <div className={style.row}>
                <span className={style.scoreButton}>
                    <div onClick={() => {showStats('CROSS')}}>
                        Player Info <b>{score.player1Score.winsScore}</b>
                    </div>
                    {isPopUpOpen === 'CROSS' &&
                    <PopUpScore
                        score={score.player1Score}
                        title={'Player'}
                        closePopUp={() => {
                            showStats('')
                        }}
                    />}
                </span>
                <span className={style.scoreButton}>
                    <div onClick={() => {
                        showStats('ZERO')
                    }}>
                        AI Info <b>{score.player2Score.winsScore}</b>
                    </div>
                    {isPopUpOpen === 'ZERO' &&
                    <PopUpScore
                        score={score.player2Score}
                        title={'AI'}
                        closePopUp={() => {
                            showStats('')
                        }}
                    />}
                </span>
            </div>

            <div className={style.gameWrapper}>
                <div className={style.oneToOneSizer}>
                <div className={style.gameGrid}>
                    {gameButtons}
                </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType): I_connectedProps => {
    return {
        fields: getFields(state),
        winner: getWinner(state),
        isFrozen: getIsFrozen(state),
        currentTurn: getCurrentTurn(state),
        score: getScore(state)
    }
};

export default connect(mapStateToProps, {onUserMove, resetCount})(GameScreen);