import React from "react";
import { find, isEmpty, some } from "lodash";

import { Stack } from "@mui/material";
import { CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import colors from "../configs/graph-colors";
import { useWeather } from "../context/WeatherContext";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { useGetWeatherDataByYears } from "../api/useGetWeatherDataByYears";

export const YearGraph = () => {
  const { chartType, selectedYears } = useWeather();

  const yearQueries = useGetWeatherDataByYears(selectedYears);

  const isLoading = some(yearQueries, (query) => query.isLoading);
  const error = find(yearQueries, (query) => query.error)?.error;

  const yearData = yearQueries
    .filter(query => query.data)
    .map(query => query.data);

  if (isEmpty(selectedYears)) {
    return null;
  }

  if (error) {
    return <ErrorMessage message={`Error fetching weather data: ${error.message}`} />;
  }

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" height={300} width={700}>
        <Loader message="Loading weather data" />
      </Stack>
    );
  }

  return (
    <LineChart
      width={700}
      height={300}
      data={yearData}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" allowDuplicatedCategory={false}>
        <Label value="Month" position="insideBottom" offset={-5} />
      </XAxis>
      <YAxis>
        <Label value="Temperature °C" position="insideLeft" angle={-90} />
      </YAxis>
      <Tooltip />
      <Legend verticalAlign="top" height={35} />
      {yearData.map((y, index) => (
        <Line
          activeDot={{ r: 8 }}
          data={y.data}
          dataKey={chartType}
          key={y.year}
          name={y.year}
          stroke={colors[index % 8]}
          type="monotone"
        />
      ))}
    </LineChart>
  );
};
