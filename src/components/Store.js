import {observable  , action , decorate} from "mobx"

class Store {

   User =  {};
   isLoggedIn = false;
  
    setUser(user){
       this.User = user
       this.isLoggedIn = true;
    }

    unsetUser(){

        this.User = {};
        this.isLoggedIn = false;
    }
}

decorate(Store,{

     User : observable,
     isLoggedIn : observable,
     setUser : action
})

const store = new Store()

export default store