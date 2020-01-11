import React from 'react';
import './../../App.css';
import style from './FieldElement.module.css'
import classNames from 'classnames/bind';
import crossImg from './../../assets/icons/cross.png'
import zeroImg from './../../assets/icons/zero.png'
import {I_FieldItem} from "../../types/types";

interface IProps {
    field: I_FieldItem
    winner: string | null,
    isFrozen: boolean
    increaseCount: ()=>void,
}

class GameField extends React.Component<IProps> {
    state = {
        clickOn: false,
        clickSuccess: false,
    };

//bluring buttons after click to inform user about successful result or not
    clickActive = () => {
        this.setState({clickOn: true}, ()=>{
            setTimeout(()=>{this.setState({clickOn: false, clickSuccess: false})}, 500)
        })
       // cl();
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
            success: this.state.clickOn && this.state.clickSuccess,
            error: !this.props.field && this.state.clickOn && !this.state.clickSuccess,
        });

        //function react on click
        let clickable = () => {
            //If click on socket with image
            if(this.props.field){
                this.setState({clickSuccess: true})
            }
            //Calling timeout function to blur socket
            this.clickActive();
            //If click on Visible, increases count
            if (this.props.field && this.props.winner) {
                this.props.increaseCount();
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