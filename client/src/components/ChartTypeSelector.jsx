import { isEmpty, map } from "lodash";

import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material";

import graphChartTypes from "../configs/graph-chart-types";
import { useWeather } from "../context/WeatherContext";

export const ChartTypeSelector = () => {
  const { chartType, setChartType, selectedYears } = useWeather();

  if (isEmpty(selectedYears)) {
    return null;
  }

  return (
    <FormControl>
      <FormLabel id="chart-type-group-label">Chart Type</FormLabel>
      <RadioGroup
        aria-labelledby="chart-type-group-label"
        name="chart-type-group"
        onChange={(e) => setChartType(e.target.value)}
        value={chartType}
        row
      >
        {map(graphChartTypes, ({ label, key }) => (
          <FormControlLabel
            control={<Radio />}
            label={label}
            key={key}
            value={key}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
