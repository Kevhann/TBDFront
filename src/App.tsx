import * as React from 'react';
import 'fontsource-roboto';
import axios from 'axios';
import {Button} from '@material-ui/core'

export const App = () => {
  const [state, setState] = React.useState('working?');
  const handleTestClick = async () => {
    const res = await axios.get('http://localhost:3003/test');
    setState(res.data.name);
  };
  return (
    <>
      <div>Hello</div>
      <Button onClick={handleTestClick}>Test</Button>
      <div>{state}</div>
    </>
  );
};
