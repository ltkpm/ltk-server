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
        match: /^(npm|pip)$/,
        message: "Type is required."
      },
      commit: {
        type: "string",
        required: false,
      },
      version: {
        type: "number",
        required: true,
        message: "Version is required."
      }
    }, {
      typecast: true
    })
  }

  validateRepository(repository) {
    let result = undefined;
    try {
       result = this.isValid(this.repository.validate(repository))
    } catch (error) {
      console.log(error);
      return false;
    }
    return result;
  }

  isValid(object) {
    let tmp_res = false
    if (object && object.length === 0) tmp_res = true
    return tmp_res 
  }
}




module.exports.Validation = Validation