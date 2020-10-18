import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { gaussian } from './blurs/gaussian';
import { Canvas } from './canvas';
import { FormBase } from './components/form-base';
import { randomNoise, turbulatedBW } from './terrain';
import { generateSmooth } from './terrain-generation';
import { ActionMap, BitMap, Config } from './typings/types';

const initial: Config = {
  dimension: 512,
  roughness: 1,
  mode: 'create',
  action: 'random'
};

export const App = () => {
  const [config, setConfig] = React.useState<Config>(initial);
  const [bitMap, setBitMap] = React.useState<BitMap>(
    randomNoise(initial.dimension, initial.dimension)
  );

  const refresh = () => {
    console.log('config:', config);

    switch (config.action) {
      case 'gaussian': {
        setBitMap(gaussian(bitMap, 2, 5));
        break;
      }
      case 'neighbour': {
        setBitMap(turbulatedBW(bitMap, config.roughness));

        break;
      }
      case 'random': {
        setBitMap(randomNoise(config.dimension, config.dimension));

        break;
      }
      case 'smooth': {
        setBitMap(generateSmooth(config.dimension, config.roughness));
        break;
      }
      default: {
      }
    }
  };

  return (
    <Container style={{ marginTop: '15px' }}>
      <FormBase config={config} onChange={setConfig} refresh={refresh} />
      <Canvas bitMap={bitMap} />
    </Container>
  );
};
