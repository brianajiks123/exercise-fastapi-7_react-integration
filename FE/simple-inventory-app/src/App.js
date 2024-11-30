import './App.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import { ProductProvider } from './ProductContext';
import ProductsTable from './components/ProductsTable';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <ProductProvider>
            <NavBar />
            <ProductsTable />
          </ProductProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
