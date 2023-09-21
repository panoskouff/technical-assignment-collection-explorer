import { getCustomers } from './utils/getCustomers'

class ServerMemoryContext {
  private static instance: ServerMemoryContext
  private data: { [key: string]: any }

  private constructor() {
    this.data = {}
  }

  public static init(): void {
    if (!ServerMemoryContext.instance) {
      ServerMemoryContext.instance = new ServerMemoryContext()
      ServerMemoryContext.instance.data = {}
      // initiate startup operations
      this.initiateMockDataService()
    }
  }

  private static initiateMockDataService(): void {
    /* getCustomers could be an API call
      but for our project we just read the file  */
    const mockDataCustomers = getCustomers()
    this.instance.data.mockDataCustomers = mockDataCustomers
  }

  public static get(key: string): any {
    return ServerMemoryContext.instance ? ServerMemoryContext.instance.data[key] : null
  }

  public static set(key: string, value: any): void {
    if (ServerMemoryContext.instance) {
      ServerMemoryContext.instance.data[key] = value
    }
  }
}

export default ServerMemoryContext
