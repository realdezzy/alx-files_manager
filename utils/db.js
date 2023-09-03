const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';

    this.url = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
  }

  async isAlive() {
    try {
      await this.client.connect();
      return true;
    } catch (err) {
      return false;
    } finally {
      this.client.close();
    }
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const usersCollection = this.client.db().collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (err) {
      throw err;
    } finally {
      this.client.close();
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const filesCollection = this.client.db().collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (err) {
      throw err;
    } finally {
      this.client.close();
    }
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
