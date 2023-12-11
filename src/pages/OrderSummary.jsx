import {
  Container,
  Button,
  Typography,
  Box,
  TableContainer,
  TableHead,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Grid,
  CardContent,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom/dist";

let style = {
  fontWeight: 600,
};

function OrderSummary({ userOrder, charges }) {
  // console.log(userOrder);
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="md" sx={{ maxWidth: 700, my: 3 }} textAlign="center">
        <Box textAlign="center">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" style={style}>
                Bill Summary
              </Typography>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <Typography style={style}>Name</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography style={style}>Menu Items</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography style={style}>Bill</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography style={style}>Delivery/Tip</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography style={style}>Tax</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography style={style}>Total Bill</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userOrder.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">
                          {row.items.map((item) => {
                            return <div key={crypto.randomUUID()}>{item}</div>;
                          })}
                        </TableCell>
                        <TableCell align="center">${row.bill}</TableCell>
                        <TableCell align="center">
                          ${row.delivery_tip}
                        </TableCell>
                        <TableCell align="center">${row.tax}</TableCell>
                        <TableCell align="center">${row.totalBill}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <hr />
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Grand Total:</Typography>
                </Grid>
                <Grid item>
                  <Typography>${charges.grandTotal}</Typography>
                </Grid>
              </Grid>
              <hr />
              <Button
                variant="outlined"
                color="success"
                style={style}
                onClick={() => navigate("/paybill")}
              >
                Pay Bill
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
export default OrderSummary;
