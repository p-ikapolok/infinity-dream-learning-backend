import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Instead of pool.connect(), use a simple query to test the connection
export const connectDB = async (): Promise<void> => {
  try {
    await pool.query("SELECT 1"); // safer for deployment
    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default pool;