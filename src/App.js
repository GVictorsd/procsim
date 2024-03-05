import './App.css';
import Board from './components/board/board';
import TextEditor from './components/textEditor/textEditor';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='main-pane'>
          <Board />
        </div>
        <div className='side-pane'>
          {/* <TextEditor /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
