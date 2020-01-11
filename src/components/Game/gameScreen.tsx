import React from 'react';
import './../../App.css';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {I_fieldItem, I_winner} from "../../types/types";
import {getFields, getIsFrozen, getWinner} from "../../game/selectors";
import {onUserMove} from "../../game/actions";
import GameField from "./FieldElement";

interface I_connectedProps {
    fields: Array<I_fieldItem>,
    winner: I_winner,
    isFrozen: boolean
}
interface I_dispatchedProps {
    onUserMove: (pressedField: I_fieldItem) => void
}
interface IMainProps extends I_connectedProps, I_dispatchedProps {}

const GameScreen = ({fields, isFrozen, onUserMove, winner}: IMainProps) => {
    //Displaying cells
    let gameButtons = fields.map((f: I_fieldItem, index: number) =>
        <GameField
            key={f.id}
            winner={winner}
            isFrozen={isFrozen}
            onUserTurn={onUserMove}
            field={f}
        />);
    return (
        <div className="container">
            {winner && <h2 className="warning">End Game {winner}</h2>}
            {!winner && <h2>TIC-TAC-TOE</h2>}
            <div className="gameWrapper">
            <div className="gameGrid">
                {gameButtons}
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
    }
};

export default connect(mapStateToProps, {onUserMove})(GameScreen);