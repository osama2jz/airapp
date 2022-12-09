import { Button, Dropdown, Form, Grid, Header, Label, Segment } from "semantic-ui-react";
import { InputComponentProps } from "./types";

export const GetCitiesInputs = ({
    city1,
    city2,
    setCity1,
    setCity2,
    cities,
    compare,
  }: InputComponentProps) => {
    return (
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
                onChange={(e, data) =>
                  data?.value && setCity1(data?.value?.toString())
                }
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
                onChange={(e, data) =>
                  data?.value && setCity2(data?.value.toString())
                }
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
    );
  };