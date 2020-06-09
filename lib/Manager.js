// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(
        name,
        id,
        email,
        officeNumber,
    ) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        let role = "Manager"
        return role;
    }
    getOfficeNumber() {
        let officeNumber = this.officeNumber;
        return officeNumber;
    }
}

module.exports = Manager;