import * as React from 'react';
import { Header, Input, Grid, Select } from 'semantic-ui-react';
import { MODIFICATION_MODES } from '../typings/enums';
import { Config, FormProps, Modification, ModificationModes } from '../typings/types';

import { Spacer, Label } from './layout';

export type Props = {
  onChange: (value: Modification) => void;
  config: Modification;
};

export const ModifyForm = ({ config, onChange }: Props) => {
  const getOptions = () => {
    switch (config.mode) {
      case 'gaussian': {
        return (
          <Grid.Row>
            <Grid.Column>Standard Deviation</Grid.Column>
            <Grid.Column>
              <Input
                value={config.standardDeviation}
                type="number"
                onChange={value =>
                  onChange({ ...config, standardDeviation: Number(value.target.value) })
                }
              />
            </Grid.Column>
          </Grid.Row>
        );
      }
      case 'neighbour': {
        return;
      }
      default: {
        return <div>Something went wrongs</div>;
      }
    }
  };
  return (
    <>
      <Header>Apply Modification to image</Header>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>Mode</Grid.Column>
          <Grid.Column>
            <Select
              options={MODIFICATION_MODES.map(g => ({ value: g, text: g }))}
              value={config.mode}
              onChange={(_a, data) => {
                onChange({ ...config, mode: data.value as ModificationModes });
              }}
            />
          </Grid.Column>
        </Grid.Row>
        {getOptions()}
      </Grid>
    </>
  );
};
