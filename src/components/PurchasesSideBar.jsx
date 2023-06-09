import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCartThunk } from '../store/slices/cart.slice';
import { cartCheckoutThunk } from '../store/slices/cart.slice';
import { removeCartThunk } from '../store/slices/cart.slice';
import { updateCartThunk } from '../store/slices/cart.slice';



const PurchasesSideBar = ({show, handleClose}) => {

    const [counter, setCounter] = useState(1)

    const dispatch = useDispatch()
    const cart = useSelector( state => state.cartSlice )

    const token = localStorage.getItem("token")

    useEffect( () => {

        if(token) dispatch( getCartThunk() )

    }, [token])

    const remove = id => {

        dispatch(removeCartThunk(id))
    }

    const less = item => { 
           
        const data = {
            quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity
        }

        dispatch( updateCartThunk(data, item) )
    }

    const addition = item => {

        const data = {
            quantity: item.quantity + 1
        }

        dispatch( updateCartThunk(data, item) )
    }

    let suma = 0

   
        for (let i = 0; i < cart.length; i++) {
            suma = suma + (cart[i].quantity * cart[i].product.price)
        }

       

    return (
        <Offcanvas show={show} onHide={handleClose} placement={'end'} >
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul>
                    {
                        cart.map( item => (
                            <li key={item.id} style={{ border: "1px solid black", marginBottom: "1rem"}}>
                                
                                    <h5>{item.product?.title}</h5>
                                    <img style={{ width: 80, objectFit: "contain"}} src={item.product?.images[0].url} alt="" />

                                    <Button onClick={ () => remove(item.id) }><i class="bi bi-trash3"></i></Button>

                                    <Button onClick={ () => less(item) }>-</Button>{item.quantity}<Button onClick={() => addition(item)}>+</Button>

                                    <h2>{"Subtotal" + " " + "$" + item.quantity* item.product.price}</h2>
                                    
                                
                            </li>
                            

                            
                        ))
                
                    }
                    </ul>
                    <h2>Total: ${suma}</h2> 

                    <Button onClick={ () => dispatch(cartCheckoutThunk()) }> Checkout </Button>
                   
            </Offcanvas.Body>
      </Offcanvas>
    );
};

export default PurchasesSideBar;