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
  Box,
  CardContent,
  Card,
} from "@mui/material";
import { useState, useEffect } from "react";

let style = {
  fontWeight: 600,
};

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
  // console.log(userOrder);

  useEffect(() => {
    let newTotal = userOrder.reduce((acc, curr) => acc + curr.paid, 0);
    newTotal = newTotal.toFixed(2);
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
  // console.log(`Remaining ${totalRemaining}`);

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
      return `${text} gets back $${(paidTotal - charges.grandTotal).toFixed(
        2
      )} from us`;
    } else if (
      paidTotal == charges.grandTotal &&
      Arr.length < userOrder.length &&
      Arr.length != 0
    ) {
      return `${text} gets back $${Math.abs(totalRemaining).toFixed(
        2
      )} from ${newText}`;
    } else if (
      paidTotal > charges.grandTotal &&
      Arr.length < userOrder.length &&
      Arr.length != 0
    ) {
      return `${text} gets back $${Math.abs(totalRemaining).toFixed(
        2
      )} from ${newText} and $${(paidTotal - charges.grandTotal).toFixed(
        2
      )} from us`;
    } else {
      //everyone paid what they owed
      console.log("Every one is happy");
    }
  }

  console.log(paidTotal);
  console.log(charges.grandTotal);
  return (
    <>
      <Container maxWidth="md" sx={{ maxWidth: 700, my: 3 }}>
        <Box textAlign="center">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" style={style}>
                Pay The Bill
              </Typography>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <Typography style={style}>Name</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography style={style}>Bill</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography style={style}>Paid</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography style={style}>Remaining</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userOrder.map((row, index) => {
                      let remainingPaid = Math.abs(
                        row.totalBill - row.paid
                      ).toFixed(2);
                      return (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="left">
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
                              size="small"
                              value={row.paid}
                              onChange={(event) =>
                                handlePaidChange(index, event.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell align="center">
                            {row.totalBill == row.paid ? (
                              <Typography variant="body2" color="green">
                                Settled
                              </Typography>
                            ) : row.totalBill <= row.paid ? (
                              <Typography variant="body2" color="orange">
                                Surplus ${remainingPaid}
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="red">
                                ${remainingPaid}
                              </Typography>
                            )}
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
                  <Typography style={style}>Grand Total:</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {paidTotal == charges.grandTotal ? (
                      <Typography variant="body1" color="green" style={style}>
                        Pay the Bill
                      </Typography>
                    ) : paidTotal > charges.grandTotal ? (
                      <Typography variant="body1" color="green" style={style}>
                        Your Are In Surplus $
                        {Math.abs(paidTotal - charges.grandTotal).toFixed(2)}
                      </Typography>
                    ) : (
                      <Typography variant="body1" color="red" style={style}>
                        Remaining $
                        {Math.abs(paidTotal - charges.grandTotal).toFixed(2)}
                      </Typography>
                    )}
                  </Typography>
                </Grid>
              </Grid>
              {paidTotal >= charges.grandTotal ? (
                <Button
                  variant="outlined"
                  color="success"
                  style={style}
                  onClick={() => setIsPaid(true)}
                >
                  Pay Amount
                </Button>
              ) : (
                <Button disabled>Pay Amount</Button>
              )}
            </CardContent>
          </Card>

          {isPaid ? (
            <>
              <hr />
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="initial">
                    Settle Payments
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {afterPayment()}
                  </Typography>
                </CardContent>
              </Card>
            </>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </>
  );
}
export default PayBill;
