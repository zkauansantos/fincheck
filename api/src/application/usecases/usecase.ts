export interface UseCase<TInput = any, TOutput = any> {
  execute(input: TInput): TOutput;
}
