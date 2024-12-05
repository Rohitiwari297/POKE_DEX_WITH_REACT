import axios from "axios"
import { useEffect, useState } from "react";

function usePokemonList(type) {
    //Upar wale sabhi states ko ek objects me manage kiya ja rha hai -> Managing the all state with the Creating Object of states
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: '',
    })

    async function downloadPokemons() {

        //iterating over the array of pokemon, and using their url, to create an array of promises
        //that will download those 20 pokemons

            //setIsLoading(true)  //State manage krne ke pahale
            setPokemonListState({ ...pokemonListState, isLoading: true });  //States manage krne ke bad

            //Fatching the Pokemon through Poke links using AXIOS method
            const response = await axios.get(pokemonListState.pokedexUrl);  //States manage krne ke bad

            // we get the array of pokemons from result
            const pokemonResults = response.data.results;

            console.log(response.data.pokemon);

            setPokemonListState((state) => ({
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous
            }))  //New way

            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

            //passing that promise array to axios.all
            const pokemonData = await axios.all(pokemonResultPromise); //array of 20 pokemon  detailed data
            console.log(pokemonData)

            //Now iterate on the data each pokemon, extract id, name, types

            const pokeListReasult = pokemonData.map(pokeData => {
                const pokemon = pokeData.data;

                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other.dream_world.front_default,
                    types: pokemon.types
                }
            })
            console.log(pokeListReasult)

            setPokemonListState((state) => ({
                ...state,
                pokemonList: pokeListReasult,
                isLoading: false
            }))
        

    }


    useEffect(() => {
        downloadPokemons()
    }, [pokemonListState.pokedexUrl])

    return [pokemonListState, setPokemonListState]


}

//Export
export default usePokemonList;