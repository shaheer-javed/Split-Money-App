import ItemsCard from "./components/ItemsCard";
import GroupOrders from "./components/GroupOrders";

function Home({
  totalPrice,
  SetTotalPrice,
  groupItems,
  setGroupItmes,
  charges,
  setCharges,
  SetUserOrder,
  items,
  setItems,
}) {
  return (
    <>
      <ItemsCard
        SetTotalPrice={SetTotalPrice}
        totalPrice={totalPrice}
        groupItems={groupItems}
        setGroupItmes={setGroupItmes}
        charges={charges}
        setCharges={setCharges}
        SetUserOrder={SetUserOrder}
        items={items}
        setItems={setItems}
      />

      <GroupOrders groupItems={groupItems} />
    </>
  );
}
export default Home;
