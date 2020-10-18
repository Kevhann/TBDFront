import { Action } from './enums';

export type Color = { red: number; green: number; blue: number };
type Mode = 'create' | 'modify';
export type Config = { mode: Mode; dimension: number; roughness: number; action: Action };

export type BaseFormProps = {
  refresh: () => void;
  onDownload?: () => void;
} & FormProps;

export type FormProps = {
  onChange: (value: any) => void;
  config: Config;
};

export type BitMap = number[][];

export type ActionMap = { [key in Action]: (...inputs: any) => BitMap };
