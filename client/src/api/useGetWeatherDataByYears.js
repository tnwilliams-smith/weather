import { useQueries } from "@tanstack/react-query";
import { map } from "lodash";

import months from "../configs/graph-months";

/**
 * Custom hook that fetches weather data for multiple years
 *
 * @param {Array<string>} selectedYears - Array of years to fetch data for
 * @returns {Array<Object>} Array of query results containing:
 *   - data: Formatted weather data with year and monthly temperature readings
 *   - isLoading: Loading state for each year's query
 *   - error: Error object if the query failed
 *
 * The hook:
 * - Makes parallel requests for each selected year
 * - Formats month numbers to month names
 * - Sorts data by month chronologically
 * - Uses infinite stale time (requires manual refresh)
 */
export const useGetWeatherDataByYears = (selectedYears) => {
  return useQueries({
    queries: map(selectedYears, (year) => ({
      queryKey: ['weather', year],
      queryFn: () => fetch(`https://u406ruqhf4.execute-api.eu-west-1.amazonaws.com/WeatherYears/weather?year=${year}`)
        .then((res) => {
          if (res.status === 504) {
            throw new Error(`Request for year ${year} timed out (Gateway Timeout)`);
          }
          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((json) => typeof json === 'string' ? JSON.parse(json || "[]") : json)
        .then((data) => {
          const sortedData = [...data].sort((a, b) => {
            return (typeof a.month === 'number' && typeof b.month === 'number')
              ? a.month - b.month
              : 0;
          });

          const formattedData = map(sortedData, (d) => ({
            ...d,
            month: typeof d.month === 'number' ? months[d.month] : d.month
          }));

          return { year, data: formattedData };
        }),
      staleTime: Infinity, // Manual refresh only.
    }))
  });
};
