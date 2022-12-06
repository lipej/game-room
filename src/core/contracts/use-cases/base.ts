export interface IBaseUseCase<T, K> {
  perform: (args: T) => Promise<K>;
}
