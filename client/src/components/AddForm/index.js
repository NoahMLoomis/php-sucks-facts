import { useState } from "react";

import { Button, TextField, Alert, Stack, Grid } from "@mui/material";
import axios from "axios";

const AddForm = () => {
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [newReason, setNewReason] = useState("");

  axios.get("/facts").then((d) => console.log(d));

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh", minWidth: "40vw" }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "40vw" }}
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            variant="standard"
            label="Why do you hate php?"
            onChange={(e) => setNewReason(e.target.value)}
            fullWidth
          />
          <Button
            variant="outlined"
            onClick={() => {
              axios
                .post("/facts/add", {
                  data: newReason,
                })
                .then((d) => {
                  setDisplaySuccess(true);
                  // There's gotta be a way to do this with a prop in Alert...
                  setTimeout(() => {
                    setDisplaySuccess(false);
                  }, 3000);
                })
                .catch((e) => {
                  setDisplayError(true);
                  // There's gotta be a way to do this with a prop in Alert...
                  setTimeout(() => {
                    setDisplayError(false);
                  }, 3000);
                });
            }}
          >
            Add
          </Button>
        </Stack>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {displayError && (
          <Alert severity="error">
            Think hard! There must be a reason you hate it
          </Alert>
        )}
        {displaySuccess && (
          <Alert severity="success">Another reason added!</Alert>
        )}
      </Grid>
    </>
  );
};
export default AddForm;
