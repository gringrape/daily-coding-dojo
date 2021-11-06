import { graphql, buildSchema } from 'graphql';

describe('resolver', () => {
  const schema = buildSchema(`
    type Query {
      hello: String
    }
  `);

  const root = { hello: () => 'Hello world!' };

  async function execute(query, resolvers) {
    const { data } = await graphql(schema, query, resolvers);

    return data;
  }

  it('resolves query', async () => {
    const query = '{ hello }';

    const { hello } = await execute(query, root);

    expect(hello).toBe('Hello world!');
  });
});
