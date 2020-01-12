import React from "react";
import style from './FormControl.module.css';
import {Field, reduxForm} from "redux-form";
import {renderField} from "./FormElements/FormsControls";
import {maxLength15, minLength4, required} from "./FormElements/validators";

const LoginUserForm = ({handleSubmit, pristine, submitting, error}: any) => {

    return (
        <form className={style.formControl} onSubmit={handleSubmit}>
            <Field name="username"
                   type="text"
                   component={renderField}
                   label="Имя Пользователя"
                   validate={[required, minLength4, maxLength15]}
            />
            <Field name="password"
                   type="password"
                   component={renderField}
                   label="Пароль"
                   validate={[required, minLength4]}
            />
            {error && <span className={style.mainErrorMessage}>{error}</span>}

            <button type="submit" disabled={pristine || submitting}>Log In</button>
        </form>
    )
};
export default reduxForm({form: 'logIn'})(LoginUserForm)