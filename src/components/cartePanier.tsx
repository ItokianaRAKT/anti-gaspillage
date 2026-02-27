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
    <div className="w-full bg-white rounded-2xl shadow-md p-4 flex items-center gap-3 md:gap-6">

      <img
        src={image}
        alt={name}
        className="w-20 md:w-36 aspect-square object-cover rounded-xl shrink-0"
      />

      <div className="flex flex-col grow min-w-0">
        <h3 className="text-base md:text-lg font-semibold truncate">{name}</h3>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={onDecrease}
            className="px-3 py-1 bg-gray-200 rounded-lg text-lg"
          >
            -
          </button>
          <span className="text-base md:text-lg font-medium">{quantity}</span>
          <button
            onClick={onIncrease}
            disabled={quantity >= maxStock}
            className="px-3 py-1 bg-gray-200 rounded-lg text-lg disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      {/* Prix total */}
      <div className="text-base md:text-lg font-bold shrink-0">
        {total} Ar
      </div>

      {/* Supprimer */}
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 text-xl shrink-0"
      >
        ✕
      </button>
    </div>
  );
}