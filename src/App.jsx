import { useState } from "react";
// import { useLocalStorage } from './hooks/useLocalStorage'
import "./App.css";

// Placeholder: plain useState, nothing is saved. Delete this line and
// uncomment the import above once the hook is written.
const useLocalStorage = (key, initial) => useState(initial);

const PRODUCTS = [
  { id: 1, name: "Coffee Beans", price: 14.99, emoji: "☕" },
  { id: 2, name: "Headphones", price: 89.0, emoji: "🎧" },
  { id: 3, name: "Backpack", price: 49.5, emoji: "🎒" },
  { id: 4, name: "Sneakers", price: 120.0, emoji: "👟" },
];

// Defined outside the component so the reference is stable across renders
const EMPTY_CART = [];

// Random per-tab label so you can tell the tabs apart during the demo
const TAB_ID = Math.random().toString(36).slice(2, 6).toUpperCase();

function App() {
  const [cart, setCart] = useLocalStorage("cart", EMPTY_CART);
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const addToCart = (product) =>
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

  const removeFromCart = (id) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>🛒 Tab Sync Shop</h1>
        <div className="header-right">
          <span className="tab-badge">Tab {TAB_ID}</span>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <span className="cart-badge">Cart: {itemCount}</span>
        </div>
      </header>

      <main>
        <section>
          <h2>Products</h2>
          <ul className="products">
            {PRODUCTS.map((product) => (
              <li key={product.id} className="card">
                <span className="emoji">{product.emoji}</span>
                <strong>{product.name}</strong>
                <span>${product.price.toFixed(2)}</span>
                <button onClick={() => addToCart(product)}>Add to cart</button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="card cart">
          <h2>Your cart</h2>
          {cart.length === 0 ? (
            <p className="muted">Cart is empty</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.emoji} {item.name} × {item.quantity}
                  </span>
                  <button
                    className="small"
                    onClick={() => removeFromCart(item.id)}
                  >
                    −
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="total">Total: ${total.toFixed(2)}</p>
          <button
            disabled={cart.length === 0}
            onClick={() => setCart(EMPTY_CART)}
          >
            Clear cart
          </button>
        </aside>
      </main>
    </div>
  );
}

export default App;
