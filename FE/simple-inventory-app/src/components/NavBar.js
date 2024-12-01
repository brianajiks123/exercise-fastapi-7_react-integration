import { Navbar, Nav, Badge } from 'react-bootstrap'
import { ProductContext } from '../ProductContext';
import { useContext } from 'react';

const NavBar = () => {
    const [products] = useContext(ProductContext)
    
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">Inventory Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Badge className="mt-2" variant="primary">Products In Stock: {products.data.length}</Badge>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
