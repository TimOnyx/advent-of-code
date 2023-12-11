export const reverseValues = (commands: any[]) => {
  return commands.map(command => ({ values: command.values.reverse() }));
};
