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
import { useState, useEffect } from "react";

function PayBill({ userOrder, charges, SetUserOrder }) {
  const [paidTotal, setPaidTotal] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  const handlePaidChange = (index, value) => {
    SetUserOrder((prevUserOrder) => {
      const updatedUserOrder = [...prevUserOrder];
      updatedUserOrder[index].paid = parseFloat(value);
      updatedUserOrder[index].remaining =
        parseFloat(value) - updatedUserOrder[index].totalBill;
      return updatedUserOrder;
    });
  };
  console.log(userOrder);

  useEffect(() => {
    const newTotal = userOrder.reduce((acc, curr) => acc + curr.paid, 0);
    setPaidTotal(newTotal);
    const newRemaining = userOrder.reduce((acc, curr) => {
      if (curr.remaining < 0) {
        return acc + curr.remaining;
      } else {
        return acc;
      }
    }, 0);
    setTotalRemaining(newRemaining);
  }, [userOrder]);
  console.log(`Remaining ${totalRemaining}`);

  function afterPayment() {
    let Arr = userOrder
      .filter((person) => person.remaining > 0)
      .map((obj) => obj.name);
    let text = Arr.toString();

    let newArr = userOrder
      .filter((person) => person.remaining < 0)
      .map((obj) => obj.name);

    let newText = newArr.toString();

    if (paidTotal > charges.grandTotal && newArr.length == 0) {
      console.log(`${text} gets  $${paidTotal - charges.grandTotal} from us`);
    } else if (
      paidTotal == charges.grandTotal &&
      Arr.length < userOrder.length &&
      Arr.length != 0
    ) {
      console.log(`${text} gets $${totalRemaining} from ${newText}`);
    } else if (
      paidTotal > charges.grandTotal &&
      Arr.length < userOrder.length &&
      Arr.length != 0
    ) {
      console.log(
        `${text} gets $${totalRemaining} from ${newText} and $${
          paidTotal - charges.grandTotal
        } from us`
      );
    } else {
      //everyone paid what they owed
      console.log("Every one is happy");
    }
  }

  // console.log(paidTotal);
  return (
    <>
      <Container maxWidth="md" sx={{ maxWidth: 700 }}>
        <Typography variant="h6">Pay The Bill</Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Bill</TableCell>
                <TableCell align="center">Paid</TableCell>
                <TableCell align="center">Remaining</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userOrder.map((row, index) => {
                let remainingPaid = Math.abs(row.totalBill - row.paid);
                return (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">${row.totalBill}</TableCell>
                    <TableCell align="center">
                      <TextField
                        id="amount"
                        name="amount"
                        label="Enter Amount"
                        type="number"
                        variant="outlined"
                        value={row.paid}
                        onChange={(event) =>
                          handlePaidChange(index, event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      {row.totalBill == row.paid
                        ? "Settled"
                        : row.totalBill <= row.paid
                        ? `Surplus ${remainingPaid}`
                        : remainingPaid}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <hr />
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>Grand Total:</Typography>
          </Grid>
          {/* <Grid item>
            <Typography>${charges.grandTotal}</Typography>
          </Grid> */}
          <Grid item>
            <Typography>
              {paidTotal == charges.grandTotal
                ? "Pay the Bill"
                : paidTotal > charges.grandTotal
                ? `Your Are In Surplus $${Math.abs(
                    paidTotal - charges.grandTotal
                  )}`
                : `Remaining $${Math.abs(paidTotal - charges.grandTotal)} `}
            </Typography>
          </Grid>
        </Grid>
        <hr />
        <Button variant="text" color="success" onClick={() => setIsPaid(true)}>
          Pay Amount
        </Button>
        <hr />
        {/* {paidTotal == charges.grandTotal
          ? "EveryOne is happy"
          : paidTotal >= charges.grandTotal
          ? `You'll get $${paidTotal - charges.grandTotal} from us back`
          : afterPayment()} */}
        {/* {afterPayment()} */}

        {isPaid ? afterPayment() : ""}
      </Container>
    </>
  );
}
export default PayBill;
