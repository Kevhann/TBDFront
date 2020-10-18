import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { Canvas } from '../canvas';
import { BaseFormProps, Config } from '../typings/types';
import { CreateForm } from './form-create';
import { ModifyForm } from './form-modify';
import { Spacer, Box } from './layout';

export const FormBase = ({ config, onChange, refresh }: BaseFormProps) => {
  const handleModeChange = () => {
    onChange({ ...config, mode: 'modify' });
  };

  const getContent = () => {
    if (config.mode === 'create') {
      return <CreateForm config={config} onChange={onChange} />;
    }

    if (config.mode === 'modify') {
      return <ModifyForm config={config} onChange={onChange} />;
    }
    return <div>This is not supposed to happen</div>;
  };

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
        {getContent()}

        <Spacer>
          <Button onClick={onDownload}>Download</Button>
          <Button onClick={handleModeChange}>Modify</Button>
          <Button onClick={handleRefresh}>Generate</Button>
        </Spacer>
      </Box>
    </>
  );
};
