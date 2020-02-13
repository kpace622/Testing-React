import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import { getData } from "../api";
import "./star-wars-characters.css";

export default function StarWarsCharacters() {
  const [url, setUrl] = useState("https://swapi.co/api/people");
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const getCharacters = async () => {
      const characters = await getData(url);
      console.log(characters);
      setNext(characters.next);
      setPrevious(characters.previous);
      setCharacters(characters.results);
      setIsLoading(false);
    };
    getCharacters();
  }, [url]);

  const goToNext = e => {
    e.preventDefault();
    setUrl(next);
  };

  const goToPrevious = e => {
    e.preventDefault();
    setUrl(previous);
  };


// this functions toggles the dropdown on and off
  const handleDropdown = () => {
    document.getElementById('myDropdown').classList.toggle('show');
    document.getElementById('myDropdown').classList.toggle('dropdown-content')
}


//The following four functions change the API call to the respective element: people, planets, starships, and vehicles
const handlePeople = () => {
    setUrl('https://swapi.co/api/people')
    document.getElementById('myDropdown').classList.toggle('dropdown-content');
}

const handlePlanets = () => {
  setUrl('https://swapi.co/api/planets')
  document.getElementById('myDropdown').classList.toggle('dropdown-content');
}

const handleStarships = () => {
  setUrl('https://swapi.co/api/starships')
  document.getElementById('myDropdown').classList.toggle('dropdown-content');
}

const handleVehicles = () => {
  setUrl('https://swapi.co/api/vehicles')
  document.getElementById('myDropdown').classList.toggle('dropdown-content');
}

  return (
    <div>
      <div className='dropdown'>
            <button onClick={handleDropdown}>Sort Data</button>
            <div id='myDropdown' className='dropdown-content'>
                <button onClick={handlePeople} className='links'>People</button>
                <button onClick={handlePlanets} className='links' >Planets</button>
                <button onClick={handleStarships} className='links' >Starships</button>
                <button onClick={handleVehicles} className='links' >Vehicles</button>
            </div>
        </div>
      {isLoading ? (
        <Loader
          type="ThreeDots"
          color="#FFC402"
          height={30}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <>
          {characters.map(character => (
            <div className='character' key={character.url}>{character.name}</div>
          ))}
        </>
      )}
      <div className="buttons">
        <button onClick={goToPrevious} disabled={!previous}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!next}>
          Next
        </button>
      </div>
    </div>
  );
}
