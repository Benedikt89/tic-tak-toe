import React from 'react';
import './../../App.css';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {I_FieldItem} from "../../types/types";
import {getFields, getIsFrozen, getWinner} from "../../game/selectors";
import {onUserMove} from "../../game/actions";
import GameField from "./FieldElement";

interface IConnectProps {
    fields: Array<I_FieldItem>,
    winner: string | null,
    isFrozen: boolean
}

const GameScreen = (props: any) => {
    //Displaying cells
    let gameButtons = props.fields.map((f: I_FieldItem, index: number) =>
        <GameField
            key={f.id}
            winner={props.winner}
            isFrozen={props.isFrozen}
            increaseCount={props.onUserMove}
            field={f}
        />);
    return (
        <div>
            {props.alertDisplay && <h2>VICTORY</h2>}
            {!props.alertDisplay && <h2>TIC-TAC-TOE</h2>}
            <div className="gameWrapper">
            <div className="gameGrid">
                {gameButtons}
            </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state: AppStateType): IConnectProps => {
    return {
        fields: getFields(state),
        winner: getWinner(state),
        isFrozen: getIsFrozen(state),
    }
};

export default connect(mapStateToProps, {onUserMove})(GameScreen);