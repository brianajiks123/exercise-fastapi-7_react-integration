import { Navbar, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ProductContext } from '../ProductContext';
import { useContext } from 'react';

const NavBar = () => {
    const [products] = useContext(ProductContext)
    
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Inventory Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Badge className="mt-2" variant="primary">Products In Stock: {products.data.length}</Badge>
                </Nav>
                <Form className="d-flex align-items-center">
                    <Link to="/add-product" className="btn btn-primary btn-sm mr-4 w-100">Add Product</Link>
                    <FormControl type="text" placeholder="Search" className='mr-sm-2' />
                    <Button type="submit" variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
