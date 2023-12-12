import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/components/Navbar";
import OrderSummary from "./pages/OrderSummary";
import PayBill from "./pages/PayBill";
import "./App.css";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), item: "", amount: 0, name: "" },
  ]);
  const [totalPrice, SetTotalPrice] = useState(0);
  const [groupItems, setGroupItmes] = useState([]);
  const [userOrder, SetUserOrder] = useState([]);
  const [charges, setCharges] = useState({
    delivery: 0,
    tip: 0,
    tax: 0,
    grandTotal: 0,
  });

  return (
    <>
      <BrowserRouter>
        <Navbar
          setItems={setItems}
          SetTotalPrice={SetTotalPrice}
          setGroupItmes={setGroupItmes}
          SetUserOrder={SetUserOrder}
          setCharges={setCharges}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                totalPrice={totalPrice}
                items={items}
                setItems={setItems}
                SetTotalPrice={SetTotalPrice}
                groupItems={groupItems}
                setGroupItmes={setGroupItmes}
                charges={charges}
                setCharges={setCharges}
                SetUserOrder={SetUserOrder}
              />
            }
          />
          <Route
            path="/order-summary"
            element={<OrderSummary userOrder={userOrder} charges={charges} />}
          />
          <Route
            path="/paybill"
            element={
              <PayBill
                userOrder={userOrder}
                charges={charges}
                SetUserOrder={SetUserOrder}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
