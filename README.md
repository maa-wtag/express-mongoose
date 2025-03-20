# Create and use a local MongoDB database with Mongoose by following these steps:

1. Install Dependencies:

- MongoDB: Make sure you have MongoDB installed and running locally. If not, download it from mongodb.com.
- Node.js & npm: Ensure Node.js and npm are installed.
- Mongoose: In your project folder, initialize your project and install Mongoose: npm init -y
- npm install mongoose

2. Connect to Your Local MongoDB Instance:
   Create a file (e.g., index.js) and set up your connection:

```
const mongoose = require('mongoose');

// Replace 'mydatabase' with the desired database name.
// MongoDB creates the database once you add data to it.

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB locally!');
})
.catch((err) => {
  console.error('Connection error:', err);
});
```

3. Define a Schema and Model:
   Create a schema to define the structure of your documents and a model to interact with your collection:

```
// Define a simple User schema

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create a model for the 'users' collection

const User = mongoose.model('User', userSchema);
```

4. Insert Data (Auto-Creating the Database):
   MongoDB will create the database and collection on the fly when you insert a document. For example:

```
// Create a new user document

const newUser = new User({
  name: 'Alice',
  email: 'alice@example.com'
});

// Save the document to the database

newUser.save()
  .then(doc => {
    console.log('User saved:', doc);
  })
  .catch(err => {
    console.error('Error saving user:', err);
  });
```

5. Run Your Application:
   Execute your script with Node.js:
   ``node index.js``
   When you run this, Mongoose connects to your local MongoDB instance at ``mongodb://localhost:27017/mydatabase``. If ``mydatabase`` doesn't already exist, MongoDB will create it once you insert the first document.
   This setup gives a simple, working local database using Mongoose. You can expand your application by defining more schemas, creating additional models, and performing various CRUD operations as needed.

# Run mongoose in mac locally

Running Mongoose locally on your Mac involves setting up both MongoDB and Node.js environment. Here’s a step-by-step guide tailored for system:

1. Install Node.js:
   Make sure you have Node.js installed. You can download it from nodejs.org or install via Homebrew:
   ``brew install node``

2. Install MongoDB Locally:
   MongoDB now supports Apple Silicon natively. You can install the MongoDB Community Edition using Homebrew:
3. Tap the MongoDB Brew Repository: ``brew tap mongodb/brew``

4. Install MongoDB Community Edition:``brew install mongodb-community``

5. Start MongoDB as a Service:``brew services start mongodb-community``

6. This command will start MongoDB automatically whenever your Mac boots up. If you prefer to run it manually, you can start it with:``mongod --config /usr/local/etc/mongod.conf``

7. Set Up Your Node.js Project with Mongoose

8. Initialize Your Project: Navigate to your project directory and initialize it:``mkdir my-mongoose-app``
``cd my-mongoose-app``
``npm init -y``

9. Install Mongoose:``npm install mongoose``

10. Create a Simple Connection File: Create a file named ``index.js`` and add the following code:

```const mongoose = require('mongoose');

// Connect to the local MongoDB instance.
// The database "mydatabase" will be created automatically when you add data.

mongoose.connect('mongodb://localhost:27017/mydatabase', {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log('Connected to MongoDB locally on your M1 Mac!');
})
.catch((err) => {
console.error('Connection error:', err);
});

// Define a simple schema and model

const userSchema = new mongoose.Schema({
name: String,
email: String,
});

const User = mongoose.model('User', userSchema);

// Example: Create and save a new user

const newUser = new User({ name: 'Alice', email: 'alice@example.com' });

newUser.save()
.then(doc => console.log('User saved:', doc))
.catch(err => console.error('Error saving user:', err));
```
11. Run Your Application: In your terminal, run: ``node index.js``
12. If everything is set up correctly, you should see a message confirming that you’re connected to MongoDB, and your sample user will be saved to the database.

# Troubleshooting & Alternatives

- Docker Option: If you encounter issues running MongoDB natively on your Mac, consider using Docker. Docker supports ARM images, and you can pull an official MongoDB image that supports Mac: ``docker pull mongo``
``docker run --name mongodb -p 27017:27017 -d mongo``
- Then, connect to ``mongodb://localhost:27017`` in your Mongoose configuration.
- Mongoose and MongoDB Compatibility: Mongoose is just a Node.js library that helps manage MongoDB connections and schemas. It doesn’t depend on the hardware directly—just ensure your MongoDB server is running and accessible.

### Troubleshootings

``mongod --config /usr/local/etc/mongod.conf`` Error opening config file ``'/usr/local/etc/mongod.conf'``: No such file or directory try 'mongod --help' for more information

This error indicates that MongoDB can't find the configuration file at the specified path. On an Apple Silicon Mac, if you've installed MongoDB via Homebrew, the default installation paths are different than on Intel Macs. Here are some steps to resolve the issue:

1. Check the Correct Path
   Homebrew on Mac typically installs files under ``/opt/homebrew`` rather than ``/usr/local``. You can verify if the configuration file exists at:
   ``ls /opt/homebrew/etc/mongod.conf``
   If it exists there, you can start MongoDB using:
   ``mongod --config /opt/homebrew/etc/mongod.conf``
2. Use Homebrew Services
   If you installed MongoDB using Homebrew, you can also start it as a service which automatically uses the correct configuration file:
   ``brew services start mongodb-community``
   This method abstracts away the need to specify the config file manually.
3. Create a Custom Configuration File
   If you don’t have a configuration file, you can create one manually. For example, create a file at ``/opt/homebrew/etc/mongod.conf`` with the following content:

#### mongod.conf

```
storage:
dbPath: /opt/homebrew/var/mongodb
systemLog:
destination: file
path: /opt/homebrew/var/log/mongodb/mongo.log
logAppend: true
net:
bindIp: 127.0.0.1
port: 27017
```
After creating the file, start MongoDB with:
``mongod --config /opt/homebrew/etc/mongod.conf``

4. Verify Installation and Paths
If you're still encountering issues, ensure that your MongoDB installation via Homebrew is complete:

- Reinstall MongoDB (if needed): ``brew tap mongodb/brew``
``brew install mongodb-community``
- Check for Installation Directories: Sometimes, paths can vary. You can use: ``find /opt/homebrew -name mongod.conf``
- to locate the configuration file.
  Following these steps should resolve the error and allow you to run MongoDB locally on your Mac.
