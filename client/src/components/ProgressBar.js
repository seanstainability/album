import React from "react";
import './ProgressBar.css';

const ProgressBar = ({ percent }) => {
    return (
        <>
            <div className='progress-bar--boundary'>
                <div className='progress-bar--gauge' style={{ width: `${percent}%` }}></div>
            </div>
        </>
    )
}

export default ProgressBar;