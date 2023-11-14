import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { BaseSearchObject } from './base.search.object';

describe('Base Search Object', () => {
  let service: BaseSearchObject;

  beforeEach(async () => {
    class baseMock extends BaseSearchObject {
      allowedProperties = /^(name|role|email)$/;
    }
    service = new baseMock();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true for allowed properties', async () => {
    const result = service.verifySearchPropertie('role');

    expect(result).toBeTruthy();
  });

  it('should return false for not allowed properties', async () => {
    const result = service.verifySearchPropertie('bloft');

    expect(result).toBeFalsy();
  });

  it('should return key and value', async () => {
    const { key, value } = BaseSearchObject.extractKeyValue({ name: 'foo' });

    expect(key).toBe('name');
    expect(value).toBe('foo');
  });

  it('should return undefined for key and value undefined', async () => {
    const { key, value } = BaseSearchObject.extractKeyValue({});

    expect(key).toBeUndefined();
    expect(value).toBeUndefined();
  });
});
