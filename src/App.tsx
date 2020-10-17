import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { gaussian } from './blurs/gaussian';
import { Canvas } from './canvas';
import { FormBase } from './components/form-base';
import { randomNoise } from './terrain';
import { Config } from './typings/types';

export const App = () => {
  const initial: Config = {
    dimension: 512,
    roughness: 1,
    mode: 'create'
  };

  const [config, setConfig] = React.useState<Config>(initial);
  const [map, setMap] = React.useState<number[][]>(
    randomNoise(initial.dimension, initial.dimension)
  );

  const refresh = () => {
    setMap(gaussian(randomNoise(config.dimension, config.dimension), 2, 5));
  };
  return (
    <Container style={{ marginTop: '15px' }}>
      <FormBase config={config} onChange={setConfig} refresh={refresh} />
      {/* <SelectForm config={config} onChange={setConfig} /> */}
      <Canvas config={config} map={map} />
    </Container>
  );
};
