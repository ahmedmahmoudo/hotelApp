import React, { Component } from 'react'
import { bool } from 'prop-types';
import { Skeleton, Row, Col } from 'antd';
class LoadingSkeleton extends Component {
    render() {
        const { show } = this.props;
        return (
            <div style={{ display: show ? 'block' : 'none'}}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Skeleton active/>
                    </Col>
                    <Col span={12}>
                        <Skeleton active/>
                    </Col>
                    <Col span={12}>
                        <Skeleton active/>
                    </Col>
                    <Col span={12}>
                        <Skeleton active/>
                    </Col>
                </Row>
            </div>
        )
    }
}

LoadingSkeleton.propTypes = {
    show: bool.isRequired,
};


export default LoadingSkeleton;