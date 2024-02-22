import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import WalletPage from '../pages/WalletPage';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/wallet">
                        <WalletPage />
                    </Route>
                    <Route path="/">
                        <LoginPage /> {/* Assuming you want the login page as the default */}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
