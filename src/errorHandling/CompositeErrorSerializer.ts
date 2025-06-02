/**
 * An interface for aplying the composite pattern to error serializers
 */
export interface CompositeErrorSerializer {
  errorSerializers: CompositeErrorSerializer[];
  canHandle(error: Error): boolean;
  serialize(error: Error, serializer: CompositeErrorSerializer): object;
}
