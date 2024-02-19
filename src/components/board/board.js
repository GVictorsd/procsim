import CPU from "../cpu/cpu";

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

    return (
        <div className="Board">
            <button onClick={execute}>Execute</button>
            <button onClick={clock}>clock</button>
            <button onClick={loadprogram}>Load</button>
        </div>
    );
}

export default Board;
