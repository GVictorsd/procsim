import React from 'react'
import './Clock.css'

const Clock = ({name, reset, clock, style}) => {

    const regContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'var(--dark-2)',
        minHeight: '100px',
        minWidth: '200px',
        border: '2px solid var(--light-1)',
        borderRadius: '5px',
        ...style
    }
    return (
        <div className="reg-container" style={regContainerStyle}>
            <h1 style={{fontSize: 'var(--font-medium)'}}>{name ||'Clock'}</h1>
            {/* <div>
                <div>Reset</div>
                <div>Clock</div>
            </div> */}
            <button onClick={reset}>Reset</button>
            <button onClick={clock}>Clock</button>
        </div>
    );
}
export default Clock;