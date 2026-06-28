import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Insane Clothing API")

# Enable CORS so the React app (port 5173) can talk to this API (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = os.path.join(os.path.dirname(__file__), "database.json")

# Model for Postman updates
class StockUpdate(BaseModel):
    product_id: str
    size: str
    add_quantity: int

def load_db():
    if not os.path.exists(DB_FILE):
        return {"COLLECTIONS": [], "PRODUCTS": []}
    with open(DB_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_db(data):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

@app.get("/api/products")
def get_products():
    """Returns the full product catalog and collections."""
    db = load_db()
    return db

@app.post("/api/stock")
def update_stock(update: StockUpdate):
    """
    Update stock for a specific product and size.
    Use this endpoint from Postman!
    """
    db = load_db()
    
    # Find the product
    product = next((p for p in db.get("PRODUCTS", []) if p["id"] == update.product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    # Find the size
    size_obj = next((s for s in product.get("sizes", []) if s["size"] == update.size), None)
    if not size_obj:
        raise HTTPException(status_code=404, detail="Size not found for this product")
        
    # Update stock
    old_stock = size_obj["stock"]
    size_obj["stock"] += update.add_quantity
    
    save_db(db)
    
    return {
        "message": "Stock updated successfully!",
        "product": product["name"],
        "size": update.size,
        "old_stock": old_stock,
        "new_stock": size_obj["stock"]
    }

if __name__ == "__main__":
    import uvicorn
    # Run server on port 8000
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
