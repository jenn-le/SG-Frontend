import React, { Component } from "react";
import axios from "axios";

class TeamStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: []
    };
  }

  componentDidMount() {
    axios.get("http://54.147.204.57:5000/names").then(res => {
      this.setState({ names: res.data });
    });
  }

  teamsLeague = event => {
    if (event.target.value === "Men's Basketball")
      this.setState({league: "MBB"}, () => {this.setLeague(); });
    else
      this.setState({league: "WBB"}, () => {this.setLeague(); });   
  };

  setLeague = () => {
      console.log(this.state.league);
      if (this.state.league === "MBB"){
        axios.get("http://54.147.204.57:5000/MBB").then(res => {
          this.setState({ names: res.data }); 
          this.setState({ stats: null}, () => {this.resetSelection(); });     
        });
      } else {
        axios.get("http://54.147.204.57:5000/WBB").then(res => {
          this.setState({ names: res.data });
          this.setState({ stats: null}, () => {this.resetSelection(); });      
        });
      }
        
  };

  resetSelection = () => {
    document.getElementById("team").value = "first";
  }

  teamSelected = event => {
    console.log("Team selected: " + event.target.value);
    this.setState({ team: event.target.value }, () => {
      this.updateDisplay();
    });
  };

  updateDisplay = () => {
    console.log(this.state.league);
    axios.get("http://54.147.204.57:5000/team/"+ this.state.league + "/" + this.state.team).then(res => {
      this.setState({ stats: res.data });
      console.log(this.state.stats);
    });
  };

  render() {
    return (
      <div>
        <h2>Team Stats</h2>
        <form style={{ width: "250px" }}>
         <div className="form-group" style = {{width: "250px"}}>
            <label htmlFor="team" />
            <select
              className="form-control"
              id="league"
              onChange={this.teamsLeague}
            >
              <option selected="true" disabled="disabled" >Select Men or Women</option>
              <option>Men's Basketball</option>
              <option>Women's Basketball</option>
            </select>
          </div>

          {this.state ? (
              this.state.league ? (
                <div className="form-group">
                  <label htmlFor="team" />
                  <select
                    className="form-control"
                    id="team"
                    onChange={this.teamSelected}
                  >
                    <option selected="true" disabled="disabled" value="first">Select a Team</option>/>
                    {this.state
                      ? this.state.names.map(function(name) {
                          return (
                            <option key={name.team} value={name.team}>
                              {name.team}
                            </option>
                          );
                        })
                      : null}
                  </select>
              </div>
              ) : null
          ) : null}
          
        </form>

        {this.state ? (
          this.state.stats ? (
            <div>
              <p>Team: {this.state.stats.team}</p>
              <p> Division: {this.state.stats.division} </p>
              <p>League:{" "}
                {this.state.stats.league}
              </p>
              <p>ORebs: {this.state.stats.ORebs}</p>
              <p>DRebs: {this.state.stats.DRebs}</p>
              <p>FG3: {this.state.stats.FG3}</p>
              <p>FTA: {this.state.stats.FTA}</p>
              <p>FGA: {this.state.stats.FGA}</p>
              <p>TO: {this.state.stats.TO}</p>
              <p>FT: {this.state.stats.FT}</p>
              <p>WL: {this.state.stats.WL}</p>
              <p>FGM: {this.state.stats.FGM}</p>
            </div>
          ) : null
        ) : null}
      </div>
    );
  }
}

export default TeamStats;