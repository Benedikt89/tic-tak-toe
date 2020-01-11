import React from "react";
import style from '../Main.module.css';
import LoginUserForm from "./LoginForm";
import {I_logInData} from "../../authorisation/actions";

interface I_LoginPage {
    logIn: (data: I_logInData)=> void
}
const LoginPage = ({logIn}:I_LoginPage) => {
    const onUserSubmit = (formData: any) => {
        logIn({username: formData.username, password: formData.password})
    };

    return (
        <div className={style.container}>
            <LoginUserForm onSubmit={onUserSubmit}/>
        </div>
    )
};

export default LoginPage;