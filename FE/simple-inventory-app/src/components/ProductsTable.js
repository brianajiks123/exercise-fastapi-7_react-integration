import { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ProductContext } from "../ProductContext";
import ProductsRow from "./ProductsRow";

const ProductsTable = () => {
    const [products, setProducts] = useContext(ProductContext)

    useEffect(() => {
        fetch("http://localhost:8000/product")
            .then(res => res.json())
            .then(results => setProducts({"data": [...results.data]}))
            .catch(error => console.error(error))
    })

    return (
        <div className="mt-2 mx-2">
            <Table striped bordered hover className="table-sm text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity In Stock</th>
                        <th>Quantity Sold</th>
                        <th>Unit Price (Million)</th>
                        <th>Revenue (Million)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.data.map((product) => (
                        <ProductsRow
                            id = {product.id}
                            name = {product.name}
                            quantity_in_stock = {product.quantity_in_stock}
                            quantity_sold = {product.quantity_sold}
                            unit_price = {product.unit_price}
                            revenue = {product.revenue}
                            key = {product.id}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductsTable;
