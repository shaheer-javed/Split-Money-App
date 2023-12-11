import { Container, Card, CardContent, Typography, Grid } from "@mui/material";
import OrdersCardItems from "./OrdersCardItems";

function GroupOrders({ groupItems }) {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {Object.keys(groupItems).map((key) => {
          const itemArr = groupItems[key];

          const newOrderPrice = itemArr.reduce(
            (total, item) => total + parseInt(item.amount),
            0
          );

          return (
            <>
              <Card sx={{ maxWidth: 275 }} key={key}>
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
            </>
          );
        })}
      </Container>
    </>
  );
}
export default GroupOrders;
