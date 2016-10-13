import { observable } from 'mobx';

class AppState {
  @observable user = { first_name: 'Alex', last_name: 'Marmon', phone: '0123456789' } ;

  fetchData(query) {
    fetch(query).then(response => response.json())
    .then((response) => {
      this.user = response;
    });
  }
}

export default AppState;
