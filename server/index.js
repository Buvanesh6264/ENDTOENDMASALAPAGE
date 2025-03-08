const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const Joi = require('joi');
const app = express();
const uri = "mongodb://localhost:27017";
const dbName = "animeprojectdb";
const collectionNameforanime = "animedata";
const collectionNameforuser = "users";
const collectionNameformovie = "animemovies";

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
