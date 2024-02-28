import './App.css';
import Header from './components/header';
import SearchBox from './components/searchbox';

function App() {
    return (
        <div className="container">
            <div className="row">
                <Header></Header>
                <SearchBox></SearchBox>
            </div>
        </div>

  );
}

export default App;
