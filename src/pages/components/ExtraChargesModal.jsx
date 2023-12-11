import {
  Button,
  Typography,
  TextField,
  Modal,
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const st = {
  width: "12rem",
  my: 2,
};

function ExtraChargesModal({
  open,
  handleClose,
  totalPrice,
  charges,
  setCharges,
  SetUserOrder,
  groupItems,
}) {
  /////////////////////////////////////////////////////////////

  const handleInputChange = (event) => {
    setCharges((prevCharges) => {
      const newCharges = { ...prevCharges };
      newCharges[event.target.name] = event.target.value;
      return newCharges;
    });
  };

  const navigate = useNavigate();

  const extraCharges =
    parseInt(charges.delivery) +
    parseInt(charges.tip) +
    (totalPrice * parseInt(charges.tax)) / 100;

  charges.grandTotal = totalPrice + extraCharges;

  const length = Object.keys(groupItems).length;

  function handleGenerateBill() {
    SetUserOrder([]);
    Object.keys(groupItems).map((key) => {
      const itemArr = groupItems[key];
      const arr = itemArr.reduce(
        (accumulator, currentElement) => {
          accumulator.name = currentElement.name;
          accumulator.items = accumulator.items.concat(currentElement.item);
          accumulator.bill += parseInt(currentElement.amount);
          return accumulator;
        },
        {
          name: "",
          items: [],
          bill: 0,
          delivery_tip: 0,
          tax: 0,
          totalBill: 0.0,
          paid: 0,
          remaining: 0,
        }
      );
      arr.delivery_tip =
        (parseInt(charges.delivery) + parseInt(charges.tip)) / length;
      arr.tax = (arr.bill * parseFloat(charges.tax)) / 100;
      arr.totalBill =
        parseInt(arr.delivery_tip) + parseFloat(arr.tax) + parseInt(arr.bill);

      arr.remaining = -arr.totalBill;
      SetUserOrder((prevOrderArr) => {
        return [...prevOrderArr, arr];
      });
    });

    navigate("/order-summary");
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Extra Charges
        </Typography>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item xs={6}>
            <TextField
              id="delivery"
              name="delivery"
              label="Delivery"
              type="number"
              variant="outlined"
              value={charges.delivery}
              onChange={(e) => handleInputChange(e)}
              sx={st}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="tip"
              name="tip"
              label="Tip"
              type="number"
              variant="outlined"
              value={charges.tip}
              onChange={(e) => handleInputChange(e)}
              sx={st}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="black">
              GST
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="tax"
              onChange={(e) => handleInputChange(e)}
            >
              <FormControlLabel value="16" control={<Radio />} label="16%" />
              <FormControlLabel value="5" control={<Radio />} label="5%" />
              <FormControlLabel value="0" control={<Radio />} label="None" />
            </RadioGroup>
          </Grid>

          <Grid item xs={6}>
            <Typography>Total Price:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>${totalPrice}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>Extra Charges:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>${extraCharges}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Grand Total:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>${charges.grandTotal}</Typography>
          </Grid>
        </Grid>

        <Button variant="text" color="primary" onClick={handleGenerateBill}>
          Generate Summary
        </Button>
      </Box>
    </Modal>
  );
}
export default ExtraChargesModal;
