import { Link } from 'react-router-dom';
import './Pokemon.css'

function Pokemon({name, image, id}) {
    return (
        <div className='pokemon'>

            {/* // You have to use "Link to" Atribute in place of "<a></a>" ankar Tag to jump next page */}
            <Link to= {`/pokemon/${id}`}>
                <div className='pokemon-name'>{name}</div>
                <div> 
                    <img className='pokemon-image' src={image} /> 
                </div>
            </Link>
        </div>
    )
}

//Export
export default Pokemon;