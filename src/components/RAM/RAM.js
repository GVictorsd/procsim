import React from 'react'
import './RAM.css'

const RAM = ({name, address, data, style}) => {

    // const clipAddress = Math.max(0, Math.min(data , 15));
    // const binAddress = clipAddress.toString(2).padStart(4);
    // const Addressbits = binAddress.split('');
    const getBits = (data, wordSize) => {
        const clipedNumber = Math.max(0, Math.min(data , wordSize===4? 15: 255));
        const binaryString = clipedNumber.toString(2).padStart(wordSize===4? 4: 8, '0');
        return binaryString.split('');
    }

    const databits = getBits(data, 8);

    const regContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'var(--dark-2)',
        minHeight: '150px',
        minWidth: '300px',
        border: '2px solid var(--light-1)',
        borderRadius: '5px',
        ...style
    }
    return (
        <div className="reg-container" style={regContainerStyle}>
            <div><h3>{name || 'Register'}</h3></div>

            <div><h4>{'Address:'}</h4></div>
            <div style={{fontSize: '3ch', height: 'fit-content'}}>
                {`${address}`}
            </div>
            <div>
                {`0x${address.toString(16)}`}
            </div>

            <div><h4>{'Data:'}</h4></div>
            <div className='bits-container'>
                {databits.map((bit, index) => (
                    <>
                        <div key={index} className={`bits ${bit === '1' ? 'set' : 'reset'}`}></div>
                        {index===3 && <div style={{width: '5px'}}/>}
                    </>
                ))}
            </div>
            <div style={{fontSize: '5ch', height: 'fit-content'}}>
                {`${data}`}
            </div>
            <div>
                {`0x${data.toString(16)}`}
            </div>
        </div>
    );
}
export default RAM;