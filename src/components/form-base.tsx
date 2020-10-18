import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { Canvas } from '../canvas';
import { BaseFormProps, Config } from '../typings/types';
import { CreateForm } from './form-create';
import { ModifyForm } from './form-modify';
import { Spacer, Box } from './layout';

export const FormBase = ({ config, onChange, refresh }: BaseFormProps) => {
  const handleRefresh = () => {
    refresh();
  };
  const onDownload = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }

    const img = canvas.toDataURL('image/png');

    let btn = document.createElement('a');
    btn.href = img;
    btn.download = '';
    btn.id = 'downloadHref';
    const anchor = document.body.appendChild(btn);
    var x0sp = document.getElementById('downloadHref');
    if (x0sp) {
      x0sp.click();
      document.body.removeChild(anchor);
    }
  };
  return (
    <>
      <Box>
        <CreateForm config={config} onChange={onChange} />
        <Spacer>
          <Button onClick={handleRefresh}>Generate</Button>
        </Spacer>
      </Box>
      <Box>
        <ModifyForm config={config} onChange={onChange} />
        <Spacer>
          <Button onClick={handleRefresh}>Apply</Button>
        </Spacer>
      </Box>
      <Button onClick={onDownload}>Download</Button>
    </>
  );
};
