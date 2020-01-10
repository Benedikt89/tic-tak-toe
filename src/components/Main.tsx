import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {fetchCatalog, increaseQuantity, decreaseQuantity} from "../redux/reducer";
import {AppStateType} from "../redux/store";
import '../App.css';
import style from './Main.module.css';

interface IProps {
    title?: string
}

interface IConnectProps {
    isFetching: boolean,
    totalQuantity: number,
    totalPrice: number,
}

interface LinkDispatchProps {
    fetchCatalog: () => void;
    increaseQuantity: (count: number) => void;
    decreaseQuantity: (count: number) => void;
}

class Main extends Component<IProps & IConnectProps & LinkDispatchProps> {
    componentDidMount() {
        this.props.fetchCatalog();
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
                <Header totalQuantity={this.props.totalQuantity} totalPrice={this.props.totalPrice}/>
                <div className={style.mainWrapper}>
                    <div>
                        <span>{this.props.totalQuantity}</span>
                        <button onClick={() => {
                            this.props.increaseQuantity(this.props.totalQuantity)
                        }}>+
                        </button>
                        <button onClick={() => {
                            this.props.decreaseQuantity(this.props.totalQuantity)
                        }}>-
                        </button>
                    </div>
                </div>
                <Footer/>

            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): IConnectProps => {
    return {
        isFetching: state.reducer.isFetching,
        totalQuantity: state.reducer.totalQuantity,
        totalPrice: state.reducer.totalPrice,
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps, {fetchCatalog, increaseQuantity, decreaseQuantity})
)(Main);