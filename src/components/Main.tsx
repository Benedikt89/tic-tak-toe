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
import {resetCount, setDemoMode} from "../game/actions";

interface I_props {
    title?: string
}

interface I_connectedProps {
    isAuth: boolean,
    turns: number
    error: string | null
    appError: string | null
    isFetching: boolean
    demoMode: boolean
}

interface I_dispatchedProps {
    fetchGameData: () => void
    logOut: () => void
    logIn: (data: any) => void
    checkIsAuth: () => void
    resetCount: () => void
    setDemoMode: (status: boolean) => void
}

interface I_MainProps extends I_props, I_connectedProps, I_dispatchedProps, RouteComponentProps<{}> {
}

class Main extends Component<I_MainProps> {
    fetchTimeout: number | undefined;

    componentDidMount() {
        this.props.fetchGameData();
    }

    componentDidUpdate(prevProps: Readonly<I_MainProps>, prevState: Readonly<{}>, snapshot?: any): void {
        //retrying connect to server
        if (this.props.appError && !this.props.demoMode) {
            this.fetchTimeout = window.setTimeout(() => {
                this.props.fetchGameData()
            }, 20000)
        }
        //fetch after login
        if (this.props.isAuth !== prevProps.isAuth) {
            this.props.fetchGameData();
        }
    }

    componentWillUnmount(): void {
        clearTimeout(this.fetchTimeout)
    }

    render() {
        let {turns, error, isAuth, logOut, appError, isFetching, logIn, resetCount, demoMode, setDemoMode} = this.props;

        let contentBlock = () =>
            <div className={style.mainWrapper}>
                {isFetching && <Preloader/>}
                {!isAuth ? <LoginPage logIn={logIn}/> : <GameScreen/>}
            </div>;

        let errorBlock = () =>
            <div className={style.mainWrapper}>
                <h2 className={style.warning}>{appError}</h2>
                {demoMode && <GameScreen title={"DEMO MODE"}/>}
                <button className={style.alertBtn} onClick={() => {
                    setDemoMode(!demoMode)
                }}>
                    {!demoMode ? "TRY DEMO" : "LEAVE DEMO"}
                </button>
                }
            </div>;

        return (
            <React.Fragment>
                <Header turns={turns} alert={error} isAuth={isAuth} logOut={logOut} resetCount={resetCount}/>
                {appError ? errorBlock : contentBlock}
                <Footer/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppStateType): I_connectedProps => {
    return {
        isAuth: getIsAuth(state),
        turns: getTurns(state),
        error: state.auth.error,
        appError: getAppError(state),
        isFetching: getIsFetching(state),
        demoMode: state.reducer.demoMode
    }
};

let ComposedComponent = connect(
    mapStateToProps, {fetchGameData, logOut, checkIsAuth, logIn, resetCount, setDemoMode}
)(Main);

export default withRouter(ComposedComponent);