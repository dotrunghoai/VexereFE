import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Page404 from '../../images/404.jpeg'

export default class PageNotFound extends Component {
    render() {
        return (
            <div className='pagenotfound'>
                <img src={Page404} alt="pagenotfound" />
                <p>Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>
                <Link to='/' className='btn btn-primary'>Back To Home</Link>
            </div>
        )
    }
}
