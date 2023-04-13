import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { Button } from "react-bootstrap";
import { createCartThunk } from "../store/slices/cart.slice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
    const { id } = useParams()
    const [ detail, setDetail ] = useState( {} )
    const [counter, setCounter ] = useState( 1 )
    const dispatch = useDispatch()

    useEffect( () => {
        axios 
         .get( `https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}` )
         .then( resp => setDetail(resp.data))
         .catch( error => console.error(error) )
    }, [id])

    const addProduct = () => {
        const data = {
            quantity: counter,
            productId: id
        }

        dispatch( createCartThunk(data) )
    }

    const less = () => {
        if(counter > 1){
            setCounter(counter - 1)
        }
    }

    return (
        <div>
        
        <Carousel key={detail.id}>
        
        {
            
               
                        detail.images?.map (detail => (
                        <Carousel.Item key={detail.url}>
                            <img
                            className="d-block w-10"
                            src={detail.url}
                            alt="First slide"
                            />

                        
            
                        </Carousel.Item>
    
         
               
            ))
        }


        <Carousel.Caption>
            <h3>{detail.title}</h3>
            <p>{detail.description}.</p>
            <p>{"$" + detail.price}.</p>

            <Button onClick={ less }>-</Button>
                { counter }
            <Button onClick={ () => setCounter( counter + 1 )}>+</Button>
            <Button onClick={ addProduct }>
                 Add to cart <i class="bi bi-cart3"></i>
            </Button>
        </Carousel.Caption>

        </Carousel>

        

       

        </div>
    );
};

export default ProductDetail;