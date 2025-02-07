import "./App.css";
import { SearchInput } from "./components/search-input";
import { CoffeList } from "./components/coffee-list";
import { Cart } from "./components/cart";
import { CartActions } from "./components/cart-actions";
import { CategoryPicker } from "./components/catefory-picker";

function App() {
  return (
    <div className="wrapper">
      <SearchInput />
      <CategoryPicker />
      <div className="container">
        <CoffeList />
        <aside className="sider">
          <h1>Cart</h1>
          <Cart />
          <CartActions />
        </aside>
      </div>
    </div>
  );
}

export default App;
