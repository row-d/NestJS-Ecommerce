export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        email: string;
        id: string;
        role: string;
      };
    }
  }
}
