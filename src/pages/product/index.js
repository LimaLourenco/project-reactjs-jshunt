import React, { Component } from "react";
import api from '../../services/api';
import "./styles.css";

export default class Product extends Component {
    state = {
        product: {}
    }

    // Carrega as informações do produto.
    async componentDidMount() {
        // desestruturação para pegar ID do produto e acessando os parametros que estão lá na minha rota.
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`); // id jogado como uma variavel aqui

        // Que vem da minha api.
        this.setState({ product: response.data }); 
    }

    render() {
        // Como ja tem os dados no state vou mostra estes dados no render. 
        const { product } = this.state;

        return (
            <div className="product-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>

                <p>
                    URL: <a href={product.url}>{product.url}</a> 
                </p>
            </div>
        ); // Demora um pouco pq ele busca os dados da minha api.
    }
}

// Irei buscar os dados do produto na api, deste unico produto ou varios produtos e exibir em tela.