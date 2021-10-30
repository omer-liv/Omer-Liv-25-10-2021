import './App.scss';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import AppHeader from './cmps/AppHeader';
import { Favorites } from './pages/Favorites';
import { Homepage } from './pages/Homepage';
import AppFooter from './cmps/AppFooter';
import { useSelector } from 'react-redux';

function App() {

  const { isDarkMode } = useSelector(state => state.weatherModule)

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <div className="content-wrap">

        <Router>
          <AppHeader />
          <Switch>
            <Route path="/favorites" component={Favorites} />
            <Route path="/" component={Homepage} />
          </Switch>
          <AppFooter />
        </Router >
      </div>
    </div>
  )
}

export default App;
