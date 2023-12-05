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
  { label: "Shwarma" },
  { label: "Wrap" },
  { label: "Platter" },
  { label: "Fries" },
  { label: "Coke" },
  { label: "Sprite" },
  { label: "Fanta" },
];


function SingleItemBox() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={itemList}
            sx={{ width: 220 }}
            renderInput={(params) => <TextField {...params} label="Items" />}
          />
        </Grid>
        <Grid>
          <TextField
            id="standard-number"
            label="Enter Amount"
            type="number"
            variant="outlined"
          />
        </Grid>
        <Grid>
          <TextField
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
          />
        </Grid>
        <Grid xs="auto">
          <Button variant="text" color="error">
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
export default SingleItemBox;
