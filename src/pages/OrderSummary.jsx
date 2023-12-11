import {
  Container,
  Button,
  Typography,
  TextField,
  TableContainer,
  TableHead,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom/dist";

function OrderSummary({ userOrder, charges }) {
  // console.log(userOrder);
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="md" sx={{ maxWidth: 700 }}>
        <Typography variant="h6">Bill Summary</Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Menu Items</TableCell>
                <TableCell align="center">Bill</TableCell>
                <TableCell align="center">Delivery/Tip</TableCell>
                <TableCell align="center">Tax</TableCell>
                <TableCell align="center">Total Bill</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userOrder.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.items.map((item) => {
                      return <div>{item}</div>;
                    })}
                  </TableCell>
                  <TableCell align="center">${row.bill}</TableCell>
                  <TableCell align="center">${row.delivery_tip}</TableCell>
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
          variant="text"
          color="success"
          onClick={() => navigate("/paybill")}
        >
          Pay Bill
        </Button>
      </Container>
    </>
  );
}
export default OrderSummary;
