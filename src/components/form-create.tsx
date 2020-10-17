import * as React from 'react';
import { Header, Button, Input, Container } from 'semantic-ui-react';
import { Config, FormProps } from '../typings/types';
import styled from 'styled-components';

const Spacer = styled.div`
  width: 100%;
  margin-bottom: 5px;
  margin-top: 5px;
  align-content: center;
  justify-content: space-between;
`;

const Label = styled.label`
  margin-right: 10px;
`;
const Box = styled.div`
  margin-bottom: 20px;
  padding: 12px;
  width: 400px;
  border-radius: 4px;

  box-shadow: 2px 2px 5px grey;
`;

export const CreateForm = ({ config, onChange, refresh }: FormProps) => {
  const [input, setInput] = React.useState<Config>(config);
  const handleSubmit = () => {
    onChange({ ...config, ...input });
  };

  const handleModeChange = () => {
    onChange({ ...config, mode: 'modify' });
  };
  return (
    <>
      <Box>
        <Header>Create image</Header>

        <Spacer>
          <Label>Dimensions</Label>
          <Input
            value={input.dimension}
            type="number"
            onChange={value => setInput({ ...config, dimension: Number(value.target.value) })}
            width="2"
          />
        </Spacer>
        <Spacer>
          <Label>Roughness </Label>
          <Input
            value={input.roughness}
            type="number"
            onChange={value => setInput({ ...config, roughness: Number(value.target.value) })}
            width="2"
          />
        </Spacer>

        <Spacer>
          <Button onClick={handleModeChange}>Modify</Button>
          <Button onClick={() => refresh()}>Generate</Button>
        </Spacer>
      </Box>
    </>
  );
};
