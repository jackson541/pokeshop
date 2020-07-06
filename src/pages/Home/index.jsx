import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './index.css'
import PokemonCard from '../../components/PokemonCard';
import Carrinho from '../../components/Carrinho';
import Search from '../../components/Search';

function Home () {
    const [pokemonsList, setPokemonsList] = useState([]);
    const [pokemonsComprados, setPokemonsComprados] = useState([]);
    const [limit, setLimit] = useState(21)
    const [offset, setOffset] = useState(0)
    const [listaNomesPokemons, setListaNomesPokemons] = useState([])

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
                .then(response => {
                    setPokemonsList(response.data.results)
                })

    }, [offset])


    useEffect(() => {
        //pega os primeiros 1000 nomes
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000')
            .then(response => {
                setListaNomesPokemons(response.data.results.map(pokemon => (
                    pokemon.name
                )))
            })
    }, [])

    function handleProximaPagina() {
        setOffset(offset + 21)
    }

    function handlePaginaAnterior() {
        //verifica se já está na primeira página
        if (offset > 0){
            setOffset(offset - 21)
        }
    }

    function handleComprarPokemon(pokemonData){
        setPokemonsComprados([...pokemonsComprados, pokemonData])
    }

    function handleResetarCarrinho(){
        setPokemonsComprados([])
    }

    function handlePesquisa(event){
        const nomeDigitado = event.target.value.toLowerCase()

        //quando se tem apenas 1 letra digitada, o número de pokemons encontrados é muito alto
        if (nomeDigitado.length !== 1 && nomeDigitado.length !== 0){
            //a lista de pokemons passa a ser a de pokemons encontrados
            setPokemonsList(
                listaNomesPokemons.filter(nomePokemon => 
                    nomePokemon.includes(nomeDigitado)
                    ).map(pokemonName => ({
                        name: pokemonName,
                        url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
                    }))
                )

        } else if (nomeDigitado.length === 0){
            //reseta para a lista geral de procura quando nada é digitado
            axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
                .then(response => {
                    setPokemonsList(response.data.results)
                })
        }
    }

    return(
        <div className="container-fluid">
            <header>
                <div className="row header">
                        <div className="col-7 ">
                            <h1 className='titulo'>PokeShop</h1>
                        </div>
                        <div className="col-4">
                            <Search  handlePesquisa={handlePesquisa} />
                        </div>
                </div>
            </header>
            
            <div className="row">
                <div className="col-9">
                    <section>
                        <div className="row cardsSection">
                            {   
                                pokemonsList.length !== 0 ?
                                    pokemonsList.map(pokemon => (
                                        <div key={pokemon.name} className="col-4 text-center">
                                            <PokemonCard 
                                                comprarPokemonFunction={handleComprarPokemon} 
                                                pokemonNameUrl={pokemon}
                                            />
                                        </div>
                                    )) 

                                    :

                                    <div className="notFound col-12">
                                        <h2>Nenhum pokemon foi encontrado</h2>
                                    </div>
                            }

                            <div className="col-12">
                                <div className="row">
                                    <div className="col-6">
                                        <button 
                                            className='button-pass-page' 
                                            type='submit' 
                                            onClick={handlePaginaAnterior}
                                        >
                                            Página anterior
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button 
                                            className='button-pass-page' 
                                            type='submit' 
                                            onClick={handleProximaPagina}
                                        >
                                            Próxima página
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>

                <Carrinho resetarCarrinho={handleResetarCarrinho} pokemons={pokemonsComprados} />

            </div>

            <footer>
                <div className="row footer">
                    <div className="col-12">
                        <h4> <a 
                                href="https://www.linkedin.com/in/jackson-alves541/" 
                                className='perfilLink'
                                target='_blank'
                            >Jackson Alves 2020</a></h4>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Home;