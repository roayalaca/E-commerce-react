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
            <h1>Your purchases</h1>
            {
                purchases.map ( item => (
                    <Card style={{ width: '100', height:"35rem" , border: "5px solid black", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }} key={item.id}>
                    <Card.Img variant="left" src={item.product.images[0].url} style={{ width: "19rem", height: "20rem"}} />
                    <Card.Body className="d-inline" style={{ marginTop: "15rem" }}>
                        <Card.Title>{"Product:" + " " + item.product.title}</Card.Title>
                        <Card.Text>
                        {"Quantity:" + " " + item.quantity}
                        </Card.Text>
                        <Card.Text>
                        {"Subtotal" + " " + "$"+item.product.price*item.quantity}
                        
                        </Card.Text>
                    </Card.Body>
                    </Card>
                ))
            }

            <h2 style={{ color: "white" }}>Total: ${suma}</h2>
        </div>
    );
};

export default Purchases;