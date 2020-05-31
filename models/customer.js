const mongoose = require("mongoose");
const Joi = require("joi");
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: Boolean,
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
    },
  })
);

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(3).max(150).required(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
