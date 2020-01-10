import React from 'react';
import style from './Footer.module.css';


const Footer = () => {

    return (
        <footer>
            <div className={style.footerWrapper}>
                <div className={style.container}>
                    <div className={style.containerRow}>
                        <div className={style.containerCol}>
                                <h4>
                                    РЕКВИЗИТЫ КОМПАНИИ
                                </h4>
                                <p>Общество с ограниченной ответственностью «Печь Орин»</p>
                                <p>220035, г. Минск, ул. Бачило, д. 18</p>
                                <p>УНП 192810299</p>
                                <p>Регистрационный номер в ТР РБ: 402852</p>
                        </div>
                        <div className={style.containerCol}>

                                <h4>
                                    КОНТАКТЫ
                                </h4>
                                <p>Телефон: +375 33 6580220</p>
                                <p>E-mail: info@pechorin.by</p>
                                <p>Сайт: pechorin.by</p>

                        </div>
                    </div>
                    <hr/>
                    <div className={style.containerRow}>
                    </div>
                    <hr/>
                    <div className={style.container}>
                        <span>© 2019 Copyright: pechorin.by</span>
                    </div>

                </div>

            </div>
        </footer>
    )
};

export default Footer;