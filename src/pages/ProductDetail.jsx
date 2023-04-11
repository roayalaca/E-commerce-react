import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

const ProductDetail = () => {
    const { id } = useParams()
    const [ detail, setDetail ] = useState( {} )

    useEffect( () => {
        axios 
         .get( `https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}` )
         .then( resp => setDetail(resp.data))
         .catch( error => console.error(error) )
    }, [id])

    return (
        <div>
        
        <Carousel key={detail.id} className="carousel">
        
        {
            
               
                        detail.images?.map (detail => (
                        <Carousel.Item>
                            <img
                            className="d-block w-10"
                            src={detail.url}
                            alt="First slide"
                            />

                        <Carousel.Caption>
                            <h3>{detail.title}</h3>
                            <p>{detail.description}.</p>
                        </Carousel.Caption>
            
                        </Carousel.Item>
    
         
               
            ))
        }

        </Carousel>

       

        </div>
    );
};

export default ProductDetail;