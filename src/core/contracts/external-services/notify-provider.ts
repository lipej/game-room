export interface INotifyProvider {
  publish: (userId: string, provider: 'PSN') => Promise<void>;
}
