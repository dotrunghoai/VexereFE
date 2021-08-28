import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { userService } from '../../Service'

export default class UserAdminComponent extends Component {
    state = {
        rows: [],
        isLoading: true
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            userService.fetchUser()
                .then(res => {
                    this.setState({
                        rows: res.data,
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        isLoading: false
                    })
                })
        })
    }
    render() {
        return (
            <div className='userAdmin'>
                <div className="admin_table">
                    <MaterialTable
                        isLoading={this.state.isLoading}
                        options={{
                            sorting: true,
                            search: true,
                            exportButton: true,
                            paging: false,
                            emptyRowsWhenPaging: true,
                            headerStyle: {
                                position: 'sticky',
                                top: 0,
                                backgroundColor: 'teal',
                                color: 'white',
                                border: "1px solid white",
                                padding: 5
                            },
                            maxBodyHeight: 600,
                            cellStyle: {
                                minWidth: '125px',
                            },
                            loadingType: 'linear'
                        }}
                        columns={[
                            { title: 'Username', field: 'username' },
                            { title: 'Email', field: 'email' },
                            { title: 'Phone Number', field: 'phoneNumber' },
                            // { title: 'Role', field: 'role' },
                            // { title: 'Avatar', field: 'avatar' },
                        ]}
                        data={this.state.rows}
                        title="User Management"
                    />
                </div>
            </div>
        )
    }
}
