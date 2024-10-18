export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.HTTP_PORT),
  dbUri: process.env.DB_URI,
  secret: process.env.SECRET,
  cors: process.env.CORS_ORIGIN,
});
