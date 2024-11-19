import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from '../../infrastructure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from './ToastComponent';
import './css/Navbar.css';

import { connect } from 'react-redux';
import { searchResultsAction } from '../../store/actions/userActions';

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            showDropdown: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {


        const errorMessage = this.getErrorMessage(prevProps);
        const successMessage = this.getSuccessMessage(prevProps)

        if (errorMessage) {
            toast.error(<ToastComponent.errorToast text={errorMessage} />, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000
            });
        } else if (successMessage) {
            toast.success(<ToastComponent.successToast text={successMessage} />, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000
            });
        }
    }

     getSuccessMessage(prevProps) {
        if (!this.props.searchResultsData.hasError && this.props.searchResultsData.message && this.props.searchResultsData !== prevProps.searchResultsData) {
            return this.props.searchResultsData.message;
        }

        return null;
    }

    getErrorMessage(prevProps) {
        if (this.props.searchResultsData.hasError && prevProps.searchResultsData.error !== this.props.searchResultsData.error) {
            return this.props.searchResultsData.message || 'Server Error';
        }

        return null;
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    handleBlur = () => (event) => {
        this.setState({
            showDropdown: ''
        });
    }



    render() {
        const isAdmin = userService.isAdmin();
        const isRoot = userService.isRoot();
        const userId = userService.getUserId();

        const { loggedIn, onLogout } = this.props;
        const showDropdown = this.state.showDropdown;
        let pathname = this.props.location.pathname !== "/";


        return (
            <Fragment >
                <input type="checkbox" name="main-nav-toggle" id="main-nav-toggle" />
                <header className="site-header">
                    <section className="navbar-section">
                        <div className="row">
                            <div className="col-md-8 navbar-wrapper">
                                <div className="nav-searchbar-container">
                                    <div className="site-logo">
                                        <NavLink to="/" className="nav-link " >Web-scrapper</NavLink>
                                    </div>
                                </div>

                                <label id="toggle" htmlFor="main-nav-toggle" style={{ 'marginBottom': '0' }}><span>Menu</span></label>

                                <nav className="col-md-4 nav-main">
                                    <ul className="nav-ul">
                                        {loggedIn && <li className="nav-item"><NavLink exact to={`/home/profile/${userId}`} className="nav-link  fas fa-user tooltipCustom"  > {userService.getUsername()}<span className="tooltiptextCustom">Profile</span></NavLink></li>}

                                        {(loggedIn && (isRoot || isAdmin)) && <li className="nav-item"><NavLink exact to={`/home/logs/${userId}`} className="nav-link"> Logs</NavLink></li>}
                                        {loggedIn && <li className="nav-item"><NavLink exact to="#" className="nav-link " onClick={onLogout} >Logout</NavLink></li>}
                                        {!loggedIn && <li className="nav-item"><NavLink exact to="/login" className="nav-link" >Login</NavLink></li>}
                                        {!loggedIn && <li className="nav-item"><NavLink exact to="/register" className="nav-link" >Register</NavLink></li>}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </section>
                </header>
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timeLineUserData: state.timeLineUserData,
        loggedInUserData: state.loggedInUserData,

/*         fetchAllUnreadMessages: state.fetchAllUnreadMessages,
        allUnreadMessages: state.fetchAllUnreadMessages.allUnreadMessages,*/

        searchResultsData: state.searchResults,

       /* friendRequestsArr: state.findFriends.userWaitingForAcceptingRequest,*/
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // triggerMessageLoad: (userData) => { dispatch(triggerMessageLoadAction(userData)) },
        searchResult: (loggedInUserId, search) => { dispatch(searchResultsAction(loggedInUserId, search)) },
        // loadAllUnreadMessages: () => { dispatch(fetchAllUnreadMessagesAction()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


