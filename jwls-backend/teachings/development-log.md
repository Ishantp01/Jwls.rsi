**JewelHub Backend Development Log**  
Started: October 24, 2025

---

**PROJECT SETUP - ES MODULES**

First thing we did was enable ES modules in the project. Added `"type": "module"` to package.json because we want to use modern import/export syntax instead of the old require() stuff.

Important gotcha: Even though we're writing TypeScript (.ts files), we have to import with .js extensions because that's what the files compile to. So it looks like:
```typescript
import { AppModule } from './app.module.js';
```

This is just how ES modules work in Node.js. Took a minute to get used to but it's the modern standard.

---

**DEPENDENCIES WE INSTALLED**

Had to add a bunch of packages to get everything working with NestJS 11. Version compatibility was a pain but got it sorted.

**@nestjs/config** (v4.0.0)
- Loads environment variables from .env files
- The `isGlobal: true` option is super useful - makes config available everywhere without importing it in every single module
- Keeps secrets out of the code which is critical for security
- Tried v3.3.0 first but it wasn't compatible with NestJS 11, had to upgrade to v4

**@nestjs/mongoose** (v11.0.2)  
- Connects Mongoose to NestJS's dependency injection system
- Gives us decorators like @Schema(), @Prop(), @InjectModel()
- Version 10 didn't work with NestJS 11, needed v11+
- Works hand-in-hand with the mongoose package

**mongoose** (v8.9.5)
- The actual MongoDB ODM (Object Data Modeling)
- Makes working with MongoDB way easier than raw queries
- Handles schema definitions, validation, connection pooling
- Pretty much the standard for Node.js + MongoDB

**class-validator** (v0.14.2)
- Automatic validation for incoming API requests
- Uses decorators like @IsEmail(), @IsString(), @Min(), @Max()
- Saves a ton of manual validation code
- Works with ValidationPipe in NestJS

---

**APP MODULE SETUP**

This is where we configure the core application. Two main things happening here:

```typescript
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: './.env'
})
```

This loads the .env file first. Order matters! It has to load before MongooseModule because that needs the environment variables.

```typescript
MongooseModule.forRoot(process.env.MONGO_URI as string)
```

This connects to MongoDB using the connection string from .env. The `as string` is a TypeScript thing - process.env values can technically be undefined, so we're asserting that MONGO_URI will definitely exist.

Got tripped up here initially because I was using MONGO_URL in the code but MONGO_URI in the .env file. Names have to match exactly or it won't work.

---

**MAIN.TS - APPLICATION BOOTSTRAP**

This is where the app actually starts up.

**ValidationPipe configuration:**
```typescript
app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
```

Two options here that are really important:

`whitelist: true` - Strips out any properties that aren't in your DTO. So if someone tries to send extra malicious data, it gets removed automatically. Security feature.

`transform: true` - Auto-converts types. If your DTO expects a number but someone sends a string like "25", it converts it to the number 25. Saves you from doing manual type conversion.

**Dynamic port:**
```typescript
const PORT = process.env.PORT || 5000;
```

Uses the PORT from .env (5000) but has a fallback. Important for cloud deployments because services like Heroku assign ports dynamically via environment variables.

---

**ENVIRONMENT VARIABLES**

Current .env setup:
```
PORT=5000
MONGO_URI=mongodb+srv://admin:admin_69@cluster0.kz8dxsx.mongodb.net/jewelhub
NODE_ENV=development
```

Breaking down the MongoDB connection string:
- `mongodb+srv://` - Protocol (srv = DNS seed list connection)
- `admin:admin_69` - Username and password
- `@cluster0.kz8dxsx.mongodb.net` - The cluster address
- `/jewelhub` - Database name (was missing this initially, needs to be there)

Never commit .env to git. Should be in .gitignore always.

---

**PROBLEMS WE RAN INTO**

