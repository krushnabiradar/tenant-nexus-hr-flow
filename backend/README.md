
# HRMS Microservices Backend

This is a microservice-based backend architecture for the HR Management System using Node.js, Express, and MongoDB.

## Architecture Overview

The system is composed of the following microservices:

1. **API Gateway** - Route requests to appropriate microservices
2. **Auth Service** - Handle authentication and authorization
3. **Tenant Service** - Manage company/tenant-related operations
4. **Employee Service** - Manage employee data
5. **Attendance Service** - Handle employee attendance
6. **Payroll Service** - Manage payroll operations
7. **Leave Service** - Handle leave requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- Docker and Docker Compose (optional, for containerized deployment)

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies for each service:

```bash
# Install root dependencies
npm install

# Install dependencies for each service
cd api-gateway && npm install
cd ../auth-service && npm install
cd ../tenant-service && npm install
cd ../employee-service && npm install
# ... and so on for other services
```

3. Set up environment variables for each service (see the `.env` files in each service directory)

4. Start MongoDB:

```bash
# If using MongoDB locally
mongod --dbpath /path/to/data/folder
```

5. Start all services:

```bash
# From the root directory
npm start
```

### Using Docker Compose

1. Make sure Docker and Docker Compose are installed
2. Build and start all services:

```bash
docker-compose up -d
```

3. To stop all services:

```bash
docker-compose down
```

## API Documentation

### Auth Service (Port 3001)

- **POST /register** - Register a new user
- **POST /login** - Login and get JWT token
- **GET /user** - Get current user details

### Tenant Service (Port 3002)

- **POST /** - Create a new tenant (Admin only)
- **GET /** - Get all tenants (Admin only)
- **GET /:id** - Get tenant by ID
- **PUT /:id** - Update tenant

### Employee Service (Port 3003)

- **POST /** - Create a new employee
- **GET /** - Get all employees (filtered by tenant)
- **GET /:id** - Get employee by ID
- **PUT /:id** - Update employee

## Security

- JWT-based authentication
- Role-based access control (RBAC)
- Attribute-based access control (ABAC) via user permissions

## Database Schema

The system uses MongoDB with the following main collections:

- **Tenants** - Companies/organizations in the system
- **Users** - System users with roles and permissions
- **Employees** - Employee profiles linked to users
- **Payroll** - Salary and payment information
- **Attendance** - Clock-in/out records
- **LeaveRequests** - Employee leave applications
- **Subscriptions** - Tenant subscription plans and billing

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
