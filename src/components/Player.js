import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import {
	getMovieInfo,
	setCollection,
	setWatchLater,
	isWatchLater,
	isCollection
} from '../utils/index';
import {Icon} from 'antd';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie_url: "",

            title: '',
            overview: '',
            popularity: '',
            vote_count: '',
            original_language: '',
            release_date: '',
            is_collection: 0,
            is_watchlater: 0,
          //  test_url: 'https://v-cdn.zjol.com.cn/280443.mp4',
            data: {}
        }
    }

    async componentDidMount() {
        const self = this

        let query = self.props.location.query;
				let movie_id = self.props.match.params.movie_id
				if (isWatchLater(movie_id)) {
					self.setState({
						is_watchlater:1
					})
				}

				if (isCollection(movie_id)) {
					self.setState({
						is_collection: 1
					})
				}
				console.log(query)
        self.setState({
            data: query,
            title: query && query.title || "",
            overview: query && query.overview || "",
            popularity: query && query.popularity || "",
            vote_count: query && query.vote_count || "",
            original_language: query && query.original_language || "",
            release_date: query && query.release_date || "",
        })

        let {id, results} = await getMovieInfo(movie_id)
        self.setState({
            movie_url: "https://www.youtube.com/watch?v=" + results[0].key
        })
    }

    addCollection = () => {
        const self = this
				if (self.state.is_collection) return;
				console.log('self.state.data: ', self.state.data)
				setCollection(self.state.data)

				self.setState({
					is_collection: 1
				})
    }

    addWatchlater = () => {
			const self = this
			if (self.state.is_watchlater) return;
			setWatchLater(self.state.data)

			self.setState({
				is_watchlater: 1
			})
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center', marginTop: 30}}>{this.state.title}</h1>
                <p style={{textAlign: 'center'}}>
									Release date: {this.state.release_date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									Language: {this.state.original_language}</p>
                <p></p>
								<ReactPlayer
									controls={true}
									url={this.state.movie_url}
									style={{
										margin: '0 auto'
									}}/>
								<p style={{
									textAlign: 'center',
									marginTop: 26
								}}>
										Favorites: &nbsp;
										<Icon
											onClick={this.addCollection}
											type="heart"
											theme="twoTone"
											style={{
												marginRight: 40,
												fontSize: 20
											}}
											twoToneColor={this.state.is_collection ? '#eb2f96': "#aaa"}/>

										Watchlater: &nbsp;
										<Icon
											onClick={this.addWatchlater}
											type="clock-circle"
											theme="twoTone"
											style={{
												fontSize: 20,
												marginRight: 40,
											}}
											twoToneColor={this.state.is_watchlater ? '#eb2f96': "#aaa"}/>

										<Icon
											type="fire"
											theme="twoTone"
											style={{
												fontSize: 20,
											}}/>&nbsp;
											{this.state.popularity}

											<Icon
												type="like"
												style={{
													fontSize: 20,
													marginLeft: 40,
												}}
												theme="twoTone" />&nbsp;{this.state.vote_count}
                </p>
								<h3 style={{
									width: 640,
									margin: '0 auto',
									paddingTop: 30,
								}}>Description: </h3>
                <p style={{
									width: 640,
									margin: '0 auto',
									colro: '#aaa'
								}}>{this.state.overview}</p>
            </div>
        )
    }
}

export default Player;
