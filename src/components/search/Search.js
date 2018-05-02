import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Results from '../image-results/Results';

 class Search extends Component {
     state = {

        searchText: '',
        amount: 15,
        apiUrl: "https://pixabay.com/api",
        apiKey: "8879026-03b299e37ba38ae4d285fbdca",
        fix: "http://cors.io/?",
        images: []
        

     }
     onTextChange = (e) => {
         const val = e.target.value;
        this.setState({[e.target.name] : e.target.value,}, () => {
              if (val === "") {
                  this.setState({images: []});

              } else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type="photo"&per_page=${this.state.amount}`)
                .then(response => this.setState({images: response.data.hits}))
                .catch (err => console.log(err))
                
              }
            });
     };

     onAmountChange = (e, index, value) => this.setState({ amount: value})
  render() {
    console.log(this.state);
    return (
      <div>
        <TextField
        name="searchText"
        value= {this.state.searchText}
        onChange={this.onTextChange}
        floatingLabelText="Search from Images"
        fullWidth={true}
        />
        <br/>
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br/>
        {this.state.images.length > 0 ? (<Results images={this.state.images}/>) : null}
      </div>
    )
  }
}

export default Search;
