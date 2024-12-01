import { Button, Card, Form } from "react-bootstrap";
import { UpdateContext } from "../UpdateProductContext";
import { useContext } from "react";

const UpdateProduct = () => {
    const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateContext)

    const updateForm = (e) => {
        setUpdateProductInfo({...updateProductInfo, [e.target.name] : e.target.value})
    }

    const postData = async (e) => {
        e.preventDefault();

        const url = "http://127.0.0.1:8000/product/" + updateProductInfo["ProductId"]
        const res = await fetch(url, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": updateProductInfo['ProductName'],
                "quantity_in_stock": updateProductInfo['QuantityInStock'],
                "quantity_sold": updateProductInfo['QuantitySold'],
                "unit_price": updateProductInfo['UnitPrice'],
                "revenue": updateProductInfo['Revenue']
            })
        })

        res.json().then(res => {
            if (res.data) {
                alert("Success to update product.")
            } else {
                alert("Failed to update product.")
            }
        });
    
        setUpdateProductInfo({
            ProductName: "",
            QuantityInStock: "",
            QuantitySold: "",
            UnitPrice: "",
            Revenue: "",
            ProductId: ""
        });
    }

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={postData}>
                    <Form.Group controlId="ProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="ProductName"
                            value={updateProductInfo.ProductName}
                            onChange={updateForm}
                            placeholder="Product Name"
                        />
                    </Form.Group>

                    <Form.Group controlId="QuantityInStock" className='mt-2'>
                        <Form.Label>Quantity In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="QuantityInStock"
                            value={updateProductInfo.QuantityInStock}
                            onChange={updateForm}
                            placeholder="Quantity In Stock"
                        />
                    </Form.Group>

                    <Form.Group controlId="QuantitySold" className='mt-2'>
                        <Form.Label>Quantity Sold</Form.Label>
                        <Form.Control
                            type="number"
                            name="QuantitySold"
                            value={updateProductInfo.QuantitySold}
                            onChange={updateForm}
                            placeholder="Quantity Sold"
                        />
                    </Form.Group>

                    <Form.Group controlId="UnitPrice" className='mt-2'>
                        <Form.Label>Unit Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="UnitPrice"
                            value={updateProductInfo.UnitPrice}
                            onChange={updateForm}
                            placeholder="Unit Price"
                        />
                    </Form.Group>

                    <Form.Group controlId="Revenue" className='mt-2'>
                        <Form.Label>Revenue</Form.Label>
                        <Form.Control
                            type="number"
                            name="Revenue"
                            value={updateProductInfo.Revenue}
                            onChange={updateForm}
                            placeholder="Revenue"
                        />
                    </Form.Group>

                    <Button variant='primary' type='submit' className='mt-3'>Update</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default UpdateProduct;
