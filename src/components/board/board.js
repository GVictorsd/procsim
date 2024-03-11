import './board.css';
import Register from "../Register/register";
import CPU from "../cpu/cpu";
// import TextEditor from '../textEditor/textEditor';
import InstructionRegister from '../InstructionRegister/InstructionRegister';
import RAM from '../RAM/RAM';
import Clock from '../Clock/Clock';
import Alu from '../../Alu/Alu';
import { useEffect, useState } from 'react';

function Board() {
    // const cpu = new CPU();
    const [cpu, setCPU] = useState(new CPU());
    const [cpuState, setCPUState] = useState(cpu.state);

    // const [PC, setPC] = useState(0);
    // const [AReg, setAReg] = useState(0);
    // const [BReg, setBReg] = useState(0);
    // const [MemAddReg, setMemAddReg] = useState(0);
    // const [Ram, setRam] = useState(new Array(16).fill(0));
    // const [InstReg, setInstReg] = useState(0);
    // const [OutReg, setOutReg] = useState(0);
    // const [Bus, setBus] = useState(0);
    // const [zero, setZero] = useState(false);
    // const [carry, setCarry] = useState(false);

    // useEffect(() => {
    //     setPC(cpu.state.PC);
    //     setAReg(cpu.state.AReg);
    //     setBReg(cpu.state.BReg);
    //     setMemAddReg(cpu.state.MemAddReg);
    //     setRam(cpu.state.Ram);
    //     setInstReg(cpu.state.InstReg);
    //     setOutReg(cpu.state.OutReg);
    //     setBus(cpu.state.Bus);
    //     setZero(cpu.state.zero);
    //     setCarry(cpu.state.carry);
    // }, [cpu.state.PC]);

//     useEffect(() => {
//     const updateStateFromCpu = () => {
//       setPC(cpu.state.PC);
//       setAReg(cpu.state.AReg);
//       setBReg(cpu.state.BReg);
//       setMemAddReg(cpu.state.MemAddReg);
//       setRam([...cpu.state.Ram]); // Copy the array to avoid mutating state
//       setInstReg(cpu.state.InstReg);
//       setOutReg(cpu.state.OutReg);
//       setBus(cpu.state.Bus);
//       setZero(cpu.state.zero);
//       setCarry(cpu.state.carry);
//     };

//     updateStateFromCpu();
//   }, [cpu.state]);

    var PC = cpu.state.PC;
    var AReg = cpu.state.AReg;
    var BReg = cpu.state.BReg;
    var MemAddReg = cpu.state.MemAddReg;
    var Ram = cpu.state.Ram;
    var InstReg = cpu.state.InstReg;
    var OutReg = cpu.state.OutReg;
    var Bus = cpu.state.Bus;
    var zero = cpu.state.zero;
    var carry = cpu.state.carry;


    // useEffect(() => {
    //     setPC(cpu.state.PC);
    //     setAReg(cpu.state.AReg);
    //     setBReg(cpu.state.BReg);
    //     setMemAddReg(cpu.state.MemAddReg);
    //     setRam(cpu.state.Ram);
    //     setInstReg(cpu.state.InstReg);
    //     setOutReg(cpu.state.OutReg);
    //     setBus(cpu.state.Bus);
    //     setZero(cpu.state.zero);
    //     setCarry(cpu.state.carry);
    // }, [cpu.state.PC, cpu.state.AReg,cpu.state.BReg, cpu.state.MemAddReg, cpu.state.Ram, cpu.state.InstReg, cpu.state.OutReg, cpu.state.Bus, cpu.state.zero, cpu.state.carry]);

    function reset() {
        cpu.reset();
        loadprogram();
        setCPUState(cpu.state);
        console.log(cpu.state);
    }
    function clock() {
        cpu.clock();
        setCPUState(cpu.state);
        console.log(cpu.state);
    }
    function loadprogram() {
        var ram = new Array(16).fill(0);
        ram[0] = 0x12;
        ram[2] = 0x34;
        cpu.bulkLoadRam(ram);
    }

    // var a = 0;

    return (
        <div className="Board">
            {/* <button onClick={count}>Count</button> */}
            {/* <button onClick={execute}>Execute</button>
            <button onClick={clock}>clock</button>
            <button onClick={loadprogram}>Load</button>
            <TextEditor code={code} style={{top: "50px"}} language="custom-highlight" /> */}

            {/* <Register data={9} wordSize={8}/> */}
            <Register name={'Program Counter'} data={PC} wordSize={4} style={{gridColumn: '1 / span 1', gridRow: '1 / span 1'}}/>
            <RAM name="RAM" address={MemAddReg} data={MemAddReg} style={{gridColumn: '1 / span 1', gridRow: '2 / span 2'}} />
            <InstructionRegister name={'Instruction Register'} instruction={InstReg} flags={{zero:zero, carry:carry}} style={{gridColumn: '1 / span 1', gridRow: '4 / span 2'}}/>
            <Clock name={'Clock'} reset={reset} clock={clock} style={{gridColumn: '1 / span 1', gridRow: '6 / span 1'}} />

            <Register name={'A-Register'} data={AReg} wordSize={8} style={{gridColumn: '3 / span 1', gridRow: '1 / span 1'}}/>
            <Alu name={'ALU'} adata={AReg} bdata={BReg} result={0} style={{gridColumn: '3 / span 1', gridRow: '2 / span 2'}} />

            <Register name={'B-Register'} data={BReg} wordSize={8} style={{gridColumn: '3 / span 1', gridRow: '4 / span 1'}}/>
            <Register name={'Output Register'} data={OutReg} wordSize={8} style={{gridColumn: '3 / span 1', gridRow: '5 / span 2'}}/>

        </div>
    );
}

export default Board;
