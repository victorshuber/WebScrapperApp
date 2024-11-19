import React from 'react';

export default {
    successToast: ({ text, closeToast }) => {
        return (
            <div className="container-fluid p-5 text-center" style={{'MozAnimationPlayState': 'running'}}>
                <div className="row">
                    <div className="col-md-1">
                        <div style={{ 'fontSize': '25px' }}>
                            <i className="fas fa-check"></i>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div>{text}</div>
                    </div>
                </div>
            </div>
        )
    },

    errorToast: ({ text, closeToast }) => {
        return (
            <div className="container-fluid p-5 text-center" style={{'MozAnimationPlayState': 'running'}}>
                <div className="row">
                    <div className="col-md-1">
                        <div style={{ 'fontSize': '25px' }}>
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="font-weight-bold">Error!</div>
                        <div>{text}</div>
                    </div>
                </div>
            </div>
        )
    },

    infoToast: ({ text, closeToast }) => {
        return (
            <div className="container-fluid p-5 text-center" style={{'MozAnimationPlayState': 'running'}}>
                <div className="row">
                    <div className="col-md-1">
                        <div style={{ 'fontSize': '25px' }}>
                            <i className="fas fa-info-circle"></i>
                        </div>
                    </div>
                    <div className="col-md-10"></div>
                        <div>{text}</div>
                </div>
            </div>
        )
    }
};



