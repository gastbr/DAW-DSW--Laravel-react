import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchProducts(url = 'http://daw-dsw--laravel-react.test/api/products') {
        try {
            const token = document.cookie;
            const response = await axios.get(`${url}`, {
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                maxRedirects: 5,
                followRedirects: true
            });
            /*             if (response.redirected) {
                            window.location.href = response.url;
                            return;
                        } */
            console.log(response);
            console.log(response.data.data);
            setProducts(response.data); // Asumiendo que los datos están en response.data.data
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []); // El array vacío como segundo argumento asegura que esto se ejecute solo una vez

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Product List</h2>
            <ul className='flex flex-wrap'>
                {products.data.map(product => (
                    <li className='border border-gray-300 p-4' key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => fetchProducts(products.links.prev)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Previous page
                </button>
                <span>Page {products.meta.current_page} of 5</span>
                <button onClick={() => fetchProducts(products.links.next)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Next page
                </button>
            </div>
        </div>
    );
};

export default ProductList;