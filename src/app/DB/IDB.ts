interface IDB {
  connect(url?: string): Promise<void>,
  disconnect(): Promise<void>
}

export default IDB;
