import { observable, computed, action, reaction, toJS } from 'mobx'

class AppState {
  @observable user = {
    first_name: 'Alex',
    last_name: 'Marmon',
    phone: '0123456789'
  };

  constructor() {
    reaction(
      () => Object.keys(this.user).map(el => this.user[el].length),
      // () => console.log(toJS(this.user)), { delay: 100 } // toJS is needed often
      () => console.log(this.user), { delay: 100 }
    )
  }

  @action fetchData(query) { // actions modify observables
    fetch(query).then(r => r.json())
      .then((response) => {
        this.user = response
      })
  }

  @computed get fullName() { // why computed ? https://github.com/mobxjs/mobx/issues/161
    return `${this.user.first_name} ${this.user.last_name}`
  }
}

export default new AppState()
