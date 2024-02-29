import React from 'react'
import './register.css'

const Register = ({name, data, style}) => {
    // Ensure the number is within 8-bit range
    const eightBitNumber = Math.max(0, Math.min(data , 255));
    // Convert the number to its 8-bit binary representation
    const binaryString = eightBitNumber.toString(2).padStart(8, '0');
    // Split the binary string into an array of individual bits
    const bits = binaryString.split('');

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
            <div><h3>{name ||'Register'}</h3></div>
            <div className='bits-container'>
                <div className={`bits ${bits[0]==='1'? 'set': 'reset'}`} ></div>
                <div className={`bits ${bits[1]==='1'? 'set': 'reset'}`}></div>
                <div className={`bits ${bits[2]==='1'? 'set': 'reset'}`}></div>
                <div className={`bits ${bits[3]==='1'? 'set': 'reset'}`}></div>
                <div style={{width: '5px'}}></div>
                <div className={`bits ${bits[4]==='1'? 'set': 'reset'}`}></div>
                <div className={`bits ${bits[5]==='1'? 'set': 'reset'}`}></div>
                <div className={`bits ${bits[6]==='1'? 'set': 'reset'}`}></div>
                <div className={`bits ${bits[7]==='1'? 'set': 'reset'}`}></div>
            </div>
            <div style={{fontSize: '5ch', height: 'fit-content'}}>
                {data}
            </div>
            <div>
                <span>{bits[0]}</span>
                <span>{bits[1]}</span>
                <span>{bits[2]}</span>
                <span>{bits[3]}</span>
                <span>{bits[4]}</span>
                <span>{bits[5]}</span>
                <span>{bits[6]}</span>
                <span>{bits[7]}</span>
            </div>
        </div>
    );
}
export default Register;

// class EightBitRegister extends React.Component {
//   render() {
//     const number = this.props || 0;

//     // Ensure the number is within 8-bit range
//     const eightBitNumber = Math.max(0, Math.min(number, 255));

//     // Convert the number to its 8-bit binary representation
//     const binaryString = eightBitNumber.toString(2).padStart(8, '0');

//     // Split the binary string into an array of individual bits
//     const bits = binaryString.split('');

//     return (
//         `
//         <div className="eight-bit-register">
//             <span>${bits[0]}</span>
//             <span>${bits[1]}</span>
//             <span>${bits[2]}</span>
//             <span>${bits[3]}</span>
//             <span>${bits[4]}</span>
//             <span>${bits[5]}</span>
//             <span>${bits[6]}</span>
//             <span>${bits[7]}</span>
//         </div>
//         `
//     );
//   }
// }

// export default EightBitRegister;
