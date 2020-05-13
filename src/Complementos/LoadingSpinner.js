import React, {Fragment} from 'react';

const LoadingSpinner = () => (
    <Fragment>
        <div className="spinner-border text-danger text-center m-5" role="status" style={{width: "4rem", height: "4rem"}}>
            <span className="sr-only">Loading...</span>
        </div>
    </Fragment>
);

export default LoadingSpinner;
