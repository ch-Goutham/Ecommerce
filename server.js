const productRoutes = require('./routes/auth');
const userRoutes = require('./routes/products');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
