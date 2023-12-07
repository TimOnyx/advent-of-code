import { MapCommandResult } from './MapCommandHandler';

export const generateMaps = (mapResults: MapCommandResult[]) => {
  const maps: Record<string, MapCommandResult> = {};
  mapResults.forEach(result => {
    maps[`${result.from}-${result.to}`] = result;
  });
  return maps;
};
