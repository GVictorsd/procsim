import React from 'react'
import './InstructionRegister.css'

const InstructionRegister = ({name, data, wordSize, style}) => {

    const clipedNumber = Math.max(0, Math.min(data , wordSize===4? 15: 255));
    const binaryString = clipedNumber.toString(2).padStart(wordSize===4? 4: 8, '0');
    const bits = binaryString.split('');

    const regContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'var(--dark-2)',
        minHeight: '200px',
        minWidth: '200px',
        border: '2px solid var(--light-1)',
        borderRadius: '5px',
        ...style
    }
    return (
        <div className="reg-container" style={regContainerStyle}>
            <h1 style={{fontSize: 'var(--font-medium)'}}>{name ||'Register'}</h1>
            <div className='bits-container'>
                {bits.map((bit, index) => (
                    <>
                        <div key={index} className={`bits ${bit === '1' ? 'set' : 'reset'}`}></div>
                        {index===3 && wordSize!==4 && <div style={{width: '5px'}}/>}
                    </>
                ))}
            </div>
            <div style={{fontSize: 'var(--font-large)', height: 'fit-content'}}>
                {data}
            </div>
            <div style={{fontSize: 'var(--font-small)'}}>
                {`0x${data.toString(16)}`}
                {/* {bits.map((bit, index) => (
                    <span key={index}>{bit}</span>
                ))} */}
            </div>
        </div>
    );
}
export default InstructionRegister;