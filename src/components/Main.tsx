import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {AppStateType} from "../redux/store";
import '../App.css';
import style from './Main.module.css';
import {fetchGameData} from "../game/api-actions";
import GameScreen from "./Game/gameScreen";
import {getAppError, getIsFetching, getTurns} from "../game/selectors";
import {checkIsAuth, logIn, logOut} from "../authorisation/actions";
import {getIsAuth} from "../authorisation/selectors";
import LoginPage from "./Login/Login";
import Preloader from "./Common/Preloader";
import {endGame, resetCount} from "../game/actions";

interface I_props {
    title?: string
}

interface I_connectedProps {
    isAuth: boolean,
    turns: number
    error: string | null
    appError: string | null
    isFetching: boolean
}

interface I_dispatchedProps {
    fetchGameData: () => void
    logOut: () => void
    logIn: (data: any) => void
    checkIsAuth: () => void
    resetCount: () => void
}

interface I_MainProps extends I_props, I_connectedProps, I_dispatchedProps, RouteComponentProps<{}> {
}

class Main extends Component<I_MainProps> {

    componentDidMount() {
        this.props.fetchGameData();
    }
    componentDidUpdate(prevProps: Readonly<I_MainProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.appError) {
            setTimeout(() => { this.props.fetchGameData()}, 20000)
        }
    }

    render() {
        let {turns, error, isAuth, logOut, appError, isFetching, logIn, resetCount} = this.props;
        return (
            <div>
                <Header turns={turns} alert={error} isAuth={isAuth} logOut={logOut} resetCount={resetCount}/>
                {!appError ? <div className={style.mainWrapper}>
                    {!isFetching ?
                        isAuth ?
                            <GameScreen />
                            :
                            <LoginPage logIn={logIn}/>
                        :
                        <Preloader />
                    }
                </div> :
                    <div className={style.mainWrapper}><h2>{appError}</h2></div>
                }
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): I_connectedProps => {
    return {
        isAuth: getIsAuth(state),
        turns: getTurns(state),
        error: state.auth.error,
        appError: getAppError(state),
        isFetching: getIsFetching(state)
    }
};

let ComposedComponent = connect(
    mapStateToProps, {fetchGameData, logOut, checkIsAuth, logIn, resetCount}
    )(Main);

export default withRouter(ComposedComponent);