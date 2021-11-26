import React, { Component } from 'react';

import api from '../../services/api';

import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    state = { 
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        // Pegar tudo do docs e armazenar na variavel productInfo
        const { docs,  ...productInfo} = response.data;
        
        this.setState({ products: docs, productInfo, page });

        //console.log(response.data.docs);
    }

    // Vou criar as duas funcionalidades aqui referente aos botões
    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page === 1) {
            return;
        }

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    };

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) {
            return;                    
        }

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }


    render() {
        // Destruturação para reduzir este trecho de codigo {this.state.products.map.
        const { products, page, productInfo } = this.state;

        /* return <h1>Contagem de produtos:{this.state.products.length}</h1> */
        return (
            // Percorrer a minha lista de produtos la do meu state(estado).
            <div className="product-list">
                {products.map(product => ( // Exibir os titulos dos produtos em tela e para percorrer uso map().
                    // Mostrando restantes das informções do produtos. e // Botão para acessar os detalhes do produto.
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>  
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
            // Foi feito as funcionalidades dos botoes e seu estilo que simplesmente vai passar e voltar as paginas.
        )
    }
}