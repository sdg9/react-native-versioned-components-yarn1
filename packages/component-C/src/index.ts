import { getVersion as getVersionA } from "@dfs-demo/component-a";

export const getVersion = () => {
  return `Component-C 0.1.0 (local) referencing ${getVersionA()}`;
};
