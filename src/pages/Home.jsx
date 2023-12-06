import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import ItemsCard from "./components/ItemsCard";
import { useState } from "react";

function Home() {
  const [totalPrice, SetTotalPrice] = useState(0);
  return (
    <>
      <ItemsCard SetTotalPrice={SetTotalPrice} totalPrice={totalPrice} />
    </>
  );
}
export default Home;
