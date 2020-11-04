import React from 'react';
import styled, { createGlobalStyle }  from 'styled-components';
import logo from './logo.svg';
import './App.css';

import * as ROUTES from '../../constants/routes';
import * as colours from '../../constants/colours.js';
import LandingPage from '../LandingPage';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

// /* color: ${props => (props.whiteColor ? 'white' : 'black')}; */
const GlobalStyle = createGlobalStyle`
  body {
    background: ${colours.BG_MAIN};
    width: 100vw;
    height: 100wh;
    color: ${colours.TEXT_MAIN};
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;

const MainApp = styled.div`
    height: 100vh;
`;

const App = () => {
  return (
    <Router>
       <GlobalStyle />
       <MainApp>
         {/* 
           <Navigation />
         */}
         <Route exact path={ROUTES.LANDING} component={LandingPage} />
         {/* <Route path={ROUTES.SEARCH_PAGE} component={SearchPage} /> */}
       </MainApp>
     </Router>
  );
}

export default App;