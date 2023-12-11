import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom/dist";

export default function Navbar({
  SetTotalPrice,
  setItems,
  setGroupItmes,
  SetUserOrder,
  setCharges,
}) {
  const navigate = useNavigate();
  function handleNewExpense() {
    SetTotalPrice(0);
    setItems([{ id: crypto.randomUUID(), item: "", amount: 0, name: "" }]);
    setGroupItmes([]);
    SetUserOrder([]);
    setCharges({
      delivery: 0,
      tip: 0,
      tax: 0,
      grandTotal: 0,
    });
    navigate("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            Split Money App
          </Typography>
          <Button color="inherit" onClick={handleNewExpense}>
            Add New Expense
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
