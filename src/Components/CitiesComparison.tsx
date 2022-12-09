import { FC } from "react"
import { Divider, Grid, Segment } from "semantic-ui-react"
import { CitiesProps } from "./types"
import { DisplayCityData } from "./CityData"

export const ComparisonBlock: FC<CitiesProps> =({city1,data1,city2,data2}) =>{
    return(
      <>
            <h1>Comparision</h1>
            <Segment>
              <Grid columns={2} relaxed="very">
                <Grid.Column>
                <DisplayCityData city={city1} data={data1} />
                </Grid.Column>
                <Grid.Column>
                  <DisplayCityData city={city2} data={data2} />
                </Grid.Column>
              </Grid>
              <Divider vertical>VS</Divider>
            </Segment>
          </>
    )
  }