type Command<C> = C;
type CommandResult<R> = R;
type HandleCommand<R, C> = (results: CommandResult<R>[], commands: Command<C>) => CommandResult<R>;

export const handleCommands = <C,R>(
  commands: Command<C>[],
  handleCommand: HandleCommand<R, C>
): CommandResult<R>[] => {
  let results: CommandResult<R>[] = [];
  for (const command of commands) {
    results.push(handleCommand(results, command));
  }
  return results;
};
