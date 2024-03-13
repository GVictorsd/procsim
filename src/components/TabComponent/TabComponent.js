
import React, { useState } from 'react';
import './TabComponent.css';
import TextEditor from '../textEditor/textEditor';

const TabsComponent = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [assembledOutput, setAssembledOp] = useState('');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const instOpcodeMap = {
        nop: 0x0,
        lda: 0x1,
        add: 0x2,
        sub: 0x3,
        sta: 0x4,
        ldi: 0x5,
        jmp: 0x6,
        jc: 0x7,
        jz: 0x8,
        out: 0xe,
        hlt: 0xf,
    }

    const assembler = (text) => {
        var result = {
            status: true,
            program: [],
            msg: ""
        };
        const instructions = text.split('\n');
        if(instructions.length > 16) {
            result.status = false;
            result.msg = `Instructions exceed RAM size (16 instructions)`
            return result;
        }
        instructions.forEach(instruction => {
            const [inst, operand] = instruction.split(' ');
            const opcode = instOpcodeMap[inst];
            if(!opcode) {
                result.status = false;
                result.msg = `Invalid Instruction: ${inst}`
                return result;
            }
            const data = Number.parseInt(operand);
            if(!data) {
                result.status = false;
                result.msg = `Invalid Operand: ${operand}`
                return result;
            }
            else if(data < 0 || data > 15) {
                result.status = false;
                result.msg = `Operand should be a 4 bit number: ${operand}`
                return result;
            }

            result.program.push((opcode << 4) + data);
        });
        return result;
    }

    const loadProgram = () => {
        // TODO: get program, assemble and load into ram
    }
    const textChange = (text) => {
        var res = assembler(text);
        console.log(res);
        setAssembledOp(res.status? res.program: res.msg);
    }

    return (
        <div className="tabs-container">
            <div className='tab-options-cnt'>
                <div className='tab-option' onClick={loadProgram} >Assemble & Load</div>
                <div className='tab-option'>Examples</div>
            </div>
        <div className="tabs">
            <button
            className={activeTab === 'tab1' ? 'active' : ''}
            onClick={() => handleTabClick('tab1')}>
                Code
            </button>
            <button
            className={activeTab === 'tab2' ? 'active' : ''}
            onClick={() => handleTabClick('tab2')}>
                Reference
            </button>
        </div>
        <hr style={{width: '80%'}} />

        <div className="tab-content">
            {activeTab === 'tab1' && (
            <div className='text-editor-cnt'>
                <TextEditor language={'custom-highlight'} onTextChange={textChange} style={{width: '50%'}} />

                <div className='assembled-output'>
                    {assembledOutput}
                </div>
            </div>
            )}
            {activeTab === 'tab2' && (
            <div>
                <h2>Tab 2 Content</h2>
                <p>This is the content for Tab 2.</p>
            </div>
            )}
        </div>
        </div>
    );
};

export default TabsComponent;
