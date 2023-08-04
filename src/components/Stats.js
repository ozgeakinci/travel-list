export const Stats = ({ items }) => {
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
