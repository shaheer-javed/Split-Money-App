import { List, Typography, Grid } from "@mui/material";

function OrdersCard({ itemArr }) {
  return (
    <>
      {itemArr.map((item) => {
        console.log(item);
        return (
          <>
            <List key={crypto.randomUUID()}>
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
    </>
  );
}
export default OrdersCard;
