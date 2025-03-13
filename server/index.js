const express = require("express");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = 5000;
const uri = "mongodb://localhost:27017";
const dbName = "abhirradb";
const collectionNameforuser = "users";
const collectionNameforrecipes = "recipes";
const collectionNameforshop = "shopdata";
const collectionNameforproducts = "products";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

app.use(express.json());
app.use(require("cors")());

function generateAccessToken(phone) {
  return jwt.sign({ phone }, JWT_SECRET, { expiresIn: "1h" });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized: No token provided" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden: Invalid token" });
        console.log("Decoded JWT Payload:", user); 
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

app.get("/homepagerecipes", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforrecipes);

    const recipes = await collection.find({}).limit(1).toArray();
    res.status(200).json({ recipes });
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

// app.post("/addrecipe", async (req, res) => {
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionNameforrecipes);

//     await collection.insertOne(req.body);
//     res.status(201).json({ message: "Recipe added successfully!" });
//   } catch (error) {
//     res.status(400).json({ error: "Error adding recipe" });
//   } finally {
//     await client.close();
//   }
// });

app.get("/getshopproducts", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionNameforshop);

    let { page = 1, limit = 10, sizes, availability } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};
    if (sizes) {
      const sizeArray = sizes.split(",");
      filter["weights.size"] = { $in: sizeArray };
    }
    if (availability) {
      const availabilityArray = availability.split(",");
      if (availabilityArray.includes("inStock") && availabilityArray.includes("outOfStock")) {
      } else if (availabilityArray.includes("inStock")) {
        filter.inStock = true;
      } else if (availabilityArray.includes("outOfStock")) {
        filter.inStock = false;
      }
    }
    const totalProducts = await collection.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await collection
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    res.status(200).json({ products, totalPages, currentPage: page });
  } catch (error) {
    res.status(400).json({ error: "Error fetching data" });
  } finally {
    await client.close();
  }
});

app.post("/addtocart", authenticateToken, async (req, res) => {
  const { productId, name, size, price } = req.body;
  const phone = req.user.phone; 

  if (!productId || !size || !price) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  const client = new MongoClient(uri);
  try {
      await client.connect();
      const db = client.db(dbName);
      const usersCollection = db.collection(collectionNameforuser);

      const user = await usersCollection.findOne({ phone });

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      const existingProduct = user.cart?.find(item => item.productId === productId && item.size === size);

      if (existingProduct) {
          await usersCollection.updateOne(
              { phone, "cart.productId": productId, "cart.size": size },
              { $inc: { "cart.$.quantity": 1 } }
          );
      } else {
          await usersCollection.updateOne(
              { phone },
              { $push: { cart: { productId, name, size, price, quantity: 1 } } },
              { upsert: true }
          );
      }

      res.status(200).json({ message: "Added to cart successfully" });
  } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Failed to add to cart" });
  } finally {
      await client.close();
  }
});

app.get("/getuser", authenticateToken, async (req, res) => {
  const client = new MongoClient(uri);
  try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameforuser);

      console.log("Extracted Phone from Token:", req.user.phone); 

      const user = await collection.findOne({ phone: req.user.phone });

      console.log("MongoDB User Data:", user); 

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ 
          name: user.name,
          phone: user.phone,
          cart: user.cart || [] 
      });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
  } finally {
      await client.close();
  }
});

app.post("/update-cart", authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const phone = req.user.phone;

  const client = new MongoClient(uri);
  try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameforuser);

      const user = await collection.findOne({ phone });
      if (!user) return res.status(404).json({ error: "User not found" });

      let updatedCart = user.cart.map(item => 
          item.productId === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0);

      await collection.updateOne({ phone }, { $set: { cart: updatedCart } });

      res.json({ message: "Cart updated successfully", cart: updatedCart });
  } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Internal server error" });
  } finally {
      await client.close();
  }
});

app.post("/remove-from-cart", authenticateToken, async (req, res) => {
  const { productId } = req.body;
  const phone = req.user.phone;

  const client = new MongoClient(uri);
  try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameforuser);

      const user = await collection.findOne({ phone });
      if (!user) return res.status(404).json({ error: "User not found" });

      const updatedCart = user.cart.filter(item => item.productId !== productId);

      await collection.updateOne({ phone }, { $set: { cart: updatedCart } });

      res.json({ message: "Product removed from cart", cart: updatedCart });
  } catch (error) {
      console.error("Error removing product:", error);
      res.status(500).json({ error: "Internal server error" });
  } finally {
      await client.close();
  }
});

app.post("/clear-cart", authenticateToken, async (req, res) => {
  const phone = req.user.phone;

  const client = new MongoClient(uri);
  try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionNameforuser);

      await collection.updateOne({ phone }, { $set: { cart: [] } });

      res.json({ message: "Cart cleared successfully", cart: [] });
  } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Internal server error" });
  } finally {
      await client.close();
  }
});

app.post("/place-order", authenticateToken, async (req, res) => {
  const client = new MongoClient(uri);
  try {
      await client.connect();
      const db = client.db(dbName);
      const ordersCollection = db.collection("orders");
      const usersCollection = db.collection(collectionNameforuser);

      const { phone } = req.user;
      const { address } = req.body;

      const user = await usersCollection.findOne({ phone });

      if (!user || user.cart.length === 0) {
          return res.status(400).json({ error: "Cart is empty" });
      }
      const order = {
          phone,
          name: user.name,
          address,
          items: user.cart,
          totalAmount: user.cart.reduce((total, item) => total + item.price * item.quantity, 0),
          status: "Order Placed",
          createdAt: new Date(),
      };
      await ordersCollection.insertOne(order);
      await usersCollection.updateOne(
          { phone },
          { $set: { cart: [] } }
      );

      res.json({ message: "Order placed successfully", order });
  } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ error: "Internal server error" });
  } finally {
      await client.close();
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
