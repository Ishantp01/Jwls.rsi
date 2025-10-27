export default () => (
    {
        mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/jeweller_management',
        port: (process.env.PORT || 5000, 10) as number,
      });