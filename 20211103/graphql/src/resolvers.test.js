import { graphql, buildSchema } from 'graphql';

import rootResolvers from './resolvers';
import typeDefs from './typeDefs';

import photos from './photos.js';

jest.mock('./photos.js', () => []);

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

  afterEach(() => {
    photos.splice(0, photos.length);
  });

  context('photos with length 3', () => {
    beforeEach(() => {
      photos.push(1, 2, 3);
    });

    it('resolves photo length', async () => {
      const data = await execute({
        resolvers: rootResolvers.Query,
        query: `
          query { 
            totalPhotos 
          }
        `,
      });

      expect(data.totalPhotos).toBe(3);
    });
  });

  it('adds a photo', async () => {
    await execute({
      resolvers: rootResolvers.Mutation,
      query: `
        mutation newPhoto {
          postPhoto(name: "sample photo")
        }
      `,
    });

    expect(photos.length).toBe(1);
    expect(photos[0].name).toBe('sample photo');
  });
});
