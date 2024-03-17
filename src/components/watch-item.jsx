import classes from './watches.module.css'
import React from 'react';

class WatchItem extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.id;
    this.location = props.location;
    this.timeZone = props.timeZone;
    this.actions = props.actions;

    this.timerID = undefined;

    this.state = {
      time: this.getLocalDateTime(),
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  tick() {
    this.setState({
      time: this.getLocalDateTime(),
    })
  }

  getLocalDateTime() {
    let date = new Date();
    let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    date = new Date(utc + this.timeZone * 60 * 60 * 1000);

    return date;
  }

  deleteWatch = () => {
    this.actions.deleteWatch(this.id);
  }

  getHours() {
    const deg = this.state.time.getHours() * 360 / 12;
    return `rotate(${deg}deg)`;
  }

  getMinutes() {
    const deg = this.state.time.getMinutes() * 360 / 60;
    return `rotate(${deg}deg)`;
  }

  getSeconds() {
    const deg = this.state.time.getSeconds() * 360 / 60;
    return `rotate(${deg}deg)`;
  }

  render() {
    return (
      <li className={classes["watchContainer"]}>
        <button type="button" className={classes["watchContainerDeleteButton"]} onClick={this.deleteWatch}>&#x00d7;</button>
        <span className={classes["watchLabel"]}>{this.location}</span>
        <div className={classes["watch"]}>
          <span className={classes["hourHand"]} style={{transform: this.getHours()}}></span>
          <span className={classes["minuteHand"]} style={{transform: this.getMinutes()}}></span>
          <span className={classes["secondHand"]} style={{transform: this.getSeconds()}}></span>
        </div>
      </li>
    );
  }
}

export default WatchItem;
