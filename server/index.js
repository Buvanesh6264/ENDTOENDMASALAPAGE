const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = 5000;
const uri = "mongodb://localhost:27017";
const dbName = "abhirradb";
const collectionNameforuser = "users";
const collectionNameforrecipes = "recipes";
const collectionNameforproducts = "products";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

app.use(express.json());
app.use(require("cors")());

function generateAccessToken(userName) {
    return jwt.sign({ userName }, JWT_SECRET, { expiresIn: "1h" });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized: No token provided" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden: Invalid token" });

        req.user = user;
        next();
    });
}

app.get("/", (req, res) => {
    res.status(200).send("hello");
});

app.post("/login", async (req, res) => {
    const { phone, password } = req.body;
    const client = new MongoClient(uri);

    if (!phone || !password) {
        return res.status(400).json({ error: "Phone and password are required" });
    }

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionNameforuser);
        const user_exists = await collection.findOne({ phone });
        console.log(user_exists)
        if (!user_exists) {
            return res.status(401).json({ error: "User not found" });
        }

        // const isPasswordValid = await bcrypt.compare(password, user_exists.password);
        if (user_exists.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid Password" });
        }

        const token = generateAccessToken(user_exists.phone);
        res.status(200).json({ "token" : token });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await client.close();
    }
});

app.post("/signup", async (req, res) => {
    const { username, phone, password } = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionNameforuser);
        const existingUser = await collection.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: "Phone number already registered. Please log in." });
        }
        await collection.insertOne({
            username,
            phone,
            password
        });
        res.status(201).json({ message: "Signup successful! Redirecting to login..." });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        await client.close();
    }
});

app.get("/getproducts", async (req, res) => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameforproducts);
  
      const { category, page = 1, limit = 8 } = req.query;
      const query = category && category !== "All" ? { category } : {};
      const options = {
        skip: (parseInt(page) - 1) * parseInt(limit),
        limit: parseInt(limit),
      };
  
      const products = await collection.find(query).skip(options.skip).limit(options.limit).toArray();
      const totalProducts = await collection.countDocuments(query);
      const totalPages = Math.ceil(totalProducts / parseInt(limit));
  
      res.status(200).json({ products, totalPages });
    } catch (error) {
      res.status(400).json({ error: "Error fetching data" });
    } finally {
      await client.close();
    }
  });
  
  app.get("/getcategories", async (req, res) => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameforproducts);
      
      const categories = await collection.distinct("category");
      res.status(200).json({ categories: ["All", ...categories] });
    } catch (error) {
      res.status(400).json({ error: "Error fetching categories" });
    } finally {
      await client.close();
    }
  });
 
app.get("/getrecipes", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforrecipes);

    const { page = 1, limit = 5 } = req.query;
    const options = {
      skip: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
    };

    const recipes = await collection.find({}).skip(options.skip).limit(options.limit).toArray();
    const totalRecipes = await collection.countDocuments({});
    const totalPages = Math.ceil(totalRecipes / parseInt(limit));

    res.status(200).json({ recipes, totalPages });
  } catch (error) {
    res.status(400).json({ error: "Error fetching recipes" });
  } finally {
    await client.close();
  }
});

app.get("/getvegrecipes", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforrecipes);

    const { page = 1, limit = 5 } = req.query;
    const query = { type: "Veg" };
    const options = {
      skip: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
    };

    const recipes = await collection.find(query).skip(options.skip).limit(options.limit).toArray();
    const totalRecipes = await collection.countDocuments(query);
    const totalPages = Math.ceil(totalRecipes / parseInt(limit));

    res.status(200).json({ recipes, totalPages });
  } catch (error) {
    res.status(400).json({ error: "Error fetching Veg recipes" });
  } finally {
    await client.close();
  }
});

app.get("/getnonvegrecipes", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforrecipes);

    const { page = 1, limit = 5 } = req.query;
    const query = { type: "Non-Veg" };
    const options = {
      skip: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
    };

    const recipes = await collection.find(query).skip(options.skip).limit(options.limit).toArray();
    const totalRecipes = await collection.countDocuments(query);
    const totalPages = Math.ceil(totalRecipes / parseInt(limit));

    res.status(200).json({ recipes, totalPages });
  } catch (error) {
    res.status(400).json({ error: "Error fetching Non-Veg recipes" });
  } finally {
    await client.close();
  }
});

app.post("/addrecipe", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforrecipes);

    await collection.insertOne(req.body);
    res.status(201).json({ message: "Recipe added successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Error adding recipe" });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
