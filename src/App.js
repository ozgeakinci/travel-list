import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

export default App;

const Logo = () => {
  return <h1> 🏝 Far Away 🧳 </h1>;
};
const Form = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const newItem = {
    description,
    quantity,
    id: "id" + Math.random().toString(16).slice(2),
    package: false,
  };
  // tarayıcının tekrar kendini güncellemesini engellerler.
  const handleSubmit = (e) => {
    e.preventDefault();
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
};
const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item, newItem }) => {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
        {newItem}
      </span>
      <button>❌</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer>
      );
      <em>You have X items on your list, and you already packed X(X%)</em>
    </footer>
  );
};
