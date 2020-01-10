import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

interface IProps {
    totalQuantity: number,
    totalPrice: number
}

function CartBtn({totalQuantity, totalPrice}:IProps) {

    return (

        <div>
            <NavLink to="/cart" className={style.cartBtnWrapper}>
                <div className={style.cartName}>
                    <span>Корзина</span>
                </div>
                <div className={style.calculate}>
                    <span>{totalQuantity}</span>
                </div>
            </NavLink>
        </div>
    );
}

export default CartBtn;
