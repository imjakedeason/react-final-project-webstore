import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
  } = useCart();

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="page-width">
      <div className="cart-page">
        <h2 className="title-2">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4>{item.title}</h4>
                        <p className="price3">
                          ${item.price} × {item.quantity}
                        </p>
                        <div className="quantity">
                          <button
                            className="quantity2"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <span className="quantity2">{item.quantity}</span>
                          <button
                            className="quantity2"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className=""
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="font-bold">
                Total Items: <span className="price">{totalItems}</span>
              </p>
              <p className="font-bold">
                Total Price: <span className="price">€{totalPrice}</span>
              </p>
              <button onClick={() => alert("OVDJE IDE LOGIKA")} className="">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
