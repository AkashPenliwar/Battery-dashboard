const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema({
  batteryId: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  soc: Number,
  soh: Number,
  battery_voltage: Number,
  current: Number,
  battery_temp: Number,
  charge_cycle: Number,
});

module.exports = mongoose.model("Telemetry", telemetrySchema);