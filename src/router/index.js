import Home from '../components/Home';
import User from '../components/User';
import Player from '../components/Player';
import Movie from '../components/Movie';

let routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/User',
        component: User
    },
    {
        path: '/player/:movie_id',
        component: Player
    },
    {
        path: '/search',
        component: Movie
    }
];

export default routes;
