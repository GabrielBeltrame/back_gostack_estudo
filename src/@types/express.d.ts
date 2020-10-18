declare namespace Express {

  // Ele não substituia, mas anexa
  export interface Request {
    user: {
      id: string
    }
  }
}
