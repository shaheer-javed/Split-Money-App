import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const itemList = [
  { label: "Burger" },
  { label: "Shawarma" },
  { label: "Wrap" },
  { label: "Platter" },
  { label: "Fries" },
  { label: "Coke" },
  { label: "Sprite" },
  { label: "Fanta" },
];

function SingleItemBox({ item, setItems, index, deleteItem }) {
  const handleInputChange = (event) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index][event.target.name] = event.target.value;
      return newItems;
    });
  };

  const handleItemSelectChange = (event) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].item = event.target.innerText || event.target.value; // this logic is good dont touch it
      //   console.log(newItems);
      return newItems;
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid>
          <Autocomplete
            // disablePortal
            id="item"
            name="item"
            options={itemList}
            sx={{ width: 220 }}
            renderInput={(params) => <TextField {...params} label="Items" />}
            onChange={(e) => handleItemSelectChange(e)}
            onBlur={(e) => handleItemSelectChange(e)}
          />
        </Grid>
        <Grid>
          <TextField
            id="amount"
            name="amount"
            label="Enter Amount"
            type="number"
            variant="outlined"
            value={item.amount}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid>
          <TextField
            id="name"
            name="name"
            label="Enter Name"
            variant="outlined"
            value={item.name}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid xs="auto">
          <Button
            variant="text"
            color="error"
            onClick={() => deleteItem(item.id)}
          >
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
export default SingleItemBox;
