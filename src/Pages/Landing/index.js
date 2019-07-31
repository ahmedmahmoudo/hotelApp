import React, { Component } from 'react'
import { DatePicker, Button, Row, Col, Input, Icon, Alert, Slider } from 'antd';
import './index.css'
import axios from 'axios';
import moment from 'moment';
import LoadingSkeleton from './Components/LoadingSkeleton';
import Hotels from './Components/Hotels';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.api_url = "https://api.myjson.com/bins/tl0bp";
        this.state = {hotelName: '', 
            minHotelPrice: 0, 
            maxHotelPrice: 100000, 
            hotels: [],
            selectedDays: 0,
            searching: false,
            emptyDate: false,
            maxPrice: 100000,
        };
        this.onSearch = this.onSearch.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.loadHotels = this.loadHotels.bind(this);

    }

    //event is triggered when the client hits enter or clicks on the enter button on the search input
    //calling API to get request to get all list of hotels then saving them to state
    onSearch = () => {
        if(this.state.selectedDays > 0) {
            this.setState({searching: true}, this.loadHotels);
        } else {
            this.setState({emptyDate: true});
        }
    }

    loadHotels = () => {
        axios.get(this.api_url).then((response) => {
            if(response.data) {
                this.setState({hotels: response.data.hotels, searching: false});
            }
          }).catch(error => this.setState({error: true}));
    }

    hotelFilterByName = (name) => {
        this.setState({hotelName: name});
    }

    hotelFilterByPrice = (prices) => {
        this.setState({minHotelPrice : prices[0] / 100 * this.state.maxPrice, maxHotelPrice: prices[1] / 100 * this.state.maxPrice});
    }



    disableInvalidDates = (date) => {
        let calDate = moment(date);
        let today = moment();
        if(calDate.isSameOrAfter(today)) return false;
        return true;
    }

    //event is triggered when client has selected two dates
    //using moment.js to find the days differences then setting the state
    onDateChange = (value, dateString) => {
        let firstDate = moment(dateString[0]);
        let secondDate = moment(dateString[1]);
        let numberOfDays = secondDate.diff(firstDate, 'd');

        if(numberOfDays > 0 || firstDate.isSame(secondDate)) {
            this.setState({selectedDays: numberOfDays === 0 ? 1 : numberOfDays, emptyDate: false});
        }
        
    }

    render() {
        return (
          <div className="App">
            <div className="App-header">
              <h2>Welcome to Hotel App</h2>
              <p>Start Searching for hotels now</p>
              <Row>
                  <Col span={16} offset={5}>
                      <DatePicker.RangePicker 
                        placeholder={["From", "To"]}
                        onChange={this.onDateChange}
                        disabledDate={this.disableInvalidDates}
                      />
                      <Button className="Search-Button" icon="search" type="primary" onClick={this.onSearch}>Search</Button>
                  </Col> 
              </Row>
              <Row style={{ marginTop: 10 }}>
                  <Col span={12} offset={7}>
                    <Alert style={{ display: this.state.emptyDate ? 'block' : 'none' }} type="error" message="Please select the required days" closable/>
                  </Col>
              </Row>
            </div>

            <Row gutter={16} className="App-Body" style={{ display: (this.state.searching || this.state.hotels.length > 0) ? 'block' : 'none' }}>
                <Col span={6} offset={2}>
                    <Row>
                        <Input.Search 
                            addonBefore={<Icon type="search" />} placeholder="Hotel Name"
                            onSearch={this.hotelFilterByName}
                        />
                        <Slider 
                            range 
                            defaultValue={[this.state.minPrice, this.state.maxPrice]} 
                            marks={{ 0: 0, 100: this.state.maxPrice }}
                            tipFormatter={value => `${value / 100 * this.state.maxPrice}$`}
                            onAfterChange={this.hotelFilterByPrice}/>
                    </Row>
                </Col>
                <Col span={12}>
                    <LoadingSkeleton show={this.state.searching}/>
                    <Hotels 
                        show={!this.state.searching}    
                        hotels={this.state.hotels}
                        hotelName={this.state.hotelName}
                        minPrice={this.state.minHotelPrice}
                        maxPrice={this.state.maxHotelPrice}
                        numberOfDays={this.state.selectedDays} />
                </Col>
            </Row>
          </div>
        );
    }
}

export default Landing;