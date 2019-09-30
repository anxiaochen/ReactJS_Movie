import React, { Component } from 'react';
import { Menu, Icon, Input, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

class TopHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: '/home',
        };
    }

    componentDidMount() {
        const self = this
        console.log(this.props.history)
        
        let url = window.location.href;
        let tag = '';
        if (url.indexOf('/user') > 1) {
            console.log('111')
            tag = '/user'
        } else if (url.indexOf('/home') > 1) {
            tag = '/home'
            console.log('222')
        } else if (url.indexOf('/search') > 1) {
            tag = '/search'
            console.log('333')
        }

        self.setState({
            current: tag,
        })
    }

    handleClick = e => {
        this.setState({
          current: e.key,
        });
    };



    render() {
        return (

                <Menu
                    theme={"dark"}
                    style={{
                        textAlign: "center"
                    }}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                    <Menu.Item key="/user">
                            <Link to="/user"><Icon type="user" /></Link>
                    </Menu.Item>

                    <Menu.Item key="/home">
                            <Link to="/">Home</Link>
                    </Menu.Item>

                    <Menu.Item key="/search">
                            <Link to="/search">Search</Link>
                    </Menu.Item>
                </Menu>


        )
    }
}

export default TopHeader;
