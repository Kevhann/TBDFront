import * as React from 'react';
import { Config, FormProps } from '../typings/types';
import { CreateForm } from './form-create';
import { ModifyForm } from './form-modify';

export const FormBase = ({ config, onChange, refresh }: FormProps) => {
  const [input, setInput] = React.useState<Config>(config);
  const handleSubmit = () => {
    onChange({ ...config, ...input });
  };

  if (config.mode === 'create') {
    return <CreateForm config={config} onChange={onChange} refresh={refresh} />;
  }

  if (config.mode === 'modify') {
    return <ModifyForm config={config} onChange={onChange} refresh={refresh} />;
  }
  return <div>This is not supposed to happen</div>;
};
