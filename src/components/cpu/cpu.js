
import React, {Component} from 'react'

class CPU extends Component {
    constructor (props) {
        super(props);

        this.instCycleCount = 0;


        this.state = {
            PC: 0,
            AReg: 0,
            MemAddReg: 0,
            Ram: [],
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
        this.state.Ram.length = 16;
    }

    reset = () => {
        this.setState({
            PC: 0,
            AReg: 0,
            MemAddReg: 0,
            Ram: [],
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


    evalInst = (inst) => {
        let opcode = inst >> 4;
        let operand = inst & 0xF;
        this.resetControlSignals();

        switch(opcode){
            case 0:
            // no operation (NOP)
                break

            case 1:
            // Load A (LDA)
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
                        awa: true,
                    });
                }
                else if(this.instCycleCount === 2){
                    this.setState({
                        AReg: this.state.Bus,
                    });
                    this.instCycleCount = 0;
                }
            break;

            case 2:
            // Add A (ADD)
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
                    });
                    this.instCycleCount = 0;
                }
            break;

            case 3:
            // Sub A (SUB)
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
                    });
                    this.instCycleCount = 0;
                }
            break;
            default:
                break

        }
    }
}

export default CPU;