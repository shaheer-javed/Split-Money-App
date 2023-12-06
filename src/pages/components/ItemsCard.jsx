import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import SingleItemBox from "./SingleItemBox";
import { useEffect, useState } from "react";

function ItemsCard({ totalPrice, SetTotalPrice }) {
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), item: "", amount: 0, name: "" },
  ]);

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
    console.log(newItemTotalAmount);
    SetTotalPrice(newItemTotalAmount);
  }, [items]);

  return (
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
              <Button color="primary">Add Expense</Button>
            </CardActions>
          </Grid>
          <Grid>
            <Typography variant="h6" color="error">
              Total Amount: ${totalPrice}
            </Typography>
          </Grid>
          <Grid>
            <CardActions>
              <Button color="primary">Continue</Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
export default ItemsCard;
