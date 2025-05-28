import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://admin:CSSE3101@storecluster.odvlhos.mongodb.net/StoreDB?retryWrites=true&w=majority&appName=StoreCluster';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // Add other admin fields as necessary
});

const customerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // Add other customer fields as necessary
});

export const Admin = mongoose.model('admininfos', adminSchema, 'admininfos');
export const Customer = mongoose.model('customerinfos', customerSchema, 'customerinfos');

module.exports = {
    connectDB,
    Admin,
    Customer,
};mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});