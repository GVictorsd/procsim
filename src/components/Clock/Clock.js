import React from 'react'
import './Clock.css'

const Clock = ({name, style}) => {

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
        </div>
    );
}
export default Clock;