import React from 'react';
import './../../App.css';
import style from './FieldElement.module.css'
import classNames from 'classnames/bind';
import crossImg from './../../assets/icons/cross.png'
import zeroImg from './../../assets/icons/zero.png'
import {I_fieldItem, I_winner} from "../../types/types";

interface I_Props {
    field: I_fieldItem
    winner: I_winner,
    isFrozen: boolean
    onUserTurn: (pressedField: I_fieldItem) => void,
}

class GameField extends React.Component<I_Props> {
    state = {
        socketBlur: false,
        clickSuccess: false,
    };

//bluring buttons after click to inform user about successful result or not
    clickTimeoutActive = () => {
        this.setState({socketBlur: true}, ()=>{
            setTimeout(()=>{this.setState({socketBlur: false, clickSuccess: false})}, 500)
        })
    };

    render() {
        let cx = classNames.bind(style);

        //Style for Bg Image
        let bgStyle = () =>{
            if (this.props.field.status === 'CROSS') {
                return {backgroundImage: `url(${crossImg})`};
            } else if (this.props.field.status === "ZERO") {
                return {backgroundImage: `url(${zeroImg})`}
            } else {
                return {backgroundImage: ``};
            }
        };

        // Styles for fields depends from user activity
        let classNameForWrapper = cx(style.buttonWrapper, {
            success: this.state.socketBlur && this.state.clickSuccess,
            error: this.props.field.status && this.state.socketBlur && !this.state.clickSuccess,
            win: this.props.field.usedInWin
        });

        //function react on click
        let clickable = () => {
            //If user can click on socket
            if(!this.props.isFrozen && !this.props.field.status){
                this.setState({clickSuccess: true})
            }
            //Calling timeout function to blur socket
            this.clickTimeoutActive();

            if (!this.props.field.status && !this.props.winner && !this.props.isFrozen) {
                this.props.onUserTurn(this.props.field);
            }
        };

        return (
            <div onClick={clickable} className={classNameForWrapper}>
                <div
                    style={bgStyle()}
                    className={this.props.field ? style.show : style.itemDog}>
                </div>
            </div>
        );
    }
}

export default GameField;