import classes from './watches.module.css'
import React from 'react';
import WatchItem from "./watch-item.jsx";
import uniqid from 'uniqid';

class Watches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watches: [],
      location: '',
      timeZone: 0,
    };
  }

  addWatch = (e) => {
    e.preventDefault();

    this.setState({
      watches: [...this.state.watches, {
        id: uniqid(),
        location: this.state.location,
        timeZone: this.state.timeZone,
      }]
    });

    this.setState({
      location: '',
      timeZone: 0,
    })
  }

  deleteWatch = (id) => {
    this.setState(
      {
        watches: [
          ...this.state.watches.filter(el => el.id !== id)
        ]}
    )
  }

  inputChange = (e) => {
    e.preventDefault();
    const {name, value } = e.target;

    this.setState({
        [name]: value,
      }
    );
  }

  render() {
    return (
      <div className={classes["watchesContainer"]}>
        <form className={classes["watchForm"]} onSubmit={this.addWatch}>
          <label>
            Название
            <input type="text" name="location" value={this.state.location} onChange={this.inputChange} required/>
          </label>
          <label>
            Временная зона
            <input type="number" step="1" max="12" min="-12" name="timeZone" value={this.state.timeZone} onChange={this.inputChange} required/>
          </label>
          <button type="submit">Добавить</button>
        </form>
        <ul className={classes["watchItems"]}>
          {this.state.watches.map(item =>
            <WatchItem
                key={item.id}
                id={item.id}
                location={item.location}
                timeZone={item.timeZone}
                actions={{deleteWatch: this.deleteWatch}}
            />)}
        </ul>
      </div>
    );
  }
}

export default Watches;
