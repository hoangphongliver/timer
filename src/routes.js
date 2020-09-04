import HotelDetail from './components/HotelDetail';
import HotelList from '@/components/HotelList'

export const routes = [
    {
        path: '/',
        component: HotelList,
    },
    {
        path: '/detail/:id',
        component: HotelDetail,
    }
]
