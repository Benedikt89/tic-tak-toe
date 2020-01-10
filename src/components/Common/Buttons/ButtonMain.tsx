import React, {useState} from 'react';
import classNames from "classnames/bind";
import style from "./Buttons.module.css";

interface IProps {
    onClickCallback?: () => void
    buttonText: string
}

const ButtonMain = ({onClickCallback = ()=>{}, buttonText}: IProps) => {
    let [addSucces, setAddSucces] = useState(false);

    let onButtonClick = () => {
        onClickCallback();
        setAddSucces(true);
        setTimeout(() => {
            setAddSucces(false);
        }, 500)
    };
    let cx = classNames.bind(style);
    let classNameForbtnAdd = cx(style.btnAdd, {
        success: addSucces
    });
    return (
            <button className={classNameForbtnAdd}
                    disabled={addSucces}
                    onClick={onButtonClick}
            >{buttonText}
            </button>
    )
};

export default ButtonMain;