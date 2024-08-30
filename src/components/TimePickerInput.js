import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const TimePickerStyles = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.75rem",
    height: "3.438rem",
    backgroundColor: "#F2F4F8",
  },
  "& input": {
    px: 3,
  },
}

const TimePickerInput = ({ label, value, onChange, name, id, onBlur, error, helperText }) => {
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="body1"
        component="label"
        htmlFor="custom-input"
        sx={{
          mb: 1,
          display: "flex",
          fontSize: theme.typography.customFontSizes.xsmall,
          fontWeight: "600",
        }}
      >
        {label}
        <span style={{ color: "#BE1818" }}>*</span>
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={value}
          name={name}
          id={id}
          onBlur={onBlur}
          helperText={helperText}
          error={error}
          onChange={onChange}
          slotProps={{
            textField: {
              error: !!error,
              helperText,
            },
          }}
          sx={{
            ...TimePickerStyles,    
            fontSize: theme.typography.customFontSizes.xsmall,
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default TimePickerInput;
