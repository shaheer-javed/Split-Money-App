import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Autocomplete,
  Modal,
  Box,
  Grid,
} from "@mui/material";

import { useEffect, useState } from "react";
import SingleItemBox from "./SingleItemBox";
import ExtraChargesModal from "./ExtraChargesModal";

function ItemsCard({
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
  // const [items, setItems] = useState([
  //   { id: crypto.randomUUID(), item: "", amount: 0, name: "" },
  // ]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      item: "",
      amount: 0,
      name: "",
    };
    setItems((prevItems) => {
      return [...prevItems, newItem];
    });
  };

  const deleteItem = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  useEffect(() => {
    const newItemTotalAmount = items.reduce(
      (total, item) => total + parseInt(item.amount),
      0
    );
    SetTotalPrice(newItemTotalAmount);
  }, [items]);

  function handleGrouping() {
    const groupedItems = items.reduce((group, item) => {
      const name = item.name;
      const existingGroup = group[name];
      if (existingGroup) {
        existingGroup.push(item);
      } else {
        group[name] = [item];
      }
      return group;
    }, []);
    setGroupItmes(groupedItems);
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Card variant="outlined">
          <CardContent>
            {items.map((item, index) => {
              return (
                <SingleItemBox
                  key={item.id}
                  item={item}
                  index={index}
                  setItems={setItems}
                  deleteItem={deleteItem}
                  SetTotalPrice={SetTotalPrice}
                />
              );
            })}
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={addItem}>
              Add Items
            </Button>
          </CardActions>
          <hr />

          <Grid container justifyContent="space-between">
            <Grid>
              <CardActions>
                <Button color="primary" onClick={handleGrouping}>
                  Add Expense
                </Button>
              </CardActions>
            </Grid>
            <Grid>
              <Typography variant="h6" color="error">
                Total Amount: ${totalPrice}
              </Typography>
            </Grid>
            <Grid>
              <CardActions>
                <Button color="primary" onClick={handleOpen}>
                  Continue
                </Button>
              </CardActions>
            </Grid>
            <ExtraChargesModal
              open={open}
              handleClose={handleClose}
              totalPrice={totalPrice}
              charges={charges}
              setCharges={setCharges}
              SetUserOrder={SetUserOrder}
              groupItems={groupItems}
            />
          </Grid>
        </Card>
      </Container>
    </>
  );
}
export default ItemsCard;
