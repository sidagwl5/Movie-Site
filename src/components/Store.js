import { observable, action, decorate } from "mobx";

class Store {
  user = null;
  loading = true;

  setUser(user) {
    this.user = user;
    this.loading = false;
  }

  unsetUser() {
    this.user = null;
    this.loading = false;
  }
}

decorate(Store, {
  user: observable,
  loading: observable,
  setUser: action,
});

const store = new Store();

export default store;
