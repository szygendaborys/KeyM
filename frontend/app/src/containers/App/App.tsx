import React from 'react';
import styled, { createGlobalStyle, ThemeProvider }  from 'styled-components';
import './App.css';

import * as ROUTES from '../../constants/routes';
import LandingPage from '../LandingPage';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

// /* color: ${props => (props.whiteColor ? 'white' : 'black')}; */
const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    width: 100vw;
    height: 100wh;
    color: whitesmoke;
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

const GlobalTheme = {
  letterState: {
    correct: 'green',
    incorrect: 'red',
    unknown: 'gray'
  }
};

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={GlobalTheme} >
       <GlobalStyle />
       <MainApp>
         {/* 
         
           <Navigation />
         */}
         <Route exact path={ROUTES.LANDING} component={LandingPage} />
         {/* <Route path={ROUTES.SEARCH_PAGE} component={SearchPage} /> */}
       </MainApp>
       </ThemeProvider>
     </Router>
  );
}

export default App;