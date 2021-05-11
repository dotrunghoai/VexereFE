import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class SidebarAdmin extends Component {
    state = {
        isSubMenu: false
    }
    _changeStatus = (isSubMenu) => {
        if (isSubMenu) {
            this.setState({
                isSubMenu: !this.state.isSubMenu
            })
        } else {
            this.props.changeTranXTo0()
        }
    }
    render() {
        const { item } = this.props
        return (
            <div className='admin_sidebar_content'>
                <div className="sidebar_item">
                    {
                        item.path ?
                            <NavLink to={item.path} onClick={() => this._changeStatus(item.subMenu)}>
                                {item.icon}
                                <span className='sidebar_text'>
                                    {item.title}
                                </span>
                                {
                                    item.subMenu && this.state.isSubMenu ?
                                        <i className="fa fa-angle-up fa_DownUp"></i> :
                                        item.subMenu ?
                                            <i className="fa fa-angle-down fa_DownUp"></i> :
                                            null
                                }
                            </NavLink> :
                            <a onClick={() => this._changeStatus(item.subMenu)}>
                                {item.icon}
                                <span className='sidebar_text'>
                                    {item.title}
                                </span>
                                {
                                    item.subMenu && this.state.isSubMenu ?
                                        <i className="fa fa-angle-up fa_DownUp"></i> :
                                        item.subMenu ?
                                            <i className="fa fa-angle-down fa_DownUp"></i> :
                                            null
                                }
                            </a>
                    }
                </div>
                <div className="sidebar_itemSub">
                    {
                        this.state.isSubMenu &&
                        item.subMenu.map((itemSub, index) => {
                            return (
                                <NavLink key={itemSub.path} onClick={() => this.props.changeTranXTo0()} to={itemSub.path}>
                                    {itemSub.icon}
                                    <span>{itemSub.title}</span>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
