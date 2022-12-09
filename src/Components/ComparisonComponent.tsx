import { FC, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { getData } from "../helper";
import { ComparisonBlock } from "./CitiesComparison";
import { GetCitiesInputs } from "./InputComponent";
import { Cities, CitiesResponse, City } from "./types";

export const ComparisonComponent: FC = () => {
  const [city1, setCity1] = useState<string>("");
  const [city2, setCity2] = useState<string>("");
  const [city1Data, setCity1Data] = useState<Cities[]>();
  const [city2Data, setCity2Data] = useState<Cities[]>();
  const [cities, setCities] = useState<City[]>();

  //useEffects

  //get the list of cities on first load
  useEffect(() => {
    getCitiesList();
  }, []);

  //Functions

  //call API to get list of cities and map data
  const getCitiesList = async () => {
    const data = await getData({
      url: "https://api.openaq.org/v2/cities?limit=10000&page=1&offset=0&sort=asc&order_by=city",
    });
    let temp: City[] = [];
    data?.forEach((obj: CitiesResponse, key: number) => {
      if (obj.city) {
        let city = { key: key, text: obj.city, value: obj.city };
        temp.push(city);
      }
    });
    setCities(temp);
  };

  //call API to get data for a city
  const getCityData = async (city: string): Promise<Cities[]> => {
    return await getData({
      url: `https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&city=${city}&order_by=lastUpdated&dumpRaw=false`,
    });
  };

  //get both cities data to display and compare
  const compare = async () => {
    setCity1Data(await getCityData(city1));
    setCity2Data(await getCityData(city2));
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Air Quality Assessment</h1>
      <GetCitiesInputs
        {...{ city1, city2, setCity1, setCity2, cities, compare }}
      />
      {city1Data && city2Data && (
        <ComparisonBlock
          city1={city1}
          city2={city2}
          data1={city1Data}
          data2={city2Data}
        />
      )}
    </Container>
  );
};
