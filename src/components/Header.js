import { AppBar, Button, Container, Toolbar, Typography, useTheme } from "@mui/material";
import ModalWebinar from "./ModalWebinar";

const appBarStyles = {
  backgroundColor: "#fff",
  boxShadow: "none",
};
const toolBarStyles = {
  borderBottom: "0.125rem solid #E3E7EC",
  justifyContent: "space-between",
  minHeight: "6rem !important",
};
const btnStyles = {
  borderRadius: "0.75rem",
  textTransform: "capitalize",
  boxShadow: "0px 8px 20px -8px #0E51F1",
  px: 4,
  py: 2,
  mr: 5.5,
};

const Header = ({ handleAddWebinar, open, handleClose, setWebinars, webinar, webinars, isEdit, handleAddWebinarClick }) => {
  const theme = useTheme();

  return (
    <>
      <Container maxWidth="xl">
        <AppBar
          sx={{
            ...appBarStyles,
            color: theme.palette.text.primary,
          }}
        >
          <Toolbar
            sx={toolBarStyles}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: theme.typography.customFontSizes.large,
                pl: 5.5,
              }}
            >
              Webinar
            </Typography>
            <Button
              onClick={handleAddWebinarClick}
              variant="contained"
              sx={{
                ...btnStyles,
                fontSize: theme.typography.customFontSizes.medium,
              }}
            >
              Add webinar
            </Button>
            <ModalWebinar
              handleAddWebinarChild={handleAddWebinar}
              isEditChild={isEdit}
              webinarsChild={webinars}
              webinarChild={webinar}
              setWebinarsChild={setWebinars}
              openChild={open}
              handleCloseChild={handleClose}
            />
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
};
export default Header;
