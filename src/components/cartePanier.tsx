interface CartItemProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
  maxStock: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({
  name,
  image,
  price,
  quantity,
  maxStock,
  onIncrease,
  onDecrease,
  onRemove
}: CartItemProps) {
  const total = price * quantity;

  return (
    <div className="w-full  bg-white rounded-2xl shadow-md p-4 flex items-center gap-6">
      
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-45 aspect-square object-cover rounded-xl"
      />

      {/* Infos */}
      <div className="flex flex-col grow">
        <h3 className="text-lg font-semibold">{name}</h3>

        {/* Compteur */}
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={onDecrease}
            className="px-3 py-1 bg-gray-200 rounded-lg"
          >
            -
          </button>

          <span className="text-lg font-medium">{quantity}</span>

          <button
  onClick={onIncrease}
  disabled={quantity >= maxStock}
  className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-40"
>
  +
</button>
        </div>
        
      </div>

<button
    onClick={onRemove}
    className="text-gray-400 hover:text-red-500 text-xl"
  >
    ✕
  </button>


      {/* Prix total produit */}
      <div className="text-lg font-bold">
        {total} Ar
      </div>

      
    </div>
  );
}