
import { createGlobalStyle } from "styled-components";
import ProductCard from "./components/ProductCard";
import UserCard from "./components/UserCard";

const GlobalStyle = createGlobalStyle`
    html {
        font-family: sans-serif;
    }
`

function App() {
  return (
    <>
        <GlobalStyle />

        <main>
            <ProductCard />
            <hr />
            <UserCard />
        </main>
    </>
  );

import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cart from './components/Cart/Cart';
import ProductsList from './components/ProductsList/ProductsList';

const AppWrapper = styled.main`
    max-width: 1200px;
    margin: 0 auto;
`;

const Container = styled.main`
    display: flex;
`;

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    const addToCart = (productToAdd) => {
        const newCart = [...cart]
        
        const productExists = newCart.find(
            productInCart => productInCart.id === productToAdd.id
        )

        if (productExists) {
            productExists.quantity += 1
        } else {
            newCart.push({...productToAdd, quantity: 1})
        }

        setCart(newCart)
    }

    const removeFromCart = (productToRemove) => {
        const newCart = [...cart]

        const indexToRemove = cart.findIndex(
            (productInCart) => productInCart.id === productToRemove.id
        )

        if (indexToRemove !== -1) {
            newCart.splice(indexToRemove, 1)
        }

        setCart(newCart)
    }

    return (
        <AppWrapper>
            <h1>E-Commerce</h1>
            <Container>
                <ProductsList products={products} addToCart={addToCart} />
                <Cart cart={cart} removeFromCart={removeFromCart} />
            </Container>
        </AppWrapper>
    );

}

export default App;
