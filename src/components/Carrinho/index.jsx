import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

import './style.css'

function Carrinho ({resetarCarrinho, pokemons}){
    const [pokemonsList, setPokemonsList] = useState([])
    const [totalCompras, setTotalCompras] = useState(0)
    const [modalIsOpen,setIsOpen] = useState(false);

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          textAlign: 'center',
        }
      };

    useEffect(() => {
        setPokemonsList(pokemons)
    }, [pokemons])

    useEffect(() => {
        const total = pokemonsList.reduce((acumulador, valorAtual) => (
                            acumulador += valorAtual.preco
                        ), 0)

            setTotalCompras(total)
    }, [pokemonsList])

       
    Modal.setAppElement('#root')


    function openModal() {
        setIsOpen(true);
    }
    
    function afterOpenModal() {
    }
    
    function closeModal(){
        resetarCarrinho()
        setIsOpen(false);
    }


    return(
        <div className="carrinho col-3">
            <aside className=''>
                <h2 className='text-center'>Carrinho</h2>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Modal para finalizar compra"
                >
        
                    <h2>Obrigado pela compra no</h2>
                    <h2>PokeShop</h2>
                    <p>Total: R$ {totalCompras},00</p>
                    <button className='botao-concluir' onClick={closeModal}>Concluir</button>
                </Modal>

                {
                    pokemonsList.map(pokemon => (
                        <div className="carrinho-item row">
                            <div className="col-7">
                                <img 
                                    src={pokemon.imagemUrl} 
                                    alt="Pokemon imagem"
                                    width='40px'
                                    height='40px'
                                />
                                <p>{pokemon.nome}</p>
                            </div>
                            <div className="col-5 preco">
                                <p>R$ {pokemon.preco},00</p>
                            </div>
                        </div>
                    ))
                }

                <hr className='divisor' />

                <div className="row">
                    <div className="col-2">
                        <p>Total</p>
                    </div>
                    <div className="col-10 preco-total">
                        <p>R$ {totalCompras},00</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button 
                            className='botao-finalizar' 
                            onClick={openModal} 
                            type='submit'
                        >Finalizar</button>
                    </div>
                </div>
                
            </aside>
        </div>
    );
}

export default Carrinho;