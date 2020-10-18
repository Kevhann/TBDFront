import * as React from 'react';
import { Select, Header, Input, Table } from 'semantic-ui-react';
import { generations } from '../typings/enums';
import { Config, FormProps } from '../typings/types';
import { Spacer, Label } from './layout';

export const CreateForm = ({ config, onChange }: FormProps) => {
  return (
    <>
      <Header>Create New Image</Header>

      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Dimensions</Table.Cell>
            <Table.Cell>
              <Input
                value={config.dimension}
                type="number"
                onChange={value => onChange({ ...config, dimension: Number(value.target.value) })}
              />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Roughness</Table.Cell>
            <Table.Cell>
              <Input
                value={config.roughness}
                type="number"
                onChange={value => onChange({ ...config, roughness: Number(value.target.value) })}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

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
      <Spacer>
        <Label>Mode </Label>
        <Select
          options={generations.map(g => ({ value: g, text: g }))}
          value={config.action}
          onChange={(_a, data) => {
            onChange({ ...config, action: data.value });
          }}
          opti
        />
      </Spacer>
    </>
  );
};
