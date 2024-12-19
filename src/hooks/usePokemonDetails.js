import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonDetails(id, pokemonName) {
  //console.log(id)

  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    //try-catch
    try {
      let response;
      if (pokemonName) {
        //console.log('fetching by name')
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

      } else {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      }

      //console.log(response)
      const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`)

      //console.log('s', pokemonOfSameTypes)
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
        similarPokemons: pokemonOfSameTypes.data.pokemon    //.slice(0, 5)
      });

      setPokemonListState({ ...pokemonListState, type: response.data.types ? response.data.types[0].type.name : '' })

    } catch (error) {
      console.log("Something went wrong")
    }
    //
  }

  const [pokemonListState, setPokemonListState] = useState({});


  useEffect(() => {
    downloadPokemon();
    console.log("List", pokemonListState);
  }, []);

  return [pokemon];
}

//
export default usePokemonDetails;