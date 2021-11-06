import { graphql, buildSchema } from 'graphql';

import rootResolvers from './resolvers';
import typeDefs from './typeDefs';

describe('resolver', () => {
  const schema = buildSchema(typeDefs);

  async function execute({ resolvers, query }) {
    const { data } = await graphql(
      schema,
      query,
      resolvers,
    );

    return data;
  }

  it('resolves query', async () => {
    const data = await execute({
      resolvers: rootResolvers.Query,
      query: `{ 
        totalPhotos 
      }`,
    });

    expect(data.totalPhotos).toBe(42);
  });
});
