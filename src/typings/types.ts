import { CREATION_MODES, MODIFICATION_MODES } from './enums';

export type Color = { red: number; green: number; blue: number };

export type CreationModes = typeof CREATION_MODES[number];
export type ModificationModes = typeof MODIFICATION_MODES[number];

export type Creation = { dimension: number; roughness: number; mode: CreationModes };
export type Modification = {
  range: number;
  standardDeviation: number;
  mode: ModificationModes;
  roughness: number;
};

export type Config = { creation: Creation; modification: Modification };

export type BaseFormProps = {
  create: () => void;
  modify: () => void;
  onDownload?: () => void;
} & FormProps;

export type FormProps = {
  onChange: (value: Config) => void;
  config: Config;
};

export type BitMap = number[][];
