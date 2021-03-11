module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://Metta@localhost/daily_gratitude",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://Metta@localhost/daily_gratitude_test",
  JWT_SECRET: process.env.JWT_SECRET || "daily-gratitude-jwt",
};
