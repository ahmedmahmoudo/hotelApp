import React, { Component } from 'react'
import { object, number } from 'prop-types';

import { Card } from 'antd';

class Hotel extends Component {

    render() {
        const { hotel, numberOfDays } = this.props;
        return (
            <Card style={{ marginBottom: 10 }}>
                <p>Name: {hotel.name}</p>
                <p>Price: {Math.round(hotel.price * numberOfDays)}</p>
                <p>City: {hotel.city}</p>
            </Card>
        )
    }
}

Hotel.propTypes = {
    hotel: object.isRequired,
    numberOfDays : number.isRequired
}

export default Hotel;