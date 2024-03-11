import React, { useState } from 'react'
import './InstructionRegister.css'

const InstructionRegister = ({name, instruction, style, flags}) => {
    // flags: {zero: 0, carry: 0}
    const [instructionData, setInstructionData] = useState(instruction);
    const [flagsData, setFlagsData] = useState(flags);

    const clipedinst = Math.max(0, Math.min(instruction, 255));
    const binaryString = clipedinst.toString(2).padStart(8, '0');
    const instBits = binaryString.split('');

    const instMap = [
        'nop',
        'lda',
        'add',
        'sub',
        'sta',
    ]
    const opcode = clipedinst >> 4; 
    const data = clipedinst & 0x0f;

    useState(() => {
        setInstructionData(instruction);
        setFlagsData(flags);
    }, [instruction, flags?.zero, flags?.carry])

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
            <h1 style={{fontSize: 'var(--font-medium)'}}>{name || 'Instruction Register'}</h1>

            <div style={{fontSize: 'var(--font-small)'}}>{'Instruction'}</div>
            <br/>
            <div className='bits-container'>
                {instBits.map((bit, index) => (
                    <div key={index}>
                        <div className={`bits ${bit === '1' ? 'set' : 'reset'}`}></div>
                        {index===3 && <div style={{width: '5px'}}/>}
                    </div>
                ))}
            </div>
            <div style={{fontSize: 'var(--font-large)', height: 'fit-content'}}>
                {`${instMap[opcode]} ${data}`}
            </div>
            <br/>
            <hr style={{width: '75%', opacity: '0.5'}} />


            <div style={{fontSize: 'var(--font-small)'}}>{'flags'}</div>
            <div className='bits-container'>
                <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
                    <div className={`bits ${flagsData?.zero ? 'set' : 'reset'}`}></div>
                    zero
                </div>
                <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
                    <div className={`bits ${flagsData?.carry ? 'set' : 'reset'}`}></div>
                    carry
                </div>
            </div>
            <br/>
        </div>
    );
}
export default InstructionRegister;