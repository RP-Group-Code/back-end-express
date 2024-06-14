const barang = require("../models/Barang");
const { v4: uuidv4 } = require("uuid");
const db = require("../database/db");

const barangController = {
  index: (req, res) => {
    barang.index((err, result) => {
      if (err) {
        console.log("Error fetching data", err);
        res.status(500).send("Error fetching data");
      } else {
        const response = {
          message: "Get All Data Success",
          status: 200,
          data: {
            barang: result,
          },
          foot: {
            total_data: result.length,
            response_time: process.hrtime()[1] / 1000000, // response time in milliseconds
            timestamp_now: new Date(),
          },
        };
        res.status(200).json(response);
      }
    });
  },

  store: (req, res) => {
    const data = {
      uuid: uuidv4(),
      user_id: 2,
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    };
    try {
      barang.store(data, (err, result) => {
        const response = {
          message: "Created Data Successfully",
          status: 201,
          data: {
            name: req.body.name,
            vendor: req.body.vendor_id,
          },
          foot: {
            total_data: result.length,
            response_time: process.hrtime()[1] / 1000000, // response time in milliseconds
            timestamp_now: new Date(),
          },
        };
        res.status(201).json(response);
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  show: (req, res) => {
    const { uuid } = req.params;
    try {
      barang.show(uuid, (err, result) => {
        if (err) {
          console.log("Error fetching data", err);
          res.status(500).send("Error fetching data");
        } else {
          
          const response = {
            message: "Get Byid Data Successfully",
            status: 200,
            data: {
              barang: result,
            },
            foot: {
              total_data: result.length || 0,
              response_time: process.hrtime()[1] / 1000000, // response time in milliseconds
              timestamp_now: new Date(),
            },
          };
          res.status(200).json(response);
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: (req, res) => {
    const { uuid } = req.params;
    const data = {
      ...req.body,
      updated_at: new Date(),
    };
    const updatedData = req.body;
    const detectChanges = (original, updated) => {
      const changes = {};
      for (let key in updated) {
        if (updated.hasOwnProperty(key) && original[key] !== updated[key]) {
          changes[key] = updated[key];
        }
      }
      return changes;
    };

    const originalData = db("barangs").where("uuid", uuid).select("*").first();
    if (!originalData) {
      console.log("Barang not found");
    } else {
      console.log("Get data byid Updated : " +originalData);
    }
    const changedData = detectChanges(originalData, updatedData);

    try {
      barang.update(uuid, data, (err, result) => {
        const response = {
          message: "Updated Data Successfully",
          status: 200,
          data: {
            uuid: uuid,
            changed_data: changedData,
          },
          foot: {
            response_time: process.hrtime()[1] / 1000000, // response time in milliseconds
            timestamp_now: new Date(),
          },
        };
        res.status(200).json(response);
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  destroy: (req, res) => {
    const uuid = req.params.uuid;
    try {
      // const find_deleted = barang.show(uuid);
      // if (!find_deleted) {
      //   return res.status(404).json({
      //     message: "Barang not found",
      //     status: 404,
      //   });
      // }
      barang.destroy(uuid, (err, result) => {
        const response = {
          message: "Deleted Data ById Success",
          status: 200,
          foot: {
            total_data: result.length,
            response_time: process.hrtime()[1] / 1000000, // response time in milliseconds
            timestamp_now: new Date(),
          },
        };
        res.status(200).json(response);
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
};
module.exports = barangController;