1. **Version compatibility mess**
   - @nestjs/config v3.3.0 didn't work with NestJS 11
   - @nestjs/mongoose v10.1.0 also incompatible
   - Had to upgrade both to their v11-compatible versions
   - npm kept throwing ERESOLVE errors until versions matched

2. **Environment variable name mismatch**
   - Code was looking for MONGO_URL
   - .env file had MONGO_URI
   - Connection silently failed, took a minute to catch
   - Fixed by making them match - went with MONGO_URI

3. **Incomplete MongoDB connection string**
   - Was missing the database name at the end
   - Connection string ended at .mongodb.net/ with nothing after
   - Added /jewelhub to specify which database to use

---

**WHAT'S NEXT**

Need to build out the actual functionality:
- Create Mongoose schemas (probably User, Product/Jewelry items)
- Write services for business logic
- Build controllers to handle HTTP requests
- Make DTOs for validation

DTOs are going to use those class-validator decorators:
- @IsString() for string fields
- @IsEmail() for email validation  
- @IsNumber() for numbers
- @IsOptional() for optional fields
- @Min() / @Max() for number constraints

Schemas will use Mongoose decorators:
- @Schema() on the class
- @Prop() for each field
- Can specify types, required, defaults, etc.

---

**USEFUL COMMANDS**

Development:
- `npm run start:dev` - Hot reload, best for development
- `npm run build` - Compiles TypeScript to JavaScript
- `npm run start:prod` - Production mode

Code quality:
- `npm run lint` - ESLint checks
- `npm run format` - Prettier formatting
- `npm run test` - Unit tests
- `npm run test:e2e` - End-to-end tests

---

**KEY LEARNINGS**

**ES Modules:** When using "type": "module", imports need .js extensions even for TypeScript files. This is because Node.js sees the compiled output, not the source.

**Module order matters:** ConfigModule has to load before any module that uses environment variables. The imports array is processed in order.

**Security practices:**
- Environment variables for all secrets
- ValidationPipe whitelist to strip malicious data
- Never commit .env files
- Use type assertions for critical env vars

**NestJS architecture:**
- Modules organize related code
- Dependency injection handles creating instances
- Decorators provide metadata for the framework
- Everything is modular and reusable

**MongoDB connection:** Always include the database name in the connection string. Format is `protocol://credentials@host/database_name`

---

**RESOURCES**

Official documentation:
- docs.nestjs.com - Main NestJS docs
- mongoosejs.com/docs - Mongoose documentation
- github.com/typestack/class-validator - Validation decorators

Important NestJS concepts to understand:
- Dependency Injection (how services get into controllers)
- Decorators (metadata for the framework)
- Module system (organizing code)
- Pipes (validation, transformation)
- Guards (authentication, authorization)
- Interceptors (modifying requests/responses)

---

**ITERATION 2 - CONFIGURATION REFACTORING**

**New file created: database.config.ts**

Made a separate configuration file for database settings instead of having everything scattered. Created `src/config/database.config.ts`:

```typescript
export default () => ({
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/jeweller_management',
    port: (process.env.PORT || 5000, 10) as number,
});
```

This is cleaner because:
- All database config in one place
- Has fallback values if env variables are missing
- Easy to add more config options later
- Can be imported and reused anywhere

The fallback MongoDB URI points to localhost - useful for local development if you don't have a .env file set up.

**Updated app.module.ts - Better configuration pattern**

Switched to a more advanced pattern using ConfigService and async module initialization.

Changed ConfigModule setup:
```typescript
ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig],  // NEW - loads our config file
  envFilePath: './.env'
})
```

The `load: [databaseConfig]` tells ConfigModule to load our custom configuration file. This way we can access config values through ConfigService instead of directly using process.env everywhere.

**Switched to MongooseModule.forRootAsync()**

Changed from the simple `forRoot()` to `forRootAsync()`:

```typescript
MongooseModule.forRootAsync({
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('mongoURI'),
  }),
  inject: [ConfigService],
})
```

