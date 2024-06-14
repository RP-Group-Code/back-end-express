const db = require("../database/db");
const { v4: uuidv4 } = require("uuid");

const barang = {
  
  index: (callback) => {
    db("barang")
      .select("*")
      .orderBy("lastmodified", "desc")
      .then((rows) => callback(null, rows))
      .catch((err) => callback(err));
  },
  
  store: async (data, callback) => {
    try {
      const result = await db("barangs").insert(data);
      return callback(null, result);
    } catch (err) {
      return callback(err);
    }
  },

  update: async (uuid, data, callback) => {
    db("barangs")
      .where("uuid", uuid)
      .first()
      .update(data)
      .then((result) => callback(null, result))
      .catch((err) => callback(err));
  },

  show: (uuid, callback) => {
    db("barangs")
      .where("uuid", uuid)
      .select("*").first()
      .then((result) => callback(null, result))
      .catch((err) => callback(err));
  },

  destroy: (uuid, callback) => {
    db("barangs")
      .where("uuid", uuid)
      .delete()
      .then((rows) => callback(null, rows))
      .catch((err) => callback(err));
  },
};
module.exports = barang;
