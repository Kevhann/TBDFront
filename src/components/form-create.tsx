import * as React from 'react';
import { Select, Header, Input, Table, Grid } from 'semantic-ui-react';
import { CREATION_MODES } from '../typings/enums';
import { Creation, CreationModes } from '../typings/types';
import { FormProps } from '../typings/types';

export type Props = {
  onChange: (value: Creation) => void;
  config: Creation;
};

export const CreateForm = ({ config, onChange }: Props) => {
  const getOptions = () => {
    switch (config.mode) {
      case 'random': {
        return;
      }
      case 'smooth': {
        return (
          <Grid.Row>
            <Grid.Column>Roughness</Grid.Column>
            <Grid.Column>
              <Input
                value={config.roughness}
                type="number"
                onChange={value => onChange({ ...config, roughness: Number(value.target.value) })}
              />
            </Grid.Column>
          </Grid.Row>
        );
      }
      default: {
        return <div>Something went wrongs</div>;
      }
    }
  };

  return (
    <>
      <Header>Create New Image</Header>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>Dimensions</Grid.Column>
          <Grid.Column>
            <Input
              value={config.dimension}
              type="number"
              onChange={value => onChange({ ...config, dimension: Number(value.target.value) })}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>Mode</Grid.Column>
          <Grid.Column>
            <Select
              options={CREATION_MODES.map(g => ({ value: g, text: g }))}
              value={config.mode}
              onChange={(_a, data) => {
                onChange({ ...config, mode: data.value as CreationModes });
              }}
            />
          </Grid.Column>
        </Grid.Row>
        {getOptions()}
      </Grid>
    </>
  );
};
