import React, { Component } from 'react';
import { Card, Col, Row, Layout, Input, Icon, Pagination } from 'antd';
import {searchText} from '../utils/index';
const { Meta } = Card;
const { Content, Sider } = Layout;
const { Search } = Input;

class Movie extends Component {
	constructor(props) {
		super(props)
		this.state = {
			movie_list: [],
			page: 1,
			total_pages: 1,
			total_results: 1,

			search_val: '',
		}
	}

	jumpPage = async (pageNum) => {
		const self = this

		let {total_pages, results, page} = await searchText(self.state.search_val, pageNum);
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

	onSearch = async (val) => {
		const self = this
		let {page, results, total_pages, total_results} = await searchText(val);

		self.setState({
			page,
			movie_list: results,
			total_pages,
			search_val: val
		})

}

	render() {
		return (
			<div>
				<h1 style={{textAlign: "center"}}>Search</h1>
				<Search
						placeholder="input search text"
						enterButton="Search"
						size="large"
						style={{
							width: '50%',
							marginLeft: '25%'
						}}
						onSearch={this.onSearch}
				/>
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

					<Pagination
						defaultCurrent={this.state.page}
						style={{
							width: '50%',
							marginLeft: '46%'
						}}
						onChange={this.jumpPage}
						total={this.state.total_pages} />
				</Content>
			</div>
		)
	}
}

export default Movie;
