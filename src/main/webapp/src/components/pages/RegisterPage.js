import React, { Fragment } from 'react';
import '../../styles/FormPages.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastComponent } from '../common';
import { connect } from 'react-redux';
import { registerAction, redirectAction } from '../../store/actions/authActions'
import { requester } from '../../infrastructure';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            country: '',

            touched: {
                username: false,
                email: false,
                password: false,
                confirmPassword: false,
                firstName: false,
                lastName: false,
                country: false,
            }
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.registerError.hasError && prevProps.registerError !== this.props.registerError) {
    
            toast.error(<ToastComponent.errorToast text={this.props.registerError.message} />, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000
            });
        } else if (this.props.registerSuccess) {
    
            this.props.redirect();
    
            toast.success(<ToastComponent.successToast text={this.props.registerMessage} />, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000
            });
    
            this.props.history.push('/login');
        }
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            return;
        }

        const { touched, ...otherProps } = this.state;
        this.props.register(otherProps)
    }

    canBeSubmitted() {
        const { username, email, firstName, lastName, password, confirmPassword, country } = this.state;
        const errors = this.validate(username, email, firstName, lastName, password, confirmPassword, country);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });

    }

/*     mailIsAlreadyRegistrated = () => {
        requester.get
    } */

    validate = (username, email, firstName, lastName, password, confirmPassword, country) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const firstLastNameRegex = /^[A-Z]([a-zA-Z]+)?$/;
        const testEmail = emailRegex.test(email)
        const testFirstName = firstLastNameRegex.test(firstName)
        const testLastName = firstLastNameRegex.test(lastName)
        return {
            username: username.length < 4 || username.length > 16,
            email: email.length === 0 || !testEmail/*  || mailIsAlreadyRegistrated */,
            firstName: firstName.length === 0 || !testFirstName,
            lastName: lastName.length === 0 || !testLastName,
            password: password.length < 4 || password.length > 16,
            confirmPassword: confirmPassword.length === 0 || confirmPassword !== password,
            country: country.length === 0,
        }
    }

    render() {
        const { username, email, firstName, lastName, password, confirmPassword, country } = this.state;
        const errors = this.validate(username, email, firstName, lastName, password, confirmPassword, country);
        const isEnabled = !Object.keys(errors).some(x => errors[x])

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        }

        return (
            <Fragment>
                <section className="pt-3">
                    <div className="container register-form-content-section pb-4 ">
                        <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto', 'paddingTop': '2rem' }}>Register</h1>
                        <div className="hr-styles" style={{ 'width': '70%' }}></div>

                        <form className="Register-form-container" onSubmit={this.onSubmitHandler}>

                            <div className="section-container">
                                <section className="left-section">
                                    <div className="form-group">
                                        <label htmlFor="username" >Username</label>
                                        <input
                                            type="text"
                                            className={"form-control " + (shouldMarkError('username') ? "error" : "")}
                                            id="username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('username')}
                                            aria-describedby="usernameHelp"
                                            placeholder="Enter username"
                                        />
                                        {shouldMarkError('username') && <small id="usernameHelp" className="form-text alert alert-danger"> {(!this.state.username ? 'Username is required!' : 'Username should be at least 4 and maximum 16 characters long!')}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="firstName" >First Name</label>
                                        <input
                                            type="text"
                                            className={"form-control " + (shouldMarkError('firstName') ? "error" : "")}
                                            id="firstName"
                                            name="firstName"
                                            value={this.state.firstName}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('firstName')}
                                            aria-describedby="firstNameHelp"
                                            placeholder="Enter first name"
                                        />
                                        {shouldMarkError('firstName') && <small id="firstNameHelp" className="form-text alert alert-danger">{(!this.state.firstName ? 'First Name is required!' : 'First Name must start with a capital letter and contain only letters!')}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" >Password</label>
                                        <input
                                            type="password"
                                            className={"form-control " + (shouldMarkError('password') ? "error" : "")}
                                            id="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('password')}
                                            aria-describedby="passwordHelp"
                                            placeholder="Enter password"
                                        />
                                        {shouldMarkError('password') && <small id="passwordHelp" className="form-text alert alert-danger">{(!this.state.password ? 'Password is required!' : 'Password should be at least 4 and maximum 16 characters long!')}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmPassword" >Confirm Password</label>
                                        <input
                                            type="password"
                                            className={"form-control " + (shouldMarkError('confirmPassword') ? "error" : "")}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('confirmPassword')}
                                            aria-describedby="confirmPasswordHelp"
                                            placeholder="Confirm your password"
                                        />
                                        {shouldMarkError('confirmPassword') && <small id="confirmPasswordHelp" className="form-text alert alert-danger">Passwords do not match!</small>}
                                    </div>

                                </section>

                                <section className="right-section">
                                    <div className="form-group">
                                        <label htmlFor="email" >Email Address</label>
                                        <input
                                            type="email"
                                            className={"form-control " + (shouldMarkError('email') ? "error" : "")}
                                            id="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('email')}
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email"

                                        />
                                        {shouldMarkError('email') && <small id="emailHelp" className="form-text alert alert-danger">{(!this.state.email ? 'Email is required!' : 'Invalid e-mail address!')}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastName" >Last Name</label>
                                        <input
                                            type="text"
                                            className={"form-control " + (shouldMarkError('lastName') ? "error" : "")}
                                            id="lastName"
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('lastName')}
                                            aria-describedby="lastNameHelp"
                                            placeholder="Enter last name"
                                        />
                                        {shouldMarkError('lastName') && <small id="lastNameHelp" className="form-text alert alert-danger">{(!this.state.lastName ? 'Last Name is required!' : 'Last Name must start with a capital letter and contain only letters!')}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="country" >Country</label>
                                        <input
                                            type="text"
                                            className={"form-control " + (shouldMarkError('country') ? "error" : "")}
                                            id="country"
                                            name="country"
                                            value={this.state.country}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('country')}
                                            aria-describedby="countryHelp"
                                            placeholder="Enter country"
                                        />
                                        {shouldMarkError('country') && <small id="countryHelp" className="form-text alert alert-danger">{(!this.state.country ? 'Country is required!' : '')}</small>}
                                    </div>

                                </section>
                            </div>

                            <div className="text-center">
                                <button disabled={!isEnabled} type="submit" className="btn App-button-primary btn-lg m-3">Register</button>
                            </div>
                        </form>
                    </div>

                </section>
            </Fragment>
        )
    }
};

function mapStateToProps(state) {
    return {
        registerSuccess: state.register.success,
        registerMessage: state.register.message,
        registerError: state.registerError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (userData) =>
            dispatch(registerAction(userData)),
        redirect: () => dispatch(redirectAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
