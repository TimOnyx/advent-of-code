interface Range {
  startSource: number;
  startTarget: number;
  length: number;
}

export interface MapCommand {
  from: string;
  to: string;
  ranges: Range[];
}

// seed-to-soil map:
// 50 98 2
// 52 50 48

export const generateMapCommand = (lines: string[]): MapCommand => {
  let [description, ...rangeStrings] = lines;

  const cleanDescriptionString = description.replace(' map:', '');
  const [from, to] = cleanDescriptionString.split('-to-');

  const ranges = rangeStrings.map(rangeString => {
    const [startTarget, startSource, length] = rangeString.split(' ').map(Number);

    return {
      startSource,
      startTarget,
      length,
    };
  });

  return {
    from,
    to,
    ranges,
  };
};
