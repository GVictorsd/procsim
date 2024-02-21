import CPU from "../cpu/cpu";
import CodeHighlighter from "../textEditor/textEditor";

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
            <button onClick={execute}>Execute</button>
            <button onClick={clock}>clock</button>
            <button onClick={loadprogram}>Load</button>
            {/* <TextEditor/> */}
            <CodeHighlighter code={code} language="custom-highlight" />
        </div>
    );
}

export default Board;
