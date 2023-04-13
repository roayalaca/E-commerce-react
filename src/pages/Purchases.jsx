import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "../utils/getConfig";
import Card from 'react-bootstrap/Card';

const Purchases = () => {

    const [purchases, setPurchases] = useState([])

    useEffect( () => {

        axios
         .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())
         .then( resp => setPurchases(resp.data) )
         .catch( error => console.error(error) )
        
    }, [])

    let suma = 0

   
    for (let i = 0; i < purchases.length; i++) {
        suma = suma + (purchases[i].quantity * purchases[i].product.price)
    }


    return (
        <div>
            <h1>Purchases</h1>
            {
                purchases.map ( item => (
                    <Card style={{ width: '100%', display: "flex", flexDirection: "row" }} key={item.id}>
                    <Card.Img variant="left" src={item.product.images[1].url} style={{ width: 150, height: 150 }} />
                    <Card.Body className="d-inline">
                        <Card.Title>{item.product.title}</Card.Title>
                        <Card.Text>
                        {item.quantity}
                        </Card.Text>
                        <Card.Text>
                        {"$"+item.product.price*item.quantity}
                        
                        </Card.Text>
                    </Card.Body>
                    </Card>
                ))
            }

            <h2>Total: ${suma}</h2>
        </div>
    );
};

export default Purchases;