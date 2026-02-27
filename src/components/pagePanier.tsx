import { useState } from "react";
import CartePanier from "./cartePanier";
import pizza from "../assets/pizza.jpg"
import painChoco from "../assets/painChoco.jpg"

export default function CartPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Pain au chocolat", image: painChoco, price: 2000, quantity: 1, stock: 5 },
    { id: 2, name: "Mini pizza", image: pizza, price: 5000, quantity: 2, stock: 3 },
  ]);

  const increase = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCart = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto mt-24 md:mt-45 px-4 md:px-8 pb-16">

      <h1 className="text-primaryGreen text-4xl md:text-5xl font-titre mb-8 md:mb-10 text-center">
        Mon panier
      </h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-400 text-xl mt-20">Votre panier est vide.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4 md:gap-6">
            {items.map((item) => (
              <CartePanier
                key={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                maxStock={item.stock}
                onIncrease={() => increase(item.id)}
                onDecrease={() => decrease(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>

          <div className="mt-8 md:mt-10 flex flex-col items-end gap-4">
            <p className="text-xl md:text-2xl font-bold">
              Total : {totalCart} Ar
            </p>
            <button className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-xl text-lg hover:opacity-90 hover:bg-primaryGreen transition">
              Valider mes commandes
            </button>
          </div>
        </>
      )}
    </div>
  );
}