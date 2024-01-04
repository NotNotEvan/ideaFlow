import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  console.log('🔴 No database URL');
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
console.log('🔌 Connected to database');

const db = drizzle(client, { schema });

// TODO: import pooling from drizzle-orm/postgres-js/pooling and get connection string from supabase-settings-database-connection pooling
const migrateDb = async () => {
  try {
    console.log('🚀 Migrating database');
    await migrate(db, { migrationsFolder: 'migrations' });
    console.log('✅ Database migrated');
  } catch (error) {
    console.log('❌ Error migrating database:', error);
  }
};

migrateDb();

export default db;