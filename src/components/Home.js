import React, { Component } from 'react';
import { Card, Col, Row, Layout, Menu, Icon, Pagination } from 'antd';
import {getMovieList} from '../utils/index';

const { Meta } = Card;
const { Content, Sider } = Layout;

class Home extends Component {
    constructor(props) {
				super(props)
				this.state = {
					movie_list: [],
					page: 1,
					total_pages: 1,
					total_results: 1,

					current: 'popular',
				}
    }

    async componentDidMount() {
				const self = this

				let {total_pages, results, page} = await getMovieList(self.state.current);
				// console.log(results)
				self.setState({
					movie_list: results,
					page,
					total_pages,
				})
		}

		handleClick = async e => {
			const self = this
			console.log(e.key)
			self.setState({
				current: e.key,
			});

			let {total_pages, results, page} = await getMovieList(e.key);
			self.setState({
				movie_list: results,
				page,
				total_pages,
			})
		};

		jumpPage = async (pageNum) => {
			const self = this

			let {total_pages, results, page} = await getMovieList(self.state.current, pageNum);
			self.setState({
				total_pages,
				movie_list: results,
				page,
			})
		}

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
								<Menu.Item key="popular">
									<Icon type="collection" />
									<span>The most popular</span>
								</Menu.Item>

								<Menu.Item key="top_rated">
									<Icon type="watchlater" />
									<span>Top rating</span>
								</Menu.Item>

								<Menu.Item key="upcoming">
									<Icon type="watchlater" />
									<span>Upcoming</span>
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
										this.state.movie_list.map((item) => {
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

								<Pagination defaultCurrent={this.state.page} onChange={this.jumpPage} total={this.state.total_pages} />
							</Content>
						</Layout>
					</Layout>
        )
    }
}

export default Home;
