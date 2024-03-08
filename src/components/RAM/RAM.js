import React, { useEffect, useState } from 'react'
import './RAM.css'

const RAM = ({name, address, data, style}) => {

    // const clipAddress = Math.max(0, Math.min(data , 15));
    // const binAddress = clipAddress.toString(2).padStart(4);
    // const Addressbits = binAddress.split('');
    const [DATA, setData] = useState(data);
    const [ADDRESS, setAddress] = useState(address);
    const getBits = (data, wordSize) => {
        const clipedNumber = Math.max(0, Math.min(data , wordSize===4? 15: 255));
        const binaryString = clipedNumber.toString(2).padStart(wordSize===4? 4: 8, '0');
        return binaryString.split('');
    }

    const databits = getBits(data, 8);

    useEffect(() => {
        setData(data);
        setAddress(address);
    }, [data, address])

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
            <h1 style={{fontSize: 'var(--font-medium)'}}>{name || 'Register'}</h1>

            <div style={{fontSize: 'var(--font-small)', height: 'fit-content'}}>{'Address'}</div>
            <div style={{fontSize: 'var(--font-medium2)', height: 'fit-content'}}>
                {`${ADDRESS}`}
            </div>
            <div style={{fontSize: 'var(--font-small)'}}>
                {`0x${ADDRESS.toString(16)}`}
            </div>

            <hr style={{width: '75%', opacity: '0.5'}} />

            <div style={{fontSize: 'var(--font-small)'}}>{'Data'}</div>
            <div className='bits-container'>
                {databits.map((bit, index) => (
                    <>
                        <div key={index} className={`bits ${bit === '1' ? 'set' : 'reset'}`}></div>
                        {index===3 && <div style={{width: '5px'}}/>}
                    </>
                ))}
            </div>
            <div style={{fontSize: 'var(--font-large)', height: 'fit-content'}}>
                {`${DATA}`}
            </div>
            <div style={{fontSize: 'var(--font-medium)'}}>
                {`0x${DATA.toString(16)}`}
            </div>
            <br/>
        </div>
    );
}
export default RAM;