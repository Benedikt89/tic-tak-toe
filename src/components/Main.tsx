import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {AppStateType} from "../redux/store";
import '../App.css';
import style from './Main.module.css';
import {fetchGameData} from "../game/actions";
import GameScreen from "./Game/gameScreen";
import {getAppError, getIsFetching, getTurns} from "../game/selectors";
import {checkIsAuth, logIn, logOut} from "../authorisation/actions";
import {getIsAuth} from "../authorisation/selectors";
import LoginPage from "./Login/Login";
import Preloader from "./Common/Preloader";

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
        return (
            <div>
                <Header turns={this.props.turns} alert={this.props.error} isAuth={this.props.isAuth}/>
                {!this.props.appError ? <div className={style.mainWrapper}>
                    {!this.props.isFetching ?
                        this.props.isAuth ?
                            <GameScreen/>
                            :
                            <LoginPage logIn={this.props.logIn}/>
                        :
                        <Preloader />
                    }
                </div> :
                    <div className={style.mainWrapper}><h2>{this.props.appError}</h2></div>
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

let ComposedComponent = connect(mapStateToProps, {fetchGameData, logOut, checkIsAuth, logIn})(Main);

export default withRouter(ComposedComponent);