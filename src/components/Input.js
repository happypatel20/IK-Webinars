import { useTheme } from "@emotion/react";
import { TextField, Typography } from "@mui/material";

const labelStyles = {
  mb: 1,
  display: "inline-flex",
  fontWeight: 600,
};
const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.75rem",
    padding: 0,
    height: "3.438rem",
    backgroundColor: "#F2F4F8",
  },
  "& input": {
    px: 3,
  },
  mb: 2,
};

const Input = ({ label, placeholder, value, onChange, name, id, onBlur, error, helperText }) => {
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="body2"
        component="label"
        htmlFor="custom-input"
        sx={{...labelStyles, fontSize: theme.typography.customFontSizes.xsmall}}
      >
        {label}
        <span style={{ color: "#BE1818" }}>*</span>
      </Typography>
      <TextField
        name={name}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        id={id}
        value={value}
        onChange={onChange}
        variant="outlined"
        placeholder={placeholder}
        fullWidth
        autoComplete="off"
        sx={{...textFieldStyles, fontSize: theme.typography.customFontSizes.xsmall}}
      />
    </>
  );
};

export default Input;
