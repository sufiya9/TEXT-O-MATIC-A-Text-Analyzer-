import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function MultilineTextFields() {
  const [value, setValue] = React.useState("");

  const ref = useRef(null);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          let paste = (e.clipboardData || window.clipboardData).getData("Text");
          setValue(paste);
        }}
      >
        Paste
      </Button>

      <div>
        <TextField
          ref={ref}
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={40}
          value={value}
        />
      </div>
    </Box>
  );
}
