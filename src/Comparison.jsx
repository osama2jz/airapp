import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";

export const ComparisonScreen = () => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [city1Data, setCity1Data] = useState();
  const [city2Data, setCity2Data] = useState();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      "https://api.openaq.org/v2/cities?limit=10000&page=1&offset=0&sort=asc&order_by=city",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        response.results.map((obj, key) => {
          let city = { key: key, text: obj.city, value: obj.city };
          city.text && setCities((prev) => [...prev, city]);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const compare = () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&city=${city1}&order_by=lastUpdated&dumpRaw=false`,
      options
    )
      .then((response) => response.json())
      .then((response) => setCity1Data(response.results))
      .catch((err) => console.error(err));
    fetch(
      `https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&city=${city2}&order_by=lastUpdated&dumpRaw=false`,
      options
    )
      .then((response) => response.json())
      .then((response) => setCity2Data(response.results))
      .catch((err) => console.error(err));
  };
  console.log(city1Data, city2Data);
  return (
    <Container>
      <h1 style={{textAlign:'center'}}>Air Quality Assessment</h1>
      <Segment>
        <Label attached="top">
          <Header as="h4">
            Select cities to compare their air quality index
          </Header>
        </Label>
        <Grid columns={3} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Dropdown
                placeholder="Select City 1"
                fluid
                search
                selection
                value={city1}
                onChange={(e, data) => setCity1(data.value)}
                options={cities && cities}
              />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="top">
            <Form>
              <Dropdown
                placeholder="Select City 2"
                fluid
                search
                onChange={(e, data) => setCity2(data.value)}
                value={city2}
                selection
                options={cities && cities}
              />
            </Form>
          </Grid.Column>
          <Grid.Column verticalAlign="top">
            <Button primary onClick={compare}>
              Compare
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
      {city1Data && city2Data && (
        <>
          <h1>Comparision</h1>
          <Segment>
            <Grid columns={2} relaxed="very">
              <Grid.Column>
                <h2>{city1}</h2>
                {city1Data.map((obj, ind) => (
                  <>
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
                  </>
                ))}
              </Grid.Column>
              <Grid.Column>
                <h2>{city2}</h2>

                {city2Data.map((obj, ind) => (
                  <>
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
                  </>
                ))}
              </Grid.Column>
            </Grid>

            <Divider vertical>VS</Divider>
          </Segment>
        </>
      )}
    </Container>
  );
};
