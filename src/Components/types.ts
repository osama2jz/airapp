export type City = {
  key: number;
  text: string;
  value: string;
};

export type Measurements = {
  parameter: string;
  value: string;
  lastUpdated: string;
  unit: string;
};

export type Cities = {
  location: string;
  city: string;
  country: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  measurements: Measurements[];
};

export type CitiesResponse = {
  country: string;
  city: string;
  count: string;
  locations: string;
  firstUpdated: string;
  lastUpdated: string;
  parameters: string[];
};

export type CitiesProps = {
  city1: string;
  city2: string;
  data1: Cities[];
  data2: Cities[];
};
export type CityProps = {
  city: string;
  data: Cities[];
};
export type InputComponentProps = {
  city1: string;
  city2: string;
  setCity1: any;
  setCity2: any;
  cities: City[] | undefined;
  compare: () => void;
};
