import { useState } from "react";
import { isEmpty, map, filter } from "lodash";

import {
  Box,
  Chip,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";

import { useGetAvailableYears } from "../api/useGetAvailableYears";
import { useWeather } from "../context/WeatherContext";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";

export const YearSelector = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { selectedYears, setSelectedYears } = useWeather();

  const {
    data: yearsAvailable = [],
    isLoading: isLoadingYears,
    isRefetching: isRefetchingAvailableYears,
    error: yearsError,
    refetch: refetchAvailableYears
  } = useGetAvailableYears();

  const handleYearSelectionChange = (event) => {
    const selectedYears = event.target.value;
    setMenuOpen(false);
    setSelectedYears(selectedYears);
  }

  const handleClearSelectedYears = () => {
    setSelectedYears([]);
  }

  const handleDeleteYear = (yearToDelete) => {
    setSelectedYears(filter(selectedYears, (year) => year !== yearToDelete));
  }

  const handleOnClick = () => {
    setMenuOpen(!isMenuOpen);
  }

  if (yearsError) {
    return (
      <ErrorMessage message={`Query of available years failed: ${yearsError}`} />
    );
  }

  if (isLoadingYears) {
    return (
      <Loader message="Loading available years" />
    );
  }

  return (
    <Stack direction="row" spacing={1} alignItems="flex-end">
      <FormControl variant="standard">
        <InputLabel id="select-year-label">
          Select Year(s)
        </InputLabel>
        <Select
          compact="true"
          disabled={isEmpty(yearsAvailable) || isRefetchingAvailableYears}
          id="select-year"
          input={(
            <Input id="select-multiple-chip" label="Chip" sx={{ minWidth: '250px' }} />
          )}
          labelId="select-year-label"
          onChange={handleYearSelectionChange}
          onClick={handleOnClick}
          open={isMenuOpen}
          renderValue={(selected) =>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {map(selected, (year) => (
                <Chip
                  key={year}
                  label={year}
                  onDelete={() => handleDeleteYear(year)}
                />
              ))}
            </Box>
          }
          value={selectedYears}
          multiple
        >
          {map(yearsAvailable, (year, i) =>
            <MenuItem key={i} value={year}>{year}</MenuItem>
          )}
        </Select>
      </FormControl>
      <Box>
        <IconButton
          onClick={refetchAvailableYears}
          loading={isRefetchingAvailableYears}
          size="small"
          title="Refresh available years"
        >
          <RefreshIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          onClick={handleClearSelectedYears}
          size="small"
          title="Clear all selected years"
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
