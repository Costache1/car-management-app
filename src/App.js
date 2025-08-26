import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cars from './pages/Cars';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/cars" component={Cars} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;