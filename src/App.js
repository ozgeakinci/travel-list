import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState([...initialItems]);
  const handleItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              packed: !item.packed,
            }
          : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onHandleToggleItem={handleToggleItem}
        setItems={setItems}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;

const Logo = () => {
  return <h1> 🏝 Far Away 🧳 </h1>;
};
const Form = ({ setItems, onAddItems }) => {
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
};
const PackingList = ({ items, onDeleteItem, onHandleToggleItem, setItems }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  const handleClearList = () => {
    const confirmed = window.confirm("Are you sure you want delete all items");
    if (confirmed) setItems([]);
  };

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onHandleToggleItem={onHandleToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by input description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={handleClearList}>Clear List</button>
      </div>
    </div>
  );
};

const Item = ({ item, onDeleteItem, onHandleToggleItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onHandleToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => {
  // Eğer hiç eleman yoksa early retun için

  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  // kaç tane toplam ürün eklediğini hesaplar.
  const numItems = items.length;
  // pacerkenmiş ürün
  const numPacked = items.filter((item) => item.packed).length;
  // Yüzde olarak hazırlanan paket
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everthing! Ready to go ✈️"
          : `You have ${numItems} items on your list, and you already packed
        ${numPacked} ${percentage}%`}
      </em>
    </footer>
  );
};
