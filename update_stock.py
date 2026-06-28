import re
import os

def update_stock(file_path, add_amount):
    print(f"Reading product database from {file_path}...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"❌ Error: Could not find {file_path}")
        return
        
    count = 0
    def replacer(match):
        nonlocal count
        size = match.group(1)
        current_stock = int(match.group(2))
        new_stock = current_stock + add_amount
        count += 1
        return f"size: '{size}', stock: {new_stock}"
        
    # Regex to match the exact format in products.js: size: 'S', stock: 12
    pattern = r"size:\s*'([^']+)',\s*stock:\s*(\d+)"
    new_content = re.sub(pattern, replacer, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("-" * 40)
    print(f"✅ SUCCESS: Added {add_amount} units to {count} product variants!")
    print(f"✅ Your frontend will now reflect the new updated stock.")
    print("-" * 40)

def main():
    print("=" * 40)
    print("📦 INSANE CLOTHING - DAILY STOCK MANAGER")
    print("=" * 40)
    print("This script will automatically update your product stock.")
    print("It reads your src/data/products.js file and adds the requested stock.")
    print("-" * 40)
    
    try:
        amount_str = input("How many units do you want to add to all items? (e.g., 5): ")
        amount = int(amount_str)
        if amount <= 0:
            print("Please enter a positive number.")
            return
            
        file_path = os.path.join('src', 'data', 'products.js')
        update_stock(file_path, amount)
        
    except ValueError:
        print("❌ Invalid input. Please enter a valid number.")
    except KeyboardInterrupt:
        print("\nOperation cancelled.")

if __name__ == '__main__':
    main()
