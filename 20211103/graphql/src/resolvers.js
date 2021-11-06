import photos from './photos.js';

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
  },
  Mutation: {
    postPhoto: (args) => {
      photos.push(args);

      return true;
    },
  },
};

export default resolvers;
