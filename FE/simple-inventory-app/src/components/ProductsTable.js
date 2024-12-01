import { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ProductContext } from "../ProductContext";
import ProductsRow from "./ProductsRow";

const ProductsTable = () => {
    const [products, setProducts] = useContext(ProductContext)

    const handleDelete = (id) => {
        fetch("http://127.0.0.1:8000/product/" + id, {
            method: "DELETE",
            headers: {
                accept: 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.message) {
                    const filteredProduct = products.data.filter((product) => product.id !== id);
                    setProducts({data: [...filteredProduct]})
                    alert("Product deleted.")
                } else {
                    alert("Failed to delete the product.")
                }
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/product")
            .then(res => res.json())
            .then(results => setProducts({"data": [...results.data]}))
            .catch(error => console.error(error))
    })

    return (
        <div className="mt-2 mx-3">
            <Table striped bordered hover className="table-sm text-center">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
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
                            // id = {product.id}
                            name = {product.name}
                            quantity_in_stock = {product.quantity_in_stock}
                            quantity_sold = {product.quantity_sold}
                            unit_price = {product.unit_price}
                            revenue = {product.revenue}
                            key = {product.id}
                            handleDelete = {handleDelete}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductsTable;
