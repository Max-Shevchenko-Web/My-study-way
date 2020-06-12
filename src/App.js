import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import themeFile from  './util/theme';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// Components
import Navbar from './components/NavMenu/Navbar';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import learnwords from './pages/learningWords';


const theme = createMuiTheme({themeFile});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <CssBaseline/>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route path="/login" component={login} />
                <Route path="/signup" component={signup} />
                <Route path="/learnwords" component={learnwords} />
                {/*<Route exact path="/users/:handle" component={user} />
                {/* <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={user}
                />*/}
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
