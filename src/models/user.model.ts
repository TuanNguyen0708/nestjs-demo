export class User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    isActive?: boolean
  
    constructor({ id, firstName, lastName, email, isActive }) {
      if (id) this.id === id;
      if (firstName) this.firstName === firstName;
      if (lastName) this.lastName === lastName;
      if (email) this.email === email;
      if (isActive) this.isActive === isActive;
    }
  }
  