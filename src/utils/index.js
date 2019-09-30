function getMovieList(index, page) {
    let url;
    page = page || 1;

    //movie categories: popular, top rating and upcoming
    if (index == "popular") {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=b4a6b12010627d24e80b3ff1d91489f4&page=${page}`
    } else if (index == "top_rated") {
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=b4a6b12010627d24e80b3ff1d91489f4&page=${page}`
    } else if (index == "upcoming") {
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=b4a6b12010627d24e80b3ff1d91489f4&page=${page}`
    }

    return new Promise(async (resolve, reject) => {
            fetch(url, {
                    method: 'GET',
                    mode: 'cors'
            }).then((res) => {
                    resolve(res.json())
            }).catch((err) => {
                    console.log(err)
                    reject(err.json())
            })
    })
}

//movie detailed information
function getMovieInfo(id) {
	let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=b4a6b12010627d24e80b3ff1d91489f4&language=en-US`
	return new Promise(async (resolve, reject) => {
		fetch(url, {
			method: 'GET',
			mode: 'cors'
		}).then((res) => {
			resolve(res.json())
		}).catch((err) => {
			console.log(err)
			reject(err.json())
		})
	})
}

//search movies by keyword
function searchText(text, page=1) {
	let url = `https://api.themoviedb.org/3/search/movie?api_key=b4a6b12010627d24e80b3ff1d91489f4&language=en-US&query=${text}&page=${page}&include_adult=false`
	return new Promise(async (resolve, reject) => {
		fetch(url, {
			method: 'GET',
			mode: 'cors'
		}).then((res) => {
			resolve(res.json())
		}).catch((err) => {
			console.log(err)
			reject(err.json())
		})
	})
}

function setCollection(obj) {
	if (!obj) return console.log('obj null')
	let data = getCollection();
	data = JSON.parse(data);

	if (!data) {
		data = []
	};

	if (!isArray(data)) {
		console.log('not array, clean data!');
		localStorage.setItem('collection_list', "")
		data = []
	}
	for (let i=0; i<data.length; i++) {
		if (data[i].id == obj.id) {
			return;
		}
	}
	data.push(obj)
	localStorage.setItem('collection_list', JSON.stringify(data))
}

function getCollection() {
	return localStorage.getItem('collection_list');
}

function isCollection(id) {
	let data = getCollection();
	data = JSON.parse(data);
	if (!isArray(data) || data.length < 1) return 0;

	for (let i=0; i<data.length; i++) {
		if (data[i].id == id) {
			return 1;
		}
	}
	return 0;
}



//return watchlater movies list, currently is saving in local storage.
function getWatchLater() {
	return localStorage.getItem('watchlater_list');
}

//save watchlater movies list in local storage.
function setWatchLater(obj) {
	if (!obj) return console.log('obj null')
	let data = getWatchLater();
	data = JSON.parse(data);
	if (!data) {
		data = []
	};

	if (!isArray(data)) {
		console.log('not array, clean data!');
		localStorage.setItem('setWatchLater', "")
		data = []
	}

	for (let i=0; i<data.length; i++) {
		if (data[i].id == obj.id) {
			return;
		}
	}
	data.push(obj)
	localStorage.setItem('watchlater_list', JSON.stringify(data))
}

function isWatchLater(id) {
	let data = getWatchLater();
	data = JSON.parse(data);
	if (!isArray(data) || data.length < 1) return 0;

	for (let i=0; i<data.length; i++) {
		if (data[i].id == id) {
			return 1;
		}
	}
	return 0;
}

function isArray(o) {
	return Object.prototype.toString.call(o)== '[object Array]';
}

export {
	getMovieList,
	getMovieInfo,
	setCollection,
	getCollection,
	setWatchLater,
	isWatchLater,
	isCollection,
	getWatchLater,
	searchText
}
