import * as React from 'react';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import { BaseFormProps, Config } from '../typings/types';
import { CreateForm } from './form-create';
import { ModifyForm } from './form-modify';
import { Spacer, Box } from './layout';

export const FormBase = ({ config, onChange, create, modify }: BaseFormProps) => {
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
      <Segment>
        <Grid columns={2} divided>
          <Grid.Column>
            <CreateForm
              config={config.creation}
              onChange={value => onChange({ ...config, creation: value })}
            />
            <Spacer>
              <Button onClick={() => create()}>Generate</Button>
            </Spacer>
          </Grid.Column>
          <Grid.Column>
            <ModifyForm
              config={config.modification}
              onChange={value => onChange({ ...config, modification: value })}
            />
            <Spacer>
              <Button onClick={() => modify()}>Apply</Button>
            </Spacer>
          </Grid.Column>
        </Grid>
      </Segment>
      <Button onClick={onDownload}>Download</Button>
    </>
  );
};
