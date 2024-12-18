import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const {count} =useLoaderData()
    // console.log(count)
    /* ---------------------------------- state --------------------------------- */
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [itemsPerPage,setItemsPerPage] = useState(10)
    const [currentPage,setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(count/itemsPerPage)
    console.log(numberOfPages)
    // const pages =[]
    // for (let index = 0; index < numberOfPages; index++) {
    //     pages.push(index)
    //     // console.log(index)
    // }
    const pages = [...Array(numberOfPages).keys()]
    // console.log(pages)

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    const handleItemsPerPage=e=>{
        console.log(e.target.value)
        const val = parseInt(e.target.value)
        setItemsPerPage(val)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products?.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>
            <div className="pagination">
                <button>Prev</button>
                {
                    pages.map((page,i)=><button onClick={()=>setCurrentPage(page)} className={currentPage===page?"selected":''} key={i}>{page}</button>)
                }
                <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <button>Next</button>
                </div>
        </div>
    );
};

export default Shop;