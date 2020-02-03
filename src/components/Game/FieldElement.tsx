import React from 'react';
import style from './FieldElement.module.css'
import classNames from 'classnames/bind';
import crossImg from './../../assets/icons/cross.svg'
import zeroImg from './../../assets/icons/zero.svg'
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
    blurTimeout: number | undefined;

    clickTimeoutActive = () => {
        this.setState({socketBlur: true}, ()=>{
            this.blurTimeout = window.setTimeout(() => {this.setState({socketBlur: false, clickSuccess: false})}, 500)
        })
    };

    componentWillUnmount(): void {
        clearTimeout(this.blurTimeout)
    }

    render() {
        let cx = classNames.bind(style);

        //Style for Bg Image
        let bgImage = () => {
            if (this.props.field.status === 'CROSS') {
                return crossImg
            } else if (this.props.field.status === "ZERO") {
                return zeroImg
            } else {
                return '';
            }
        };

        // Styles for fields depends from user activity
        let classNameForWrapper = cx(style.buttonWrapper, {
            success: this.state.socketBlur && this.state.clickSuccess,
            error: this.props.field.status && this.state.socketBlur && !this.state.clickSuccess,
            winHorisontal: this.props.field.usedInWin === 'HORIZONTAL',
            winVertical: this.props.field.usedInWin === 'VERTICAL',
            win90deg: this.props.field.usedInWin === 'DRAW+90',
            winMinus90deg: this.props.field.usedInWin === 'DRAW-90',
        });

        let classNameCell = cx(style.itemCell,{
            cross: this.props.field.status === 'CROSS',
            zero: this.props.field.status === 'ZERO',
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
                    className={classNameCell}>
                    <img alt={this.props.field.status ? this.props.field.status : ''} src={bgImage()}/>
                </div>
            </div>
        );
    }
}

export default GameField;