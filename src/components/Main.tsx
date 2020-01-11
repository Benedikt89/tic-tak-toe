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
import {getTurns} from "../game/selectors";
import {checkIsAuth, logOut} from "../authorisation/authReducer";
import {getIsAuth} from "../authorisation/selectors";

interface IProps {
    title?: string
}

interface IConnectProps {
    isAuth: boolean,
    turns: number
}

interface LinkDispatchProps {
    fetchGameData: () => void
    logOut: () => void
    checkIsAuth: () => void
}

interface IMainProps extends IProps, IConnectProps, LinkDispatchProps, RouteComponentProps<{}> {}

class Main extends Component<IMainProps> {

    componentDidMount() {
        this.props.checkIsAuth();
        this.props.fetchGameData();
        //listning for errors
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors());
    }

    catchAllUnhandledErrors = (promiseRejectionEvent?: any): any => {
        console.log('some error occured');
    };

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors())
    }

    render() {
        return (
            <div>
                <Header turns={this.props.turns}/>
                <div className={style.mainWrapper}>
                    <div>
                        <GameScreen/>
                    </div>
                </div>
                <Footer/>

            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): IConnectProps => {
    return {
        isAuth: getIsAuth(state),
        turns: getTurns(state)
    }
};

let ComposedComponent = connect(mapStateToProps, {fetchGameData, logOut, checkIsAuth})(Main);

export default withRouter(ComposedComponent);