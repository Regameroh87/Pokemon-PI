import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemons, addTypes } from "./components/Redux/Actions"
import Create from './components/Create/Create'
import PokemonList from './components/PokemonList/PokemonList';
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import { Nav } from './components/Nav/Nav'
import { Routes, Route, useLocation } from 'react-router-dom';


function App() {

  const location= useLocation()
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(addPokemons());
    dispatch(addTypes());
  }, [dispatch]);

  

  return (
    <div className="App">
      {location.pathname === "/home" && (<Nav/>)}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home'element={<PokemonList/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;
