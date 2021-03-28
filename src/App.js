import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './components/home/home.component';
import Skills from './components/skills/skills.component';
import Blog from './components/blog/blog.component';
import NotFound from './components/404.component';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/skills" exact component={Skills}/>
        <Route path="/blog" exact component={Blog}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
