import * as React from 'react';
import { Select, Header, Input } from 'semantic-ui-react';
import { generations } from '../typings/enums';
import { Config, FormProps } from '../typings/types';
import { Spacer, Label } from './layout';

export const CreateForm = ({ config, onChange }: FormProps) => {
  return (
    <>
      <Header>Create image</Header>

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
      {/* <Spacer>
        <Label>Mode </Label>
        <Select
        options={generations.map(g => ({value: g, text: g}))}
          value={input.roughness}
          type="number"
          onChange={value => setInput({ ...config, action: value. })}
          opti
        />
      </Spacer> */}
    </>
  );
};
