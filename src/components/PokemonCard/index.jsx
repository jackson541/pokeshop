import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './style.css'
import pokebolaImage from '../../assets/pokebola.png'

function PokemonCard({pokemonNameUrl, comprarPokemonFunction}) {
    const [pokemonData, setPokemonData] = useState({})

    useEffect(() => {
        axios.get(`${pokemonNameUrl.url}`)
                .then(response => {
                    //pega as demais informações do pokemon, como url das 
                    //imagens e experiência básica

                    setPokemonData(response.data)
                })
    }, [pokemonNameUrl.url])

    return(
        <div className="pokemonCard">
            {
                pokemonData.sprites !== undefined ? 
                <img src={pokemonData.sprites.front_default} alt="imagem do pokemon"/> : 
                <img src={pokebolaImage} alt="imagem do pokemon"/> 
            }

            <h5>{pokemonNameUrl.name}</h5>
            <p className='titleCard' >Preço: R$ {pokemonData.base_experience}0,00</p>
            <button type='submit' onClick={()=>{
                comprarPokemonFunction({
                    imagemUrl: pokemonData.sprites.front_default,
                    nome: pokemonNameUrl.name,
                    preco: (pokemonData.base_experience * 10)
                })
            }}>Adicionar</button>
        </div>
    );
}

export default PokemonCard;