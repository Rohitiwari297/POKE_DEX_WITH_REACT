// import { useEffect, useState } from "react"
// import axios from "axios"
// import './PokemonList.css'
// import Pokemon from "../Pokemon/Pokemon";

// function PokemonList() {

//     const [pokemonList, setPokemonList] = useState([]);
//     const [isLoading, setIsLoading] = useState(true)

//     const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon') ;

//     //Next and Prev State Mapping
//     const [nextUrl, setNextUrl] = useState('')
//     const [prevUrl, setPrevUrl] = useState('')

//     // //Upar wale sabhi states ko ek objects me manage kiya ja rha hai -> Managing the all state with the Creating Object of states
//     // const [pokemonListState, setPokemonListState] = useState({
//     //     pokemonList: [],
//     //     isLoading: true,
//     //     pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
//     //     nextUrl: '',
//     //     prevUrl : ''
//     // })


//     async function downloadPokemons() {

//         setIsLoading(true)  //State manage krne ke pahale
//         //setPokemonListState({...pokemonListState, isLoading: true});  //States manage krne ke bad

//         //Fatching the Pokemon through Poke links using AXIOS method
//         const response = await axios.get(pokedexUrl) //this downloads list of 20 pokemons   ->    //State manage krne ke pahale

//         //const response = await axios.get(setPokemonListState.pokedexUrl);  //States manage krne ke bad

//         // we get the array of pokemons from result
//         const pokemonResults = response.data.results;

//         console.log(response.data);

//         //Next & Prev
//         setNextUrl(response.data.next)    // old way
//         setPrevUrl(response.data.previous)

//         // setPokemonListState({
//         //     ...pokemonListState, 
//         //     nextUrl: response.data.next, 
//         //     prevUrl: response.data.previous 
//         // })  //New way


//         //iterating over the array of pokemon, and using their url, to create an array of promises
//         //that will download those 20 pokemons
//         const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

//         //passing that promise array to axios.all
//         const pokemonnData = await axios.all(pokemonResultPromise); //array of 20 pokemon  detailed data
//         console.log(pokemonnData)

//         //Now iterate on the data each pokemon, extract id, name, types

//         const pokeListReasult = pokemonnData.map(pokeData =>{
//             const pokemon = pokeData.data;

//             return {
//                 id: pokemon.id,
//                 name: pokemon.name, 
//                 image: pokemon.sprites.other.dream_world.front_default, 
//                 types: pokemon.types
//             }
//         })
//         console.log(pokeListReasult)
//         setPokemonList(pokeListReasult)  //old way
//         setIsLoading(false)

//         // setPokemonListState({
//         //     ...pokemonListState, 
//         //     pokemonList: pokeListReasult, 
//         //     isLoading: false
//         // })

//     }
    
//     //UseEffect expacts two arguments one is -> callBack function & Second is -> Dependency array {useEffect( ()=> {} , [] )} 
//     useEffect(()=> {
//         downloadPokemons()
//     }, [pokedexUrl])



//     return (
//         <div className="pokemon-list-wrapper">
//            {/* <div>Pokemon List</div> */}
//            <div className="pokemon-wrapper">
//                 {(isLoading) ? 'Loading....' : 
//                     pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} /> )}
//            </div>

//            <div className="controls">
//                 <button disabled = {prevUrl == null} onClick={ () => setPokedexUrl(prevUrl) } >Prev</button>
//                 <button disabled = {nextUrl == null} onClick={ () => setPokedexUrl(nextUrl) } >Next</button>
//            </div>
//         </div>
//     )

// }

// //Export
// export default PokemonList



//+++++++++++++++++++++++++++++++++++++++++++++New way +++++++++++++++++++++++++++++++++++++++++++++++++++++++


import { useEffect, useState } from "react"
import axios from "axios"
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true)

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon') ;

    // //Next and Prev State Mapping
    // const [nextUrl, setNextUrl] = useState('')
    // const [prevUrl, setPrevUrl] = useState('')

    //Upar wale sabhi states ko ek objects me manage kiya ja rha hai -> Managing the all state with the Creating Object of states
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl : ''
    })


    async function downloadPokemons() {

        //setIsLoading(true)  //State manage krne ke pahale
        setPokemonListState({...pokemonListState, isLoading: true});  //States manage krne ke bad

        //Fatching the Pokemon through Poke links using AXIOS method
        //const response = await axios.get(pokedexUrl) //this downloads list of 20 pokemons   ->    //State manage krne ke pahale

        const response = await axios.get(pokemonListState.pokedexUrl);  //States manage krne ke bad

        // we get the array of pokemons from result
        const pokemonResults = response.data.results;

        console.log(response.data);

        //Next & Prev
        // setNextUrl(response.data.next)    // old way
        // setPrevUrl(response.data.previous)

        setPokemonListState( (state) => ({
            ...state, 
            nextUrl: response.data.next, 
            prevUrl: response.data.previous 
        }))  //New way


        //iterating over the array of pokemon, and using their url, to create an array of promises
        //that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); //array of 20 pokemon  detailed data
        console.log(pokemonData)

        //Now iterate on the data each pokemon, extract id, name, types

        const pokeListReasult = pokemonData.map(pokeData =>{
            const pokemon = pokeData.data;

            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: pokemon.sprites.other.dream_world.front_default, 
                types: pokemon.types
            }
        })
        console.log(pokeListReasult)
        // setPokemonList(pokeListReasult)  //old way
        // setIsLoading(false)

        setPokemonListState((state) => ({
            ...state, 
            pokemonList: pokeListReasult, 
            isLoading: false
        }))

    }
    
    //UseEffect expacts two arguments one is -> callBack function & Second is -> Dependency array {useEffect( ()=> {} , [] )} 
    useEffect(()=> {
        downloadPokemons()
    }, [pokemonListState.pokedexUrl])



    return (
        <div className="pokemon-list-wrapper">
           {/* <div>Pokemon List</div> */}
           <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? 'Loading....' : 
                    pokemonListState.pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} /> )}
           </div>

           <div className="controls">
                <button disabled = {pokemonListState.prevUrl == null} onClick={ () => {
                    const urlToSet = pokemonListState.prevUrl;
                    setPokemonListState({...pokemonListState, pokedexUrl: urlToSet}) 
                }} >Prev</button>
                <button disabled = {pokemonListState.nextUrl == null} onClick={ () => {
                    const urlToSet = pokemonListState.nextUrl; 
                    setPokemonListState({...pokemonListState, pokedexUrl: urlToSet}) 
                }} >Next</button>
           </div>
        </div>
    )

}

//Export
export default PokemonList