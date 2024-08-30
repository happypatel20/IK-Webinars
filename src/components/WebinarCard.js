import { Card, CardContent, CardMedia, Typography, Button, Box, useTheme } from "@mui/material";
import { getDay, getMonthDate, getTime } from "../utils/helper";

const styles = {
  card: {
    borderRadius: "2rem",
    p: 4.5,
    border: "0.125rem solid #E3E7EC",
    boxShadow: "0px 20px 46px -24px #0E10131F",
  },
  headerBox: {
    display: "flex",
    borderRadius: "1.5rem",
    padding: 4.5,
    color: "#fff",
    justifyContent: "space-between",
  },
  profileImage: {
    width: "7rem",
    height: "7rem",
    borderRadius: "1.3rem",
  },
  title: {
    fontWeight: "600",
    color: "#741DE3",
  },
  subtitle: {
    fontWeight: "600",
    my: 0.5,
    noWrap: true,
  },
  date: {
    color: "#2E333B",
  },
  buttonContained: {
    mr: 1,
    borderRadius: "50rem",
    backgroundColor: "#F9E8E8",
    color: "#D14040",
    textTransform: "capitalize",
    fontWeight: "600",
    boxShadow: 0,
    px: 5,
    py: 2,
  },
  buttonText: {
    fontWeight: "600",
    borderRadius: "50rem",
    px: 5,
    py: 2,
    textTransform: "capitalize",
  },
};

const WebinarCard = ({ webinar, handleDeleteChild, handleEditChild }) => {
  const { instructorName, instructorRole, instructorCompany, instructorTopics, instructorAvatar, webinarTitle, startDate, startTime, endTime, randomColor } = webinar;
  const theme = useTheme();

  const date = new Date(startDate);
  const webinarStartDay = getDay(date);
  const webinarStartMonthDate = getMonthDate(date);

  const startTime1 = getTime(new Date(startTime));
  const endTime1 = getTime(new Date(endTime));

  return (
    <Card sx={styles.card}>
      <Box sx={{ ...styles.headerBox, backgroundColor: `${randomColor}` }}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontSize: theme.typography.customFontSizes.large }}
          >
            {instructorName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: theme.typography.customFontSizes.small }}
          >
            {instructorRole}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: theme.typography.customFontSizes.small }}
          >
            {instructorCompany}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          image={instructorAvatar}
          alt="avatar"
          sx={styles.profileImage}
        />
      </Box>

      <CardContent sx={{ p: 3, pb: "0 !important" }}>
        <Typography
          variant="subtitle1"
          sx={{
            ...styles.title,
            fontSize: theme.typography.customFontSizes.small,
            color: `${randomColor}`,
          }}
        >
          {instructorTopics}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            ...styles.subtitle,
            fontSize: theme.typography.customFontSizes.large,
          }}
        >
          {webinarTitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ...styles.date,
            fontSize: theme.typography.customFontSizes.small,
          }}
        >
          {webinarStartDay} • {webinarStartMonthDate}, {startTime1} - {endTime1}
        </Typography>

        <Box sx={{ mt: 5 }}>
          <Button
            onClick={handleDeleteChild}
            variant="contained"
            sx={{
              ...styles.buttonContained,
              fontSize: theme.typography.customFontSizes.small,
            }}
          >
            Delete
          </Button>
          <Button
            onClick={handleEditChild}
            variant="text"
            color="primary"
            sx={{
              ...styles.buttonText,
              fontSize: theme.typography.customFontSizes.xsmall,
            }}
          >
            Edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WebinarCard;
