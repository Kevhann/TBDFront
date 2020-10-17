export type Color = { red: number; green: number; blue: number };
type Mode = 'create' | 'modify';
export type Config = { mode: Mode; dimension: number; roughness: number };

export type FormProps = {
  onChange: (value: any) => void;
  config: Config;
  refresh: () => void;
};
