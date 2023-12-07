import { MapCommandResult } from './MapCommandHandler';

export interface LocationCommand {
  seed: number;
  maps: Record<string, MapCommandResult>;
}

export interface LocationCommandResult {
  location: number;
}

export const handleLocationCommand = (
  resuls: LocationCommandResult[], command: LocationCommand
): LocationCommandResult => {
  const seed = command.seed;
  const soil = command.maps['seed-soil'].mapId(seed);
  const fertilizer = command.maps['soil-fertilizer'].mapId(soil);
  const water = command.maps['fertilizer-water'].mapId(fertilizer);
  const light = command.maps['water-light'].mapId(water);
  const temperature = command.maps['light-temperature'].mapId(light);
  const humidity = command.maps['temperature-humidity'].mapId(temperature);
  const location = command.maps['humidity-location'].mapId(humidity);

  return {
    location,
  };
};
