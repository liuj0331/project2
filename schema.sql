DROP TABLE IF EXISTS memory;

CREATE TABLE memory(
  id SERIAL PRIMARY KEY,
  userName TEXT,
  phone_Number TEXT,
  email TEXT,
  campus TEXT,
  itemName Text,
  itemInfo TEXT,
  is_deleted INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
