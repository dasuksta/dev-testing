// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Start server on Port specififed in variables.env file
const app = require('./server');
app.set('PORT', process.env.PORT || 5000);
const server = app.listen(app.get('PORT'), () => {
  console.log(`Server is listening on port: ${server.address().port}`);
});
