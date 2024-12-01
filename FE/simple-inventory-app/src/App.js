import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import { ProductProvider } from './ProductContext';
import ProductsTable from './components/ProductsTable';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <ProductProvider>
            <NavBar />
            <Route exact path="/" component={ProductsTable} />
            <Route exact path="/add-product" component={AddProduct} />
          </ProductProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
