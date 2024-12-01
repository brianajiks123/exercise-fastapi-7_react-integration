import { useContext, useEffect, useState } from "react";
import { Button, Form, FormControl, Table } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom'
import { ProductContext } from "../ProductContext";
import ProductsRow from "./ProductsRow";
import { UpdateContext } from "../UpdateProductContext";

const ProductsTable = () => {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useContext(ProductContext)
    const [, setUpdateProductInfo] = useContext(UpdateContext)

    let history = useHistory()

    const updateSearch = (e) => {
        setSearch(e.target.value)
    }

    const filterProduct = (e) => {
        e.preventDefault()

        const product = products.data.filter(product => product.name.toLowerCase() === search.toLowerCase())

        setProducts({"data": [...product]})
    }

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

    const handleUpdate = (id) => {
        const product = products.data.filter(product => product.id === id)[0]
        setUpdateProductInfo({
            ProductName: product.name,
            QuantityInStock: product.quantity_in_stock,
            QuantitySold: product.quantity_sold,
            UnitPrice: product.unit_price,
            Revenue: product.revenue,
            ProductId: id
        })
        history.push("/update-product")
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/product")
            .then(res => res.json())
            .then(results => setProducts({"data": [...results.data]}))
            .catch(error => console.error(error))
    })

    return (
        <div className="mt-2 mx-3">
            <div className="row d-flex justify-content-between align-items-center">
                <div className="col-auto">
                    <Link to="/add-product" className="btn btn-primary btn-sm">Add Product</Link>
                </div>
                <div className="col-auto">
                    <Form onSubmit={filterProduct} className="d-flex">
                        <FormControl
                            value={search}
                            onChange={updateSearch}
                            type="text"
                            placeholder="Search"
                            className="mr-2"
                        />
                        <Button type="submit" variant="outline-primary">Search</Button>
                    </Form>
                </div>
            </div>

            <Table striped bordered hover className="table-sm text-center mt-3">
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
                            handleDelete = {handleDelete}
                            handleUpdate = {handleUpdate}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductsTable;
