module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'smart_order',
    }
  },
  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'smart_order',
    }
  }
};
