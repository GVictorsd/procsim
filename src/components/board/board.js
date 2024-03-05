import './board.css';
import Register from "../Register/register";
import CPU from "../cpu/cpu";
// import TextEditor from '../textEditor/textEditor';
import InstructionRegister from '../InstructionRegister/InstructionRegister';
import RAM from '../RAM/RAM';
import Clock from '../Clock/Clock';

function Board() {
    const cpu = new CPU();

    function init() {
        cpu.reset();
    }
    function execute() {
        cpu.clock();
    }
    function clock() {
        cpu.clock();
    }
    function loadprogram() {
        var ram = new Array(16).fill(0);
        ram[0] = 0x12;
        ram[2] = 0x34;
        cpu.bulkLoadRam(ram);
    }
    const code = 'custom1 hi hi';

    return (
        <div className="Board">
            {/* <button onClick={execute}>Execute</button>
            <button onClick={clock}>clock</button>
            <button onClick={loadprogram}>Load</button>
            <TextEditor code={code} style={{top: "50px"}} language="custom-highlight" /> */}

            {/* <Register data={9} wordSize={8}/> */}
            <Register name={'Program Counter'} data={7} wordSize={4} style={{gridColumn: '1 / span 1', gridRow: '1 / span 1'}}/>
            <RAM name="RAM" address={10} data={253} style={{gridColumn: '1 / span 1', gridRow: '2 / span 2'}} />
            <InstructionRegister name={'Instruction Register'} data={7} wordSize={4} style={{gridColumn: '1 / span 1', gridRow: '4 / span 2'}}/>
            <Clock name={'Clock'} style={{gridColumn: '1 / span 1', gridRow: '6 / span 1'}} />

            <Register name={'A-Register'} data={9} wordSize={8} style={{gridColumn: '3 / span 1', gridRow: '1 / span 1'}}/>

            <Register name={'B-Register'} data={9} wordSize={8} style={{gridColumn: '3 / span 1', gridRow: '4 / span 1'}}/>
            <Register name={'Output Register'} data={9} wordSize={8} style={{gridColumn: '3 / span 1', gridRow: '5 / span 2'}}/>

        </div>
    );
}

export default Board;
