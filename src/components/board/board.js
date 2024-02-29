import './board.css';
import Register from "../Register/register";
import CPU from "../cpu/cpu";
import TextEditor from '../textEditor/textEditor';

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
            <Register data={9} />
        </div>
    );
}

export default Board;
