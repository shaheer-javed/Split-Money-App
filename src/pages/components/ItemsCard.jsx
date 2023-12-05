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

import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import SingleItemBox from "./SingleItemBox";

function ItemsCard() {
  return (
    <Container maxWidth="md" pt="2">
      <Card variant="outlined">
        <CardContent>
          <SingleItemBox />
        </CardContent>
        <CardActions>
          <Button color="primary">Add Items</Button>
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
              Total Amount
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
