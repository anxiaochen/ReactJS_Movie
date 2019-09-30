import React, { Component } from 'react';
import { Layout, Menu, Row, Icon, Col, Card } from 'antd';
import {
	getCollection,
	getWatchLater,
} from '../utils/index';
const { Meta } = Card;
const { Content, Sider } = Layout;

class User extends Component {
    state = {
			mode: 'inline',
			theme: 'light',

			movie_list: [],

			current: 'collection',
		};

		async componentDidMount() {
			const self = this

			let results = getCollection();
			results = JSON.parse(results)
			self.setState({
				movie_list: results
			})
	}

		handleClick = e => {
			const self = this
			this.setState({
				current: e.key,
			});
			let results = [];
			if (e.key == 'collection') {
				console.log('22222')
				results = getCollection();
			} else if (e.key == 'watchlater') {
				console.log('3333')
				results = getWatchLater();
			}

			results = JSON.parse(results)
			if (!results) return;
			self.setState({
				movie_list: results
			})
		};

		jumpDetail = async (item) => {
			this.props.history.push({
				pathname: '/player/'+ item.id,
				query: {
					...item
				}
			})
		}

    render() {
			return (
				<Layout>
					<Sider width={200} style={{ background: '#fff' }}>
						<Menu
							mode="inline"
							onClick={this.handleClick}
							defaultSelectedKeys={[this.state.current]}
							defaultOpenKeys={['sub1']}
							style={{ height: '100%', borderRight: 0 }}
						>
							<Menu.Item key="collection">
								<Icon type="collection" />
								<span>My Favorites</span>
							</Menu.Item>

							<Menu.Item key="watchlater">
								<Icon type="watchlater" />
								<span>Watch later</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout style={{ padding: '0 24px 24px' }}>

						<Content
							style={{
								background: '#fff',
								padding: 24,
								marginTop: 24,
								minHeight: 280,
							}}
						>
								<Row gutter={24}>
									{
										this.state.movie_list && this.state.movie_list.map((item) => {
											return (
												<Col span={6} key={item.id}>
													<Card
														hoverable
														onClick={this.jumpDetail.bind(this, item)}
														style={{ marginBottom: 24 }}
														cover={<img alt="example" src={'http://image.tmdb.org/t/p/w185//' + item.backdrop_path} />}
													>
														<Meta title={item.title} />
													</Card>
												</Col>
											)
										})
									}
								</Row>
						</Content>
					</Layout>
				</Layout>

			)
    }
}

export default User;
