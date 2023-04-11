import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';
import { useEffect, useState } from 'react';
import { filterCategoriesThunk, filterHeadlineThunk } from '../store/slices/products.slice';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';

const Home = () => {
    const products = useSelector( state => state.productsSlice )
    const dispatch = useDispatch()
    const [ categories, setCategories ] = useState( [] )
    const [ inputSearch, setInputSearch ] = useState( "" )


    useEffect( () => {
        dispatch( getProductsThunk() )

        axios
         .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
         .then( resp => setCategories(resp.data) )
         .catch( error => console.error(error) )
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    {
                        categories.map( categories => (
                            <Col key={categories.id}>
                                <Button className='w-100' onClick={ () => dispatch(filterCategoriesThunk(categories.id) )}>{categories.name}</Button>
                            </Col>
                        ) )
                    }
                    <Col>
                    <Button onClick={ () => dispatch(getProductsThunk() ) } className='w-100'>All</Button>
                    </Col>
                </Row>
                <Row className='py-3'>
                    <Col>
                        
                        <InputGroup className="mb-3">
                            <Form.Control
                            placeholder="Search your product"
                            aria-label="Product's name"
                            aria-describedby="basic-addon2"
                            value= { inputSearch }
                            onChange = { (e) => setInputSearch(e.target.value) }
                            />
                            <Button variant="outline-secondary" onClick= { () => dispatch(filterHeadlineThunk(inputSearch))}>Search</Button>
                        </InputGroup>

                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3} className='py-3'>
                    {
                        products.map( products => (

                            <Col key = {products.id} className='mb-3'>
                                <Card >
                                    <Card.Img variant="top" 
                                    src={products.images[0].url} 
                                    />
                                    <Card.Body>
                                        <Card.Title>{products.title}</Card.Title>
                                        <Card.Text>
                                        {products.description}
                                        </Card.Text>
                                        <Button 
                                        variant="primary" 
                                       as = {Link}
                                       to = {`/products/${products.id}`}    
                                        >
                                            See detail
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>

                        ) )
                    }
                   
                </Row>
            </Container>
        </div>
    );
};

export default Home;