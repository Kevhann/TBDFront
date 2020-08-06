import * as React from 'react';
import axios from 'axios';

export const App = () => {
  const [state, setState] = React.useState('working?');
  const handleTestClick = async () => {
    const res = await axios.get('http://localhost:3003/test');
    setState(res.data.name);
  };
  return (
    <>
      <div>Hello</div>
      <button onClick={handleTestClick}>Test</button>
      <div>{state}</div>
    </>
  );
};
