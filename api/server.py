from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from db.models import Supplier, supplier_pydantic, supplier_pydanticIn

app = FastAPI()

register_tortoise(
    app,
    db_url="sqlite://database.sqlite3",
    modules={"models": ["db.models"]},
    generate_schemas=True,
    add_exception_handlers=True
)

@app.get("/")
def index() -> dict:
    return {"message": "Hello Broo... You can see API Spec, let's go to /docs or /redoc"}

@app.post("/supplier")
async def add_supplier(supplier_info: supplier_pydanticIn) -> dict: # type: ignore
    supplier_obj = await Supplier.create(**supplier_info.dict(exclude_unset=True))
    response = await supplier_pydantic.from_tortoise_orm(supplier_obj)
    return {"data": response}

@app.get("/supplier")
async def get_all_suppliers() -> dict:
    response = await supplier_pydantic.from_queryset(Supplier.all())
    return {"data": response}

@app.get("/supplier/{supplier_id}")
async def get_supplier(supplier_id: int) -> dict:
    response = await supplier_pydantic.from_queryset_single(Supplier.get(id=supplier_id))
    return {"data": response}

@app.put("/supplier/{supplier_id}")
async def update_supplier(supplier_id: int, update_info: supplier_pydanticIn) -> dict: # type: ignore
    supplier = await Supplier.get(id=supplier_id)
    update_info = update_info.dict(exclude_unset=True)
    
    supplier.name = update_info["name"]
    supplier.company = update_info["company"]
    supplier.email = update_info["email"]
    supplier.phone = update_info["phone"]
    
    await supplier.save()
    
    response = await supplier_pydantic.from_tortoise_orm(supplier)
    return {"data": response}

@app.delete("/supplier/{supplier_id}")
async def delete_supplier(supplier_id: int) -> dict:
    supplier = await Supplier.get(id=supplier_id)
    
    await supplier.delete()
    
    return {"message": "Success to deleting the data."}
