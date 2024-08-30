import { Box, IconButton, Input, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@emotion/react";

const labelStyles = {
  mb: 1,
  display: "inline-flex",
  fontWeight: 600,
};

const iconButtonStyles = {
  padding: 8,
  border: "0.125rem dashed #D9DBDC",
  borderRadius: "1rem",
  backgroundColor: "#F2F4F8",
  width: "9.85rem",
  height: "9.85rem",
  mb: 2,
};

const FileUploadInput = ({ handleImageChangeChild, webinarAvatar }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="body2"
        component="label"
        htmlFor="file-upload-input"
        sx={{...labelStyles, fontSize: theme.typography.customFontSizes.xsmall}}
      >
        Instructor Image
      </Typography>
      <Input
        accept="image/*"
        id="file-upload"
        onChange={handleImageChangeChild}
        type="file"
        sx={{ display: "none" }}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="file-upload">
          <IconButton color="primary" component="span" sx={iconButtonStyles}>
            <AddIcon />
          </IconButton>
        </label>
        {webinarAvatar && (
          <Box>
            <img
              src={webinarAvatar}
              alt="Preview"
              style={{
                width: "10rem",
                height: "10rem",
                borderRadius: "1rem",
                marginLeft: "1rem",
                objectFit: "cover",
                paddingTop: "0.125rem",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FileUploadInput;