Why this is better:
- **Dependency injection** - ConfigService gets injected automatically
- **Async support** - Can handle async operations if needed (like fetching config from external sources)
- **Type safety** - `configService.get<string>('mongoURI')` is type-safe
- **Centralized config** - Everything goes through ConfigService instead of direct process.env access
- **Testability** - Way easier to mock configuration in tests

The factory pattern (`useFactory`) is a common NestJS pattern. It's a function that creates the configuration object when the module initializes.

`inject: [ConfigService]` tells NestJS to inject ConfigService into the factory function.

**What I learned:**

The difference between synchronous and asynchronous module initialization:
- `forRoot()` - Simple, direct configuration
- `forRootAsync()` - More flexible, supports dependency injection and async operations

Factory pattern is useful when you need to compute or fetch configuration dynamically rather than just passing static values.

ConfigService is more powerful than direct process.env access because:
- Type safety with generics
- Can validate config on startup
- Easier to test and mock
- Single source of truth for all config

**New file created: logger.middleware.ts**

Created a custom middleware for logging HTTP requests. Made `src/middleware/logger.middleware.ts`:

```typescript
import {Injectable, NestMiddleware} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`[${req.method}] ${req.originalUrl}`)
        next();
    }
}
```

Breaking down what this does:

**@Injectable()** - Makes this class available for dependency injection. NestJS can now inject this wherever it's needed.

**implements NestMiddleware** - This is an interface from NestJS that requires us to have a `use()` method. Ensures our middleware follows the correct pattern.

**use(req, res, next)** - Standard Express middleware signature:
- `req` - Incoming request object (has method, URL, headers, body, etc.)
- `res` - Response object (for sending responses)
- `next` - Function that passes control to the next middleware in the chain

**console.log(`[${req.method}] ${req.originalUrl}`)** - Logs every request that comes in. Shows the HTTP method (GET, POST, etc.) and the URL path. Super useful for debugging.

**next()** - CRITICAL - Must call this or the request will hang. It passes the request to the next middleware/controller.

**Applied middleware globally in app.module.ts**

Updated AppModule to use the middleware:

```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

New things here:

**implements NestModule** - This interface requires us to implement a `configure()` method. It's how NestJS knows we want to set up middleware.

**configure(consumer: MiddlewareConsumer)** - This method gets called when the module initializes. The `consumer` parameter is what we use to apply middleware.

**consumer.apply(LoggerMiddleware)** - Tells NestJS which middleware to use.

**.forRoutes('*')** - Applies the middleware to all routes. The `'*'` is a wildcard that matches everything.

Could also apply to specific routes:
- `.forRoutes('users')` - Only /users routes
- `.forRoutes('users', 'products')` - Multiple routes
- `.forRoutes({ path: 'users', method: RequestMethod.GET })` - Specific method on a route

**What I learned:**

Middleware runs in order before requests hit controllers. The flow is:
1. Request comes in
2. Middleware processes it (logging, authentication, etc.)
3. Calls next() to pass to the next middleware
4. Eventually reaches the controller
5. Controller sends response

Middleware is perfect for:
- Logging requests (what we did)
- Authentication checks
- Request validation
- Adding headers
- Rate limiting
- CORS handling

The difference between middleware and interceptors:
- **Middleware** runs before the route handler, has access to req/res
- **Interceptors** can run before AND after the route handler, can transform responses

If you forget to call `next()`, the request will hang and never reach the controller. The client will timeout waiting for a response.

**Updated imports in app.module.ts**

Added these imports:
```typescript
import { LoggerMiddleware } from './middleware/logger.middleware.js';
import {MiddlewareConsumer, NestModule} from '@nestjs/common';
```

Remember the .js extension because we're using ES modules - even though it's a .ts file, we import with .js because that's what it compiles to.

---

Last updated: October 24, 2025
