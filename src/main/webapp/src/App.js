import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { connect } from 'react-redux';
import { logoutAction } from './store/actions/authActions';
import { Footer } from './components/common';
import { userService } from './infrastructure';
import Navbar from './components/common/NavBar';
import { ToastComponent } from './components/common';
import { CircleLoader } from 'react-spinners';

const StartPage = lazy(() => import('./components/pages/StartPage'))
const HomePage = lazy(() => import('./components/pages/HomePage'))
const RegisterPage = lazy(() => import('./components/pages/RegisterPage'))
const LoginPage = lazy(() => import('./components/pages/LoginPage'))
const ProfilePage = lazy(() => import('./components/pages/ProfilePage'))
const ErrorPage = lazy(() => import('./components/pages/ErrorPage'))


class App extends React.Component {
  constructor(props) {
    super(props)

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.logout();

    toast.success(<ToastComponent.successToast text={`You have been successfully logged out.`} />, {
      position: toast.POSITION.TOP_RIGHT
    });

    this.props.history.push('/login');
  }

  render() {
    const loggedIn = userService.isTheUserLoggedIn();

    return (
      <Fragment>
        <Navbar loggedIn={localStorage.getItem('token') != null} onLogout={this.onLogout} {...this.props} />
        <ToastContainer transition={Zoom} closeButton={false} />
        <Suspense fallback={
          <div className='sweet-loading'>
            <CircleLoader
              // sizeunit={"px"}
              size={150}
              color={'#61dafb'}
              loading={true}
            />
          </div>}>
          <Switch>
            <Route exact path="/" component={StartPage} />
            {!loggedIn && <Route exact path="/register" component={RegisterPage} />}
            {!loggedIn && <Route exact path="/login" component={LoginPage} />}
            {loggedIn && <Route path="/home" component={HomePage} />}
            <Route exact path="/error" component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
        <Footer />
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
