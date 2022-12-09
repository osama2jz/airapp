import { FC } from "react";
import { Cities, CityProps } from "./types";

export const DisplayCityData: FC<CityProps> = ({
    city,
    data,
  }) => {
    return (
      <>
        <h2>{city}</h2>
        {data?.map((obj: Cities, ind: number) => (
          <div key={ind}>
            <div style={{ display: "flex", gap: "5px" }}>
              <h5>{ind + 1}: Location: </h5>
              <p> {obj.location} </p>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <h5>Measurement: </h5>
              <p>
                {obj.measurements[0].parameter +
                  " " +
                  obj.measurements[0].value +
                  " " +
                  obj.measurements[0].unit}
              </p>
            </div>
          </div>
        ))}
      </>
    );
  };