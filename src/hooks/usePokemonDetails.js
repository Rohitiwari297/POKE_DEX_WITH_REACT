import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id){
    //console.log(id)
  
    const [pokemon, setPokemon] = useState({});
    
    let pokemonListHookResponse = []
  
    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        //console.log(response)
        const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`)    
        
        console.log('s', pokemonOfSameTypes)
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
        similarPokemons: pokemonOfSameTypes.data.pokemon.slice(0, 5)
      });

      setPokemonListState({...pokemonListState, type: response.data.types ? response.data.types[0].type.name : ''} )
    }

    const [pokemonListState, setPokemonListState] = usePokemonList();


    useEffect(() => {
        downloadPokemon();
        console.log("List", pokemonListState);
      }, []);

      return [pokemon];
}

//
export default usePokemonDetails;