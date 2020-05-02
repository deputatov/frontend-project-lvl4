import { normalize, schema } from 'normalizr';

const getNormalizedData = (items) => {
  const data = { ids: items };
  const entitiesEntity = new schema.Entity('entities');
  const idsSchema = { ids: [entitiesEntity] };
  const normalized = normalize(data, idsSchema);
  const { entities, result } = normalized;
  return { ...result, ...entities };
};

export default getNormalizedData;
