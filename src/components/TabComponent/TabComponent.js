
import React, { useState } from 'react';
import './TabComponent.css';
import TextEditor from '../textEditor/textEditor';

const TabsComponent = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="tabs-container">
        <div className="tabs">
            <button
            className={activeTab === 'tab1' ? 'active' : ''}
            onClick={() => handleTabClick('tab1')}>
                Tab 1
            </button>
            <button
            className={activeTab === 'tab2' ? 'active' : ''}
            onClick={() => handleTabClick('tab2')}>
                Tab 2
            </button>
        </div>
        <hr style={{width: '80%'}} />

        <div className="tab-content">
            {activeTab === 'tab1' && (
            <div className='text-editor-cnt'>
                <TextEditor />
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
