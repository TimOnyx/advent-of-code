import { MapCommand } from './MapCommandGenerator';

export interface MapCommandResult {
  from: string;
  to: string;
  mapId: (source: number) => number;
}

export const handleMapCommand = (
  resuls: MapCommandResult[], command: MapCommand
): MapCommandResult => {
  const mapId = (value: number) => {
    for (const range of command.ranges) {
      const startOfRange = range.startSource;
      const endOfRange = range.startSource + range.length - 1;
      if (value >= startOfRange && value <= endOfRange) {
        return range.startTarget + (value - startOfRange);
      }
    }

    return value;
  };
  return {
    from: command.from,
    to: command.to,
    mapId,
  };
};
