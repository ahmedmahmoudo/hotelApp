import React, { Component } from 'react'
import { array, string, number, bool } from 'prop-types';

import Hotel from './Hotel';

import {Row, Col, Button} from 'antd';

class Hotels extends Component {
    constructor(props) {
        super(props);
        this.state = {sortBy: 'none'};
        this.getHotels = this.getHotels.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    getHotels = () => {
        const {hotels, hotelName, minPrice, maxPrice, numberOfDays} = this.props;
        let listOfHotels = [];
        if(hotelName) {
            hotels.forEach(hotel => {
                if(hotel.name.includes(hotelName)) listOfHotels.push(hotel);
            });
        } else {
            listOfHotels.push(...hotels);
        }

        if(minPrice > 0) {
            listOfHotels = listOfHotels.filter(hotel => ( hotel.price * numberOfDays ) >= minPrice);
        }

        if(maxPrice > 0) {
            listOfHotels = listOfHotels.filter(hotel => ( hotel.price * numberOfDays ) <= maxPrice);
        }

        if(this.state.sortBy === "name") {
            listOfHotels.sort((hotelA, hotelB) => {
                let code = 0;
                code = hotelA.name < hotelB.name ? -1 : 1;
                return code;
            });
        } else if(this.state.sortBy === "price") {
            listOfHotels.sort((hotelA, hotelB) => {
                let code = 0;
                code = hotelA.price < hotelB.price ? -1 : 1;
                return code;
            });
        }

        return listOfHotels.map(hotel => {
            return <Col key={hotel.name} span={11} offset={1}><Hotel hotel={hotel} numberOfDays={numberOfDays}/></Col>
        });
    }

    sortBy = (method) => {
        this.setState({sortBy: this.state.sortBy === method ? 'none' : method});
    }

    render() {
        const {numberOfDays, show} = this.props;

        return (
            <Row style={{ display: show ? 'block' : 'none'}}>
                <Col span={24}>
                    <Row align="middle">
                        <Col span={8}>
                            <p><strong>Number of Days: {numberOfDays}</strong></p>
                        </Col>
                        <Col span={11} offset={5} style={{ marginTop: 0 }}>
                            <Button style={{ marginRight: 2 }} onClick={() => this.sortBy('name')}>
                                Sort By Name
                            </Button>
                            
                            <Button onClick={() => this.sortBy('price')}>Sort By Price</Button>
                        </Col>
                    </Row>
                </Col>
                { this.getHotels() }
            </Row>
        )
    }
}


Hotels.propTypes = {
    hotels : array.isRequired,
    hotelName : string,
    minPrice : number,
    maxPrice: number,
    numberOfDays: number.isRequired,
    show: bool.isRequired
}

export default Hotels;