
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Tenant = require('./models/Tenant');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample data
const tenants = [
  {
    name: 'Acme Corporation',
    domain: 'acme.com',
    plan: 'Business',
    totalEmployees: 45,
    status: 'Active'
  }
];

const users = [
  { 
    email: "admin@example.com", 
    password: "password", 
    role: "admin", 
    name: "Admin User" 
  },
  { 
    email: "company@example.com", 
    password: "password", 
    role: "company", 
    name: "Company Admin",
    tenantDomain: "acme.com" 
  },
  { 
    email: "employee@example.com", 
    password: "password", 
    role: "employee", 
    name: "John Employee",
    tenantDomain: "acme.com" 
  },
  { 
    email: "manager@example.com", 
    password: "password", 
    role: "manager", 
    name: "Sarah Manager",
    tenantDomain: "acme.com" 
  },
  { 
    email: "finance@example.com", 
    password: "password", 
    role: "finance", 
    name: "Finance User",
    tenantDomain: "acme.com" 
  },
  { 
    email: "compliance@example.com", 
    password: "password", 
    role: "compliance", 
    name: "Compliance User",
    tenantDomain: "acme.com" 
  },
  { 
    email: "recruitment@example.com", 
    password: "password", 
    role: "recruitment", 
    name: "Recruitment User",
    tenantDomain: "acme.com" 
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Tenant.deleteMany({});
    await User.deleteMany({});
    
    console.log('Deleted existing data');
    
    // Create tenants
    const createdTenants = await Tenant.insertMany(tenants);
    console.log('Created tenants:', createdTenants.map(t => t.name));
    
    // Create tenant map for easy lookup
    const tenantMap = {};
    createdTenants.forEach(tenant => {
      tenantMap[tenant.domain] = tenant._id;
    });
    
    // Hash passwords and assign tenant IDs
    const usersToCreate = await Promise.all(users.map(async user => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      return {
        ...user,
        password: hashedPassword,
        tenantId: user.tenantDomain ? tenantMap[user.tenantDomain] : undefined
      };
    }));
    
    // Create users
    const createdUsers = await User.insertMany(usersToCreate);
    console.log('Created users:', createdUsers.map(u => u.email));
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Run the seed function
seedDatabase();
