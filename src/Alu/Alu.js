import React, { useEffect, useState } from 'react'
import './Alu.css'

const Alu = ({name, result, adata, bdata, style}) => {

    const[RESULT, setResult] = useState(result);
    const[ADATA, setAdata] = useState(adata);
    const[BDATA, setBdata] = useState(bdata);

    const getBits = (data, wordSize) => {
        const clipedNumber = Math.max(0, Math.min(data , wordSize===4? 15: 255));
        const binaryString = clipedNumber.toString(2).padStart(wordSize===4? 4: 8, '0');
        return binaryString.split('');
    }
    const resultbits = getBits(result, 8);

    useEffect(() => {
        setResult(result);
        setAdata(adata);
        setBdata(bdata);
    }, [result, adata, bdata]);

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
            <h1 style={{fontSize: 'var(--font-medium)'}}>{name || 'ALU'}</h1>

            <div style={{fontSize: 'var(--font-small)', height: 'fit-content'}}>{'A Data'}</div>
            <div style={{fontSize: 'var(--font-small)', height: 'fit-content'}}>
                {`${ADATA}-0x${ADATA.toString(16)}`}
            </div>

            <hr style={{width: '75%', opacity: '0.5'}} />

            <div style={{fontSize: 'var(--font-small)'}}>{'Result'}</div>
            <div className='bits-container'>
                {resultbits.map((bit, index) => (
                    <>
                        <div key={index} className={`bits ${bit === '1' ? 'set' : 'reset'}`}></div>
                        {index===3 && <div style={{width: '5px'}}/>}
                    </>
                ))}
            </div>
            <div style={{fontSize: 'var(--font-large)', height: 'fit-content'}}>
                {`${RESULT}`}
            </div>
            <div style={{fontSize: 'var(--font-medium)'}}>
                {`0x${RESULT.toString(16)}`}
            </div>
            <br/>

            <hr style={{width: '75%', opacity: '0.5'}} />

            <div style={{fontSize: 'var(--font-small)', height: 'fit-content'}}>{'B Data'}</div>
            <div style={{fontSize: 'var(--font-small)', height: 'fit-content'}}>
                {`${BDATA}-0x${BDATA.toString(16)}`}
            </div>
        </div>
    );
}
export default Alu;