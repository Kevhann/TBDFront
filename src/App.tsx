import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { gaussian } from './blurs/gaussian';
import { Canvas } from './canvas';
import { FormBase } from './components/form-base';
import { randomNoise, turbulatedBW } from './terrain';
import { generateSmooth } from './terrain-generation';
import { ActionMap, Config } from './typings/types';

const initial: Config = {
  dimension: 512,
  roughness: 1,
  mode: 'create',
  action: 'random'
};

export const App = () => {
  const [config, setConfig] = React.useState<Config>(initial);
  const [map, setMap] = React.useState<number[][]>(
    randomNoise(initial.dimension, initial.dimension)
  );

  const refresh = () => {
    console.log('config:', config);

    switch (config.action) {
      case 'gaussian': {
        setMap(gaussian(map, 2, 5));
        break;
      }
      case 'neighbour': {
        setMap(turbulatedBW(map, config.roughness));

        break;
      }
      case 'random': {
        setMap(randomNoise(config.dimension, config.roughness));

        break;
      }
      case 'smooth': {
        setMap(generateSmooth(config.dimension, config.roughness));
        break;
      }
      default: {
      }
    }
  };

  return (
    <Container style={{ marginTop: '15px' }}>
      <FormBase config={config} onChange={setConfig} refresh={refresh} />
      <Canvas map={map} />
    </Container>
  );
};
