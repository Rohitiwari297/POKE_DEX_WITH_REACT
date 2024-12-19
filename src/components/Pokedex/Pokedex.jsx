import { useEffect, useState } from "react"
import PokemonList from "../PokemonList/PokemonList"
import Search from "../Search/Search"
import './Pokedex.css'
import  PokemonDetails from '../PokemonDetails/PokemonDetails'

function Pokedex() {

    const [searchTerm, setSearchterm] = useState('');


    return (
        <div className="pokedex-wrapper">   
            <Search updateSearchTerm={setSearchterm} />
            {/* {searchTerm} */}
            {(!searchTerm) ? <PokemonList /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm} /> }
        </div>
    )

}

//Export
export default Pokedex