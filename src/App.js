import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';

import {Movie} from './page/Movie/Movie';
import {Search} from './page/search/Search';
import { Series } from './page/series/Series';
import { Trending } from './page/Trending/Trending';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='app'>
        <Container>
          <Switch>
            <Route exact path='/' component={Trending} />
            <Route exact path='/movies' component={Movie} />
            <Route exact path='/series' component={Series} />
            <Route exact path='/search' component={Search} /> 
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  )
}

export default App;
