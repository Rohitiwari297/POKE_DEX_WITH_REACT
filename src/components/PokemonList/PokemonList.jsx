import { useEffect, useState } from "react"
import axios from "axios"
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon') ;

    //Next and Prev State Mapping
    const [nextUrl, setNextUrl] = useState('')
    const [prevUrl, setPrevUrl] = useState('')

    


    async function downloadPokemons() {

        setIsLoading(true)

        //Fatching the Pokemon through Poke links using AXIOS method
        const response = await axios.get(pokedexUrl) //this downloads list of 20 pokemons

        // we get the array of pokemons from result
        const pokemonResults = response.data.results;

        console.log(response.data);

        //Next & Prev
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)

        //iterating over the array of pokemon, and using their url, to create an array of promises
        //that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        //passing that promise array to axios.all
        const pokemonnData = await axios.all(pokemonResultPromise); //array of 20 pokemon  detailed data
        console.log(pokemonnData)

        //Now iterate on the data each pokemon, extract id, name, types

        const pokeListReasult = pokemonnData.map(pokeData =>{
            const pokemon = pokeData.data;

            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: pokemon.sprites.other.dream_world.front_default, 
                types: pokemon.types
            }
        })
        console.log(pokeListReasult)
        setPokemonList(pokeListReasult)
        setIsLoading(false)

    }
    
    //UseEffect expacts two arguments one is -> callBack function & Second is -> Dependency array {useEffect( ()=> {} , [] )} 
    useEffect(()=> {
        downloadPokemons()
    }, [pokedexUrl])



    return (
        <div className="pokemon-list-wrapper">
           {/* <div>Pokemon List</div> */}
           <div className="pokemon-wrapper">
                {(isLoading) ? 'Loading....' : 
                    pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} /> )}
           </div>

           <div className="controls">
                <button disabled = {prevUrl == null} onClick={ () => setPokedexUrl(prevUrl) } >Prev</button>
                <button disabled = {nextUrl == null} onClick={ () => setPokedexUrl(nextUrl)} >Next</button>
           </div>
        </div>
    )

}

//Export
export default PokemonList