import BrandService from './brandService'
import CarService from './carService'
import OrderService from './orderService'
import StationService from './stationService'
import TripService from './tripService'
import UserService from './userService'

export const userService = new UserService()
export const brandService = new BrandService()
export const carService = new CarService()
export const stationService = new StationService()
export const tripService = new TripService()
export const orderService = new OrderService()