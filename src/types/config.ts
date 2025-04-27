export type BuildMode = 'development' | 'production';

export interface EnvObj {
  mode: BuildMode;
  port: number;
}
