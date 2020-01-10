import React, {Component, useRef} from "react";
import style from '../Main.module.css';
import LoginUserForm from "./LoginForm";


interface I_LoginPage {
    logIn: (data:any)=> void
}
const LoginPage = ({logIn}:I_LoginPage) => {
    const onUserSubmit = (formData:any) => {
        logIn({phone: formData.phone, password: formData.password})
    };

    return (
        <div className={style.container}>
            <LoginUserForm onSubmit={onUserSubmit}/>
        </div>
    )
};

export default LoginPage;