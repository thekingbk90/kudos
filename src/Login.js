import React, { Component } from 'react';
import './Login.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from './configureStore';
import App from './App';
import ProductList from './views/ProductList';
import Products from './views/Products';
import Categories from './views/Categories';
import Product from './views/Product';
import Cart from './views/Cart';
import config from './config/config';

import './index.css';

if (!window.Promise) {
    window.Promise = Promise;
}

class Login extends Component {
    render() {
        function handleClick(e) {
            // e.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('pwd').value;
            console.log(username);
            console.log(password);
            if(username && password) {
                login(username, password);
            } else {
                fakeData();
            }
        }

        function fakeData() {
            config.API_SESSION = 'iktu2lfsjrqh27e628uri88ta6';
            config.API_CATEGORIES_URL = 'http://35.187.246.124:8081/rest/default/V1/webpos/categories?searchCriteria[filter_groups][0][filters][0][field]=first_category&searchCriteria[filter_groups][0][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[sortOrders][0][field]=position&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[pageSize]=100&searchCriteria[currentPage]=1';
            config.API_PRODUCTS_URL = 'http://35.187.246.124:8081/rest/default/V1/webpos/products?show_out_stock=1&searchCriteria[sortOrders][0][field]=name&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[pageSize]=8&searchCriteria[currentPage]=1';
            config.API_PRODUCT_URL = 'http://35.187.246.124:8081/rest/default/V1/webpos/products?show_out_stock=1&searchCriteria[sortOrders][0][field]=name&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[pageSize]=8&searchCriteria[currentPage]=1';
            openApp(config.API_SESSION)
        }

        function login(username, password) {
            var payload = {
                staff: {"username":"admin","password":"admin123"}
            };

            var data = new FormData();
            data.append("username", "admin");
            data.append("password", "admin123");

            fetch(config.API_LOGIN_URL,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(payload)
                })
                .then(function(res){
                    return res.json();
                })
                .then(function(data){
                    openApp(data);
                })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function openApp(session) {
            config.API_SESSION = session;
            render(
                <Provider store={store}>
                    <HashRouter>
                        <App>
                            <Switch>
                                <Route exact path="/" component={ProductList} />
                                <Route path="/categories" component={Categories} />
                                <Route path="/category/:categId" component={Products} />
                                <Route path="/product/:productId" component={Product} />
                                <Route path="/cart" component={Cart} />
                            </Switch>
                        </App>
                    </HashRouter>
                </Provider>,
                document.getElementById('root'),
            );
        }

        return (
            <div className="ms-webpos">
                <div className="login-screen">
                    <div className="wrap-login-form">
                        <form className="form-login" role="form" id="webpos-login" method="post" noValidate="novalidate">
                            <h1 className="title-page">
                            <img src="./src/images/logo.svg" width="200px" height="200px" alt="logo"/>
                            </h1>
                            <div className="form-group wrap-input">
                                <div className="input-box">
                                    <input type="text" className="form-control required-entry required" id="username" name="username" placeholder="Username"/>
                                </div>
                                <div className="input-box">
                                    <input type="password" className="form-control required-entry required" id="pwd" name="password" placeholder="Password"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <button onClick={handleClick} type="button" className="btn btn-default">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
    }
}

export default Login;
