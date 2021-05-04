import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import { BrowserRouter, Route, Link, Redirect, Switch  } from 'react-router-dom';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Articles from './components/articles';
import ArticleCUForm from './components/articleCUForm';
import auth from './services/authService';
import Logout from './components/common/logout';
import ProtectedRoute from './components/common/protectedRoute';
import NotFound from './components/notFound';

class App extends Component {
  

  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();

    if (user)
      this.setState({user});
  }

  render(){

    const {user} = this.state;
    return (
        <div className="container">
          <header className="blog-header py-3">
            <div className="row flex-nowrap justify-content-between align-items-center">
              <div className="col-4 pt-1">
                { user && <a className="text-muted" href="#">Welcome {user.first_name}</a>}
              </div>
              <div className="col-4 text-center">
                <a className="blog-header-logo text-dark" href="/">My Articles</a>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <a className="text-muted" href="#" aria-label="Search">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24" focusable="false"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
                </a>
                {
                  !user && 
                  <React.Fragment>
                    <Link className="btn btn-sm btn-outline-secondary" to="/register">Sign up</Link>
                    <Link className="btn btn-sm btn-outline-secondary" to="/login">Login</Link>
                  </React.Fragment>
                }
                {
                  user && 
                    <Link className="btn btn-sm btn-outline-secondary" to="/logout">Logout</Link>
                }
               
              </div>
            </div>
          </header>
          <div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
            <div className="col-md-6 px-0">
              <h1 className="display-4 font-italic">Articles Management</h1>
              <p className="lead my-3">A web application to manage articles creation and manipulation.</p>
              {/* <p className="lead mb-0"><a href="#" className="text-white font-weight-bold">Continue reading...</a></p> */}
            </div>
          </div>
              <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/logout" component={Logout} />
                <ProtectedRoute path="/articles" render={({ match }) => {
        // Do whatever you want with the match...
        return <Articles user={user} />;
      }} />
                <Route path="/create" component={ArticleCUForm} />
                <Route path="/register" component={RegisterForm} /> 
                <Route path="/not-found" component={NotFound} />  
                <Redirect from="/" to="/articles" />
                <Redirect to="/not-found" />
              </Switch>
        </div>
    );
  }
}

export default App;
