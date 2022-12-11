export abstract class BaseMiddleware {
  abstract execute: (req: any) => Promise<void>;
}
