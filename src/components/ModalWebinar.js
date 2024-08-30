import { Box, Button, Grid2, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import Input from "./Input";
import FileUploadInput from "./FileUploadInput";
import DatePickerInput from "./DatePickerInput";
import TimePickerInput from "./TimePickerInput";
import userAvatar from "../public/images/userAvatar.png";
import { getRandomColor } from "../utils/helper";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "1.125rem",
  boxShadow: 24,
  maxHeight: "90vh",
  overflow: "auto",
};

const validationSchema = yup.object({
  instructorName: yup
    .string("Enter your Instructor Name")
    .required("Instructor Name is required"),
  instructorRole: yup
    .string("Enter the Instructor Role")
    .required("Instructor Role is required"),
  instructorCompany: yup
    .string("Enter the Instructor Company")
    .required("Instructor Company is required"),
  instructorTopics: yup
    .string("Enter the Instructor Topics")
    .required("Instructor Topics are required"),
  webinarTitle: yup
    .string("Enter the Webinar Title")
    .required("Webinar Title is required"),
  startDate: yup
    .date()
    .nullable()
    .required("Date is required")
    .min(dayjs().startOf("day").toDate(), "Start date cannot be before today"),
  startTime: yup
    .date("Select the Start Time")
    .required("Start Time is required"),
  endTime: yup
    .date("Select the End Time")
    .required("End Time is required")
    .min(yup.ref("startTime"), "End time cannot be before start time"),
});

