const connection = require('knex')({
    client: 'mysql',
    connection: {
      host: 'dmj.rm153.com',
      user: 'root',
      database: 'dbplb',
      password: '321',
      port: '7777',
    }
  });
  
  connection.raw('SELECT 1')
    .then(() => {
      console.log('Koneksi database berhasil');
    })
    .catch((err) => {
      console.error('Koneksi database gagal:', err);
    });

  module.exports = connection;
  