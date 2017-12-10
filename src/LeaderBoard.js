import React, { Component } from 'react';
import './LeaderBoard.css';

const alltimeReq = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
const recentReq = "https://fcctop100.herokuapp.com/api/fccusers/top/recent"

class BoardBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.fetchRequest(alltimeReq);
  }

  fetchRequest = (url) => {
    fetch(url).then(res => {
      if (res.ok) return res.json();
      console.warn("fetch failure", res);
    }).then(json => {
      this.setState({ items: json });
    }).catch(ex => {
      console.warn("fetch exception", ex);
    });
  }

  render() {
    return (
      <table>
        <caption>freeCodeCamp campers with the most brownie points</caption>
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Username</th>
            <th scope="col">
              <AnchorButton
                onClick={() => this.fetchRequest(recentReq)}
                href="#recent"
                text="Last 30 days"
              />
            </th>
            <th scope="col">
              <AnchorButton
                onClick={() => this.fetchRequest(alltimeReq)}
                href="#alltime"
                text="All-time"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map((e, i) =>
            <BoardItem {...e} pos={i + 1} key={i} />)}
        </tbody>
      </table>
    );
  }
}

export default BoardBody;

const BoardItem = ({ pos, username, img, alltime, recent }) => (
  <tr>
    <td>{pos}</td>
    <td className="Item-username">
      <a href={"https://freecodecamp.org/".concat(username)}
        target="_blank">
        <img src={img} width={20} height={20} alt=""/>
        {username}
      </a>
    </td>
    <td>{recent}</td>
    <td>{alltime}</td>
  </tr>
);

const AnchorButton = ({ onClick, href, text }) => (
  <a href={href} onClick={onClick}>
    {text}
  </a>
);
