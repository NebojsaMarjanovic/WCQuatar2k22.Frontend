import './App.css';
import GrupeCard from './components/GrupeCard';
import StadionCard from './components/StadionCard';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import GrupnaFazaCard from './components/GrupnaFazaCard';
import ZakaziUtakmicuCard from './components/ZakaziUtakmicuCard';
import UtakmiceCard from './components/UtakmiceCard';


function App() {
  return (
    <BrowserRouter>
    <div className='root'>
      <NavigationBar/>
      <Routes>
        
      <Route
            path="/"
            element={
              <>
                <div className='jumbotron'>
                {/* <h1 className="jumbotronNaslov"><b><i>Svetsko prvenstvo u fudbalu 2022.</i></b></h1>
                <p className="lead">Katar. <br />Rezervišite svoje putovanje sa najboljom ekipom i pouzdanim vodičima.</p> */}
                </div>
                <StadionCard/>
                <GrupeCard/>
              </>
            }
        />
         <Route
            path="/grupnaFaza"
            element={
              <>
                <GrupnaFazaCard/>
              </>
            }
        />
         <Route
            path="/zakaziUtakmicu"
            element={
              <>
                <ZakaziUtakmicuCard/>
              </>
            }
        />
          <Route
            path="/utakmice"
            element={
              <>
              <UtakmiceCard/>
              </>
            }
        />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
