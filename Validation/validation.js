const schema = require("validate");

class Validation {

  constructor() {
    this.repository = schema({
      name: {
        type: "string",
        required: true,
        message: "Name of package is required"
      },
      url: {
        type: "string",
        required: true,
        message: "Url is required."
      },
      type: {
        type: "string",
        required: true,
        message: "Type is required."
      },
      commit: {
        type: "string",
        required: false,
        message: "Commit is required."
      },
      version: {
        type: "number",
        required: false,
        message: "Version is required."
      }
    }, {
      typecast: true
    })
  }

  validateRepository(repository) {
    let result = undefined;
    try {
      result = this.repository.validate(this.repository);
    } catch (error) {
      console.log(error);
      return false;
    }
    return result;
  }
}


module.exports.Validation = Validation