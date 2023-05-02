import { observable, action, decorate } from "mobx";

class Store {
  User = {};
  isLoggedIn = false;
  loading = true;

  setUser(user) {
    this.User = user;
    this.isLoggedIn = true;
    this.loading = false;
  }

  unsetUser() {
    this.User = {};
    this.isLoggedIn = false;
    this.loading = false;
  }
}

decorate(Store, {
  User: observable,
  isLoggedIn: observable,
  loading: observable,
  setUser: action,
});

const store = new Store();

export default store;
