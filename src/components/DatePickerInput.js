import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const datePickerStyles = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.875rem",
    height: "3.438rem",
    backgroundColor: "#F2F4F8"
  },
  "& input": {
    px: 3,
  },
};

const DatePickerInput = ({ value, onChange, name, id, onBlur, error, helperText }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="body1"
        component="label"
        sx={{
          mb: 1,
          display: "flex",
          fontSize: theme.typography.customFontSizes.xsmall,
          fontWeight: "600",
        }}
      >
        Start Date<span style={{ color: "#BE1818" }}>*</span>
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          fullWidth
          value={value}
          id={id}
          name={name}
          error={error}
          onBlur={onBlur}
          helperText={helperText}
          onChange={onChange}
          disablePast
          slotProps={{
            textField: {
              error: !!error,
              helperText,
            },
          }}
          sx={{
            ...datePickerStyles,
            fontSize: theme.typography.customFontSizes.xsmall,
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerInput;
