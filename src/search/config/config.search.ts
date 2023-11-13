interface ISearchConfig {
  node: string;
  maxRetries: number;
  requestTimeout: number;
  sniffOnStart: boolean;
}

export class ConfigSearch {
  public static searchConfig(url: string): ISearchConfig {
    return {
      node: url,
      maxRetries: 2,
      requestTimeout: 10000,
      sniffOnStart: false,
    };
  }
}
