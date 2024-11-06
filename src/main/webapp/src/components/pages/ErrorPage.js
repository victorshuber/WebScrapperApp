import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { userService } from '../../infrastructure'

export default class ErrorPage extends Component {
    constructor(props) {
        super(props)
    }
    render = () => {
        let isAuthenticated = userService.isAuthenticated();
        const errorClass = isAuthenticated ? '': 'error-page-content-section-unauthorized';
        
        return (
            <article className="main-article-shared-content">
                <section className={`error-page-content-section ${errorClass}`}>
                    <div className="container error-page-container text-center col-md-12 text-center mb-5">
                        <h1 className="text-center  mt-4" style={{ 'margin': '1rem auto' }}>This page isn't available</h1>

                        <h3>The link you followed may be broken, or the page may have been removed.</h3>


                        <div className="text-center mt-5">

                            <NavLink
                                className="btn App-button-primary btn-lg m-3"
                                to="/"
                                role="button">
                                Go to Home
                            </NavLink>
                        </div>
                    </div>
                </section>
            </article>
        )
    }
}

