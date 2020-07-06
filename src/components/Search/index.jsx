import React from 'react'

import './style.css'

function Search({handlePesquisa}){

    return(
        <form className="pesquisa">
            <input placeholder='Pesquisar...' onChange={handlePesquisa} type="text"/>
        </form>
    );
}

export default Search;