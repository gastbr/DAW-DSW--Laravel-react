import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

const Main = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener los productos desde el endpoint
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data.data); // Asumiendo que los datos están en response.data.data
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // El array vacío como segundo argumento asegura que esto se ejecute solo una vez

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ProductList products={products} />
    );
};

export default Main;