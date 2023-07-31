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
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip? </h3>
    </div>
  );
};
const PackingList = () => {
  return <div className="list">LIST</div>;
};
const Stats = () => {
  return (
    <footer>
      <em>You have X items on your list, and you already packed X(X%)</em>
    </footer>
  );
};
