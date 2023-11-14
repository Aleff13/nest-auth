export abstract class BaseSearchObject {
  abstract allowedProperties: RegExp;

  public verifySearchPropertie(searchPropertie: string): boolean {
    const searchPropertieMatch = this.allowedProperties.test(searchPropertie);
    return searchPropertieMatch;
  }

  public static extractKeyValue(query: Record<string, string>) {
    const keyValue = Object.entries(query);

    const key = keyValue?.[0]?.[0];
    const value = keyValue?.[0]?.[1];

    return { key, value };
  }
}
