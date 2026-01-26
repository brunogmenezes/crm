require('dotenv').config();
const { syncDatabase } = require('./models');

syncDatabase()
  .then(() => {
    console.log('✓ Banco de dados sincronizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('✗ Erro ao sincronizar banco:', error);
    process.exit(1);
  });
