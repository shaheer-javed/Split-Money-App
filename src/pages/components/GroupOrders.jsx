import { Container, Card, CardContent, Typography, Grid } from "@mui/material";
import OrdersCardItems from "./OrdersCardItems";

function GroupOrders({ groupItems }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid
        container
        // justifyContent="space-evenly"
      >
        {Object.keys(groupItems).map((key) => {
          const itemArr = groupItems[key];

          const newOrderPrice = itemArr.reduce(
            (total, item) => total + parseFloat(item.amount),
            0
          );

          return (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 275, my: 2 }} key={key}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {key}
                  </Typography>
                  <OrdersCardItems itemArr={itemArr} />
                  <hr />
                  <Grid container justifyContent="space-between">
                    <Grid>
                      <Typography variant="span">Price</Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="span">${newOrderPrice}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
export default GroupOrders;
