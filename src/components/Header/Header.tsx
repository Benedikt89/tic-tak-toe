import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

interface I_props {
    turns: number
    alert?: string | null
    isAuth: boolean
}
function Header(props:I_props) {
    return (
        <header className={style.headerWrapper}>
            <NavLink to="/">
                <div className={style.label}>
                </div>
            </NavLink>
            {props.isAuth && <div className={style.navContainer}>
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
            </div>}
            {props.alert ? <span>{props.alert}</span> :
                <div className={style.inform}>
                <span>Turns</span>
                <span>{props.turns}</span>
            </div>}
        </header>
    );
}

export default Header;
