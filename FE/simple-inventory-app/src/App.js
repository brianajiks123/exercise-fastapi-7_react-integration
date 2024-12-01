import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import { ProductProvider } from './ProductContext';
import ProductsTable from './components/ProductsTable';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import { UpdateProductContextProvider } from './UpdateProductContext';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <ProductProvider>
            <NavBar />
            <UpdateProductContextProvider>
              <Route exact path="/" component={ProductsTable} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/update-product" component={UpdateProduct} />
            </UpdateProductContextProvider>
          </ProductProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
