import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

interface IProps {
    turns: number
}
function Header(props:IProps) {
    return (

        <header className={style.headerWrapper}>
            <NavLink to="/">
                <div className={style.label}>
                </div>
            </NavLink>
            <div className={style.navContainer}>
                <div>
                    <div className={style.item}>
                        EndGame
                    </div>
                </div>
                <div>
                    <div className={style.item}>
                        LogOut
                    </div>
                </div>
                <NavLink to="/about" activeClassName={style.active}>
                    <div className={style.item}>
                        About
                    </div>
                </NavLink>
            </div>
            <div className={style.inform}>
                <span>Turns</span>
                <span>{props.turns}</span>
            </div>
        </header>
    );
}

export default Header;
