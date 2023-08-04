import { useState } from "react";

export default function Form({ setItems, onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // tarayıcının tekrar kendini güncellemesini engellerler.
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      id: "id" + Math.random().toString(16).slice(2),
      packed: false,
    };
    console.log(newItem);

    onAddItems(newItem);

    // Formun ilk duruma geri dönmesi için
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip? </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* 1'den 20ye kadar otomatik hesaplama fonksiyonu */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* bir veriyi almak 3 adımda gerçekleşir. 1. state yarat 2. value ile değeri al  3. set fonksiyonu ile değişen değeri al */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
