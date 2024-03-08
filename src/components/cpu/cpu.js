
class CPU {
    constructor () {
        this.instCycleCount = 0;
        this.bulkLoadRam = this.bulkLoadRam.bind(this);

        this.state = {
            PC: 0,
            AReg: 0,
            BReg: 0,
            MemAddReg: 0,
            Ram: new Array(16).fill(0),
            InstReg: 0,
            OutReg: 0,
            Bus: 0,

            // Flags
            zero: false,
            carry: false,

            // Control Signals
            hlt: false,
            marwa:false,
            ramwa: false,
            ramoa: false,
            inregoa: false,
            inregwa: false,
            awa: false,
            aoa: false,
            sumout: false,
            sub: false,
            bwa: false,
            outregwa: false,
            pcinc: false,
            pcoe: false,
            pcjmp: false,
            flagsin: false,
        }
    }

    reset = () => {
        this.setState({
            PC: 0,
            AReg: 0,
            MemAddReg: 0,
            Ram: new Array(16).fill(0),
            InstReg: 0,
            OutReg: 0,
            Bus: 0,

            // Flags
            zero: false,
            carry: false,

            // Control Signals
            hlt: false,
            marwa:false,
            ramwa: false,
            ramoa: false,
            inregoa: false,
            inregwa: false,
            awa: false,
            aoa: false,
            sumout: false,
            sub: false,
            bwa: false,
            outregwa: false,
            pcinc: false,
            pcoe: false,
            pcjmp: false,
            flagsin: false,
        });

    }

    resetControlSignals = () => {
        this.setState({
            hlt: false,
            marwa:false,
            ramwa: false,
            ramoa: false,
            inregoa: false,
            inregwa: false,
            awa: false,
            aoa: false,
            sumout: false,
            sub: false,
            bwa: false,
            outregwa: false,
            pcinc: false,
            pcoe: false,
            pcjmp: false,
            flagsin: false,
        });
    }

    loadRam = (val, addr) => {
        // set a single byte in Ram at a given address
        this.state.Ram[addr] = val;
    }
    bulkLoadRam = (mem) => {
        // Load Ram with an array of 16 bytes
        if(mem?.length !== 16){
            console.log("Invalid memory format");
            return;
        }
        this.setState({
            Ram: mem,
        });
    }

    clock = () => {
        if(this.state.hlt){
            console.log("Halted");
            return;
        }

        console.log(this.state);
        let inst = this.state.Ram[this.state.PC];
        console.log("inst", inst);
        this.setState({
            InstReg: inst,
        });
        this.evalInst(inst);
    }

    setState = (newState) => {
        this.state = {...this.state, ...newState};
    }

    evalInst = (inst) => {
        let opcode = inst >> 4;
        let operand = inst & 0xF;
        this.resetControlSignals();

        switch(opcode){
            case 0:
            // no operation (NOP)
                this.setState({
                    pcinc: true,
                    PC: this.state.PC + 1,
                });
                this.instCycleCount = 0;
                console.log("NOP")
                break

            case 1:
            // Load A (LDA)
                console.log("LDA", this.instCycleCount)
                if(this.instCycleCount === 0){
                    console.log(1)
                    this.setState({
                        marwa: true,
                        inregoa: true,
                        Bus: operand,
                    });
                }
                else if(this.instCycleCount === 1){
                    console.log(2)
                    this.setState({
                        MemAddReg: this.state.Bus,
                        Bus: this.state.Ram[this.state.Bus],
                        ramoa: true,
                        awa: true,
                    });
                }
                else if(this.instCycleCount === 2){
                    console.log(3)
                    this.setState({
                        AReg: this.state.Bus,

                        pcinc: true,
                        PC: this.state.PC + 1,
                    });
                    this.instCycleCount = 0;
                }
            break;

            case 2:
            // Add A (ADD)
                console.log("ADD", this.instCycleCount)
                if(this.instCycleCount === 0){
                    this.setState({
                        marwa: true,
                        inregoa: true,
                        Bus: operand,
                    });
                }
                else if(this.instCycleCount === 1){
                    this.setState({
                        MemAddReg: this.state.Bus,
                        Bus: this.state.Ram[this.state.Bus],
                        ramoa: true,
                        bwa: true,
                    });
                }
                else if(this.instCycleCount === 2){
                    this.setState({
                        BReg: this.state.Bus,
                        awa: true,
                        flagsin: true,
                        sumout: true,
                    });
                }
                else if(this.instCycleCount === 3){
                    this.setState({
                        Bus: (this.state.AReg + this.state.BReg)&0xFF,
                        zero: this.state.Bus === 0,
                        carry: (this.state.AReg + this.state.BReg) > 255,
                        AReg: (this.state.AReg + this.state.BReg)&0xFF,

                        pcinc: true,
                        PC: this.state.PC + 1,
                    });
                    this.instCycleCount = 0;
                }
            break;

            case 3:
            // Sub A (SUB)
                console.log("sub", this.instCycleCount)
                if(this.instCycleCount === 0){
                    this.setState({
                        marwa: true,
                        inregoa: true,
                        Bus: operand,
                    });
                }
                else if(this.instCycleCount === 1){
                    this.setState({
                        MemAddReg: this.state.Bus,
                        Bus: this.state.Ram[this.state.Bus],
                        ramoa: true,
                        bwa: true,
                    });
                }
                else if(this.instCycleCount === 2){
                    this.setState({
                        BReg: this.state.Bus,
                        awa: true,
                        flagsin: true,
                        sumout: true,
                        sub: true,
                    });
                }
                else if(this.instCycleCount === 3){
                    this.setState({
                        // TODO: Perform proper 2's complement subtraction
                        Bus: (this.state.AReg + this.state.BReg)&0xFF,
                        zero: this.state.Bus === 0,
                        carry: (this.state.AReg + this.state.BReg) > 255,
                        AReg: (this.state.AReg - this.state.BReg)&0xFF,

                        pcinc: true,
                        PC: this.state.PC + 1,
                    });
                    this.instCycleCount = 0;
                }
            break;

            case 4:
            // Store A (STA)
                console.log("STA", this.instCycleCount)
                if(this.instCycleCount === 0){
                    this.setState({
                        marwa: true,
                        inregoa: true,
                        Bus: operand,
                    });
                }
                else if(this.instCycleCount === 1){
                    this.setState({
                        MemAddReg: this.state.Bus,
                        Bus: this.AReg,
                        ramwa: true,
                        aoa: true,
                    });
                }
                else if(this.instCycleCount === 2){
                    this.setState({
                        Ram: this.state.Ram.map((val, index) => {
                            if(index === this.state.MemAddReg){
                                return this.state.Bus;
                            }
                            return val;
                        }),

                        pcinc: true,
                        PC: this.state.PC + 1,
                    });
                    this.instCycleCount = 0;
                }
            break;
            default:
                break


        }
        this.instCycleCount += 1;
    }
}

export default CPU;