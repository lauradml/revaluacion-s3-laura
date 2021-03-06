import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import RepoDetail from'./components/RepoDetail';
import {Switch, Route} from 'react-router-dom';


const url='https://api.github.com/orgs/Adalab/repos';

class App extends Component {
  constructor(props) {
  super(props);

    this.filterName = this.filterName.bind(this);
    this.filterLanguage = this.filterLanguage.bind(this);

  this.state = {
    repos: [],
    name:'',
    description:'',
    language:''
  }
}
filterName(e) {
    const resultado = e.currentTarget.value.toLowerCase();
    this.setState({
      name: resultado
    });
  }

  filterLanguage(e) {
  const resultado = e.currentTarget.value;
  this.setState({
    language: resultado
  });
}

componentDidMount() {
this.getRepos();
}
getRepos() {
fetch(url)
  .then(response => response.json())
  .then(data => {
    this.setState({
    repos: data
    });
  });
}
  render() {
    return (

      <div className="App">
         <Switch>
            <Route exact path="/" render={ () =><Home
              repos={this.state.repos}
              name={this.state.name}
              description={this.state.description}
              language={this.state.language}
              filterName={this.filterName}
              filterLanguage={this.filterLanguage}
            />} />
            <Route path="/repoDetail/:id" render={(props) =>
               <RepoDetail
                match={props.match}
                repos={this.state.repos}
                repo={this.state.repos[props.match.id]}
              />} />
          </Switch>

      </div>
    );
  }
}

export default App;
