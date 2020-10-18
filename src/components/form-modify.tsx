import * as React from 'react';
import { Header, Input } from 'semantic-ui-react';
import { Config, FormProps } from '../typings/types';

import { Spacer, Label } from './layout';

export const ModifyForm = ({ config, onChange }: FormProps) => {
  return (
    <>
      <Header>Modify image</Header>

      <Spacer>
        <Label>Dimensions</Label>
        <Input
          value={config.dimension}
          type="number"
          onChange={value => onChange({ ...config, dimension: Number(value.target.value) })}
          width="2"
        />
      </Spacer>
      <Spacer>
        <Label>Roughness </Label>
        <Input
          value={config.roughness}
          type="number"
          onChange={value => onChange({ ...config, roughness: Number(value.target.value) })}
          width="2"
        />
      </Spacer>
    </>
  );
};
