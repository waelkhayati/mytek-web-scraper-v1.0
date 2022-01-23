const axios = require("axios");
const cheerio = require("cheerio")
const {response} = require("express");


exports.allAccess = async (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
