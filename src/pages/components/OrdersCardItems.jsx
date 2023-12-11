import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  Typography,
  TextField,
  Autocomplete,
  Grid,
} from "@mui/material";

function OrdersCard({ itemArr }) {
  return (
    <div>
      {itemArr.map((item) => {
        console.log(item);
        return (
          <>
            <List>
              <Grid container justifyContent="space-between">
                <Grid>
                  <Typography variant="span">{item.item}</Typography>
                </Grid>
                <Grid>
                  <Typography variant="span">${item.amount}</Typography>
                </Grid>
              </Grid>
            </List>
          </>
        );
      })}
    </div>
  );
}
export default OrdersCard;