const ModalWebinar = ({ openChild, handleCloseChild, handleAddWebinarChild, webinarChild, setWebinarsChild, webinarsChild, isEditChild }) => {

  const [webinarAvatar, setWebinarAvatar] = useState("");
  const theme = useTheme();
  const isTab = useMediaQuery("(max-width:1024px)");

  const formik = useFormik({
    initialValues: {
      instructorName: "",
      instructorRole: "",
      instructorCompany: "",
      instructorTopics: "",
      webinarTitle: "",
      startDate: null,
      startTime: null,
      endTime: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      handleCreateWebinar(values);
      resetForm();
      setWebinarAvatar("");
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (webinarChild) {
      formik.setValues({
        instructorName: webinarChild.instructorName || "",
        instructorRole: webinarChild.instructorRole || "",
        instructorCompany: webinarChild.instructorCompany || "",
        instructorTopics: webinarChild.instructorTopics || "",
        webinarTitle: webinarChild.webinarTitle || "",
        startDate: dayjs(webinarChild.startDate) || null,
        startTime: dayjs(webinarChild.startTime) || null,
        endTime: dayjs(webinarChild.endTime) || null,
      });
      setWebinarAvatar(webinarChild.instructorAvatar || "");
    }
  }, [isEditChild, webinarChild]);

  const handleCreateWebinar = (values) => {
    if (isEditChild) {
      const updatedWebinars = webinarsChild.map((webinarDetails) =>
        webinarDetails.instructorName === webinarChild.instructorName
          ? {
              ...webinarDetails,
              ...values,
              instructorAvatar: webinarAvatar,
            }
          : webinarDetails
      );
      setWebinarsChild(updatedWebinars);
    } else {
      // Adding a new webinar
      const newWebinar = {
        ...values,
        instructorAvatar: webinarAvatar || userAvatar,
        randomColor: getRandomColor(),
      };
      handleAddWebinarChild(newWebinar);
    }

    handleCloseChild();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWebinarAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    setWebinarAvatar("");
    handleCloseChild();
  };


  return (
    <Modal
      open={openChild}
      onClose={handleCloseChild}
      aria-labelledby="create-webinar-title"
      sx={{backdropFilter: 'blur(0.185rem)'}}
    >
      <form onSubmit={formik.handleSubmit}>
      <Box sx={{...modalStyles, width: isTab ? "90%" : "75rem", maxHeight: isTab ? '80vh' : '90vh'}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "0.125px solid #E3E7EC",
              px: 4,
              py: 2,
            }}
          >
            <Typography
              id="create-webinar-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: theme.typography.customFontSizes.large,
                fontWeight: "600",
              }}
            >
              Create webinar
            </Typography>
            <CloseIcon onClick={handleCloseChild} sx={{ cursor: "pointer" }} />
          </Box>

          <Grid2 container spacing={4} sx={{ px: 4, py: 2 }}>
            <Grid2 size={{ xs: 1 }} sx={{ textAlign: "center" }}>
              <PeopleAltOutlinedIcon />
            </Grid2>
            <Grid2 size={{ xs: 11 }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: theme.typography.customFontSizes.small,
                }}
              >
                Instructor Details
              </Typography>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={4} sx={{ px: 4 }}>
            <Grid2 container size={{ xs: 1 }}></Grid2>
            <Grid2 container size={{ xs: 11 }} spacing={4}>
              <Grid2 size={{ sm: 6 }}>
                <Input
                  id="instructorName"
                  name="instructorName"
                  label={"Instructor Name"}
                  value={formik.values.instructorName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.instructorName &&
                    Boolean(formik.errors.instructorName)
                  }
                  helperText={
                    formik.touched.instructorName &&
                    formik.errors.instructorName
                  }
                  placeholder={"Type the instructor name "}
                />
                <Input
                  id="instructorRole"
                  name="instructorRole"
                  label={"Instructor Role"}
                  value={formik.values.instructorRole}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.instructorRole &&
                    Boolean(formik.errors.instructorRole)
                  }
                  helperText={
                    formik.touched.instructorRole &&
                    formik.errors.instructorRole
                  }
                  placeholder={"Type the instructor role "}
                />
                <Input
                  id="instructorCompany"
                  name="instructorCompany"
                  label={"Instructor Company"}
                  value={formik.values.instructorCompany}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.instructorCompany &&
                    Boolean(formik.errors.instructorCompany)
                  }
                  helperText={
                    formik.touched.instructorCompany &&
                    formik.errors.instructorCompany
                  }
                  placeholder={"Type the instructor company "}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <FileUploadInput
                  handleImageChangeChild={handleImageChange}
                  webinarAvatar={webinarAvatar}
                />
                <Input
                  id="instructorTopics"
                  name="instructorTopics"
                  label={"Topics"}
                  value={formik.values.instructorTopics}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.instructorTopics &&
                    Boolean(formik.errors.instructorTopics)
                  }
                  helperText={
                    formik.touched.instructorTopics &&
                    formik.errors.instructorTopics
                  }
                  placeholder={"Type the topics"}
                />
              </Grid2>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={4} sx={{ px: 4, py: 2 }}>
            <Grid2 size={{ xs: 1 }} sx={{ textAlign: "center" }}>
              <PhotoCameraFrontIcon />
            </Grid2>
            <Grid2 size={{ xs: 11 }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: theme.typography.customFontSizes.small,
                }}
              >
                Webinar Details
              </Typography>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={4} sx={{ px: 4 }}>
            <Grid2 container size={{ xs: 1 }}></Grid2>
            <Grid2 size={{ xs: 11 }}>
              <Input
                id="webinarTitle"
                name="webinarTitle"
                label={"Webinar Title"}
                value={formik.values.webinarTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.webinarTitle &&
                  Boolean(formik.errors.webinarTitle)
                }
                helperText={
                  formik.touched.webinarTitle && formik.errors.webinarTitle
                }
                placeholder={"Type the webinar title "}
              />
            </Grid2>
          </Grid2>

          <Grid2 container spacing={4} sx={{ px: 4 }}>
            <Grid2 container size={{ xs: 1 }}></Grid2>
            <Grid2 container size={{ xs: 11 }} spacing={4}>
              <Grid2 size={{ xs: 12, sm: 3 }}>
                <DatePickerInput
                  id="startDate"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={(value) => formik.setFieldValue("startDate", value)}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 3 }}>
                <TimePickerInput
                  id="startTime"
                  name="startTime"
                  label={"Start Time"}
                  value={formik.values.startTime}
                  onChange={(value) => formik.setFieldValue("startTime", value)}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.startTime && Boolean(formik.errors.startTime)
                  }
                  helperText={
                    formik.touched.startTime && formik.errors.startTime
                  }
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 3 }}>
                <TimePickerInput
                  id="endTime"
                  name="endTime"
                  label={"End Time"}
                  value={formik.values.endTime}
                  onChange={(value) => formik.setFieldValue("endTime", value)}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.endTime && Boolean(formik.errors.endTime)
                  }
                  helperText={formik.touched.endTime && formik.errors.endTime}
                />
              </Grid2>
            </Grid2>
          </Grid2>

          <Box
            mt={3}
            sx={{ p: 2, borderTop: "1px solid #E3E7EC", px: 4, py: 2 }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "0.75rem",
                textTransform: "capitalize",
                px: 3,
                py: 2,
                fontSize: theme.typography.customFontSizes.small,
              }}
            >
              {isEditChild ? 'Update' : 'Create'} webinar
            </Button>
            <Button
              onClick={handleCancel}
              variant="text"
              color="primary"
              sx={{
                fontWeight: "600",
                borderRadius: 28,
                px: 3,
                py: 2,
                textTransform: "capitalize",
                fontSize: theme.typography.customFontSizes.small,
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};
export default ModalWebinar;
