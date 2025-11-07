# JewelHub Backend

A comprehensive jewelry shop management system backend built with NestJS and MongoDB.

## Features

- 🏪 Multi-tenant shop management
- 👥 User management with role-based access control
- 💎 Item and material inventory management
- 📊 Sales and purchase tracking
- 💰 Accounting and expense management
- 📈 Reports and analytics
- 🔒 JWT-based authentication
- 📝 Activity logging and audit trails

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=jewelhub
JWT_SECRET=your-secret-key
```

## Running the App

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Stop services
docker-compose down
```

## API Documentation

The API is available at `http://localhost:3000/api`

### Main Endpoints

- `/api/auth` - Authentication
- `/api/users` - User management
- `/api/shops` - Shop management
- `/api/items` - Item management
- `/api/materials` - Material management
- `/api/customers` - Customer management
- `/api/sales` - Sales transactions
- `/api/purchases` - Purchase orders
- `/api/inventory` - Inventory tracking
- `/api/jobs` - Job orders
- `/api/rates` - Metal and stone rates
- `/api/accounting` - Expenses and taxes
- `/api/audit` - Activity logs
- `/api/reports` - Reports and analytics

## Project Structure

```
src/
├── config/           # Configuration files
├── common/           # Shared utilities
│   ├── decorators/
│   ├── guards/
│   ├── middleware/
│   ├── interceptors/
│   ├── pipes/
│   ├── utils/
│   └── constants/
├── modules/          # Feature modules
│   ├── auth/
│   ├── user/
│   ├── shop/
│   ├── item/
│   ├── material/
│   ├── customer/
│   ├── sales/
│   ├── purchase/
│   ├── inventory/
│   ├── job/
│   ├── rates/
│   ├── accounting/
│   ├── audit/
│   ├── integration/
│   ├── reports/
│   └── file/
├── interfaces/       # TypeScript interfaces
└── tests/           # Test files
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

UNLICENSED
