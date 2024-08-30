import React from "react";
import { FormControl, Grid2, InputAdornment, InputLabel,  MenuItem, Select, Stack, TextField} from "@mui/material";
import { useTheme } from "@emotion/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import WebinarCard from "./WebinarCard";

const WebinarContainer = ({ webinars, handleDelete, handleEdit, searchValue, allTopics, handleSelection, handleSearch }) => {
  const theme = useTheme();
  return (
    <>
      <Stack
        sx={{ justifyContent: "space-between", paddingTop: "8rem" }}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 4, sm: 2, md: 4 }}
      >
        <TextField
          value={searchValue}
          onChange={handleSearch}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              px: 3,
              fontSize: theme.typography.customFontSizes.small,
            },
            "& input": {
              py: 3,
              px: 0,
            },
          }}
          variant="outlined"
          placeholder="Search for webinar"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  {" "}
                  <SearchIcon style={{ color: "#6B7280" }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl
          sx={{
            minWidth: "15.625rem",
            fontSize: theme.typography.customFontSizes.small,
          }}
        >
          <InputLabel id="demo-simple-select-label" sx={{ color: "#2E333B" }}>
            Topics
          </InputLabel>
          <Select
            onChange={handleSelection}
            label="Topics"
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              fontSize: theme.typography.customFontSizes.small,
              borderRadius: "0.75rem",
              "& .MuiSelect-select": {
                p: 3,
              },
            }}
          >
            <MenuItem
              value=""
              sx={{ fontSize: theme.typography.customFontSizes.small }}
            >
              Clear Filter
            </MenuItem>
            {allTopics.map((webinarTopic) => (
              <MenuItem key={webinarTopic}
                value={webinarTopic}
                sx={{ fontSize: theme.typography.customFontSizes.small }}
              >
                {webinarTopic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Grid2 container spacing={4} sx={{ my: 5 }}>
        {webinars.map((webinar, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <WebinarCard
              webinar={webinar}
              handleEditChild={() => handleEdit(index)}
              handleDeleteChild={() => handleDelete(index)}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
export default WebinarContainer;
