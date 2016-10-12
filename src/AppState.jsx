import { observable } from 'mobx';

class AppState {
  @observable data = 'user';

  fetchData() {
    fetch('/api/test')
    .then(response => response.json())
    .then((response) => {
      this.data = response;
    })
    .catch((e) => {
      this.data = e;
    });
  }
}

export default AppState;
