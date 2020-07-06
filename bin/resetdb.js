// load .env data into process.env
require('dotenv').config();

// other dependencies
import { readdirSync, readFileSync } from 'fs';
import { cyan, green, red } from 'chalk';
import Client from 'pg-native';

// PG connection setup
const connectionString = process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = function() {
  console.log(cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = readdirSync('./db/schema');

  for (const fn of schemaFilenames) {
    const sql = readFileSync(`./db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${green(fn)}`);
    client.querySync(sql);
  }
};

const runSeedFiles = function() {
  console.log(cyan(`-> Loading Seeds ...`));
  const schemaFilenames = readdirSync('./db/seeds');

  for (const fn of schemaFilenames) {
    const sql = readFileSync(`./db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${green(fn)}`);
    client.querySync(sql);
  }
};

try {
  console.log(`-> Connecting to PG using ${connectionString} ...`);
  client.connectSync(connectionString);
  runSchemaFiles();
  runSeedFiles();
  client.end();
} catch (err) {
  console.error(red(`Failed due to error: ${err}`));
  client.end();
}