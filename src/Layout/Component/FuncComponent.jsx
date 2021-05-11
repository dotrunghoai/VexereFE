import React from 'react'
import { connect } from 'react-redux';

function FuncComponent({ userInfo }) {
    return (
        <div>
            {console.log(userInfo)}
        </div>
    )
}
function mapStateToProps(state) {
    return { userInfo: state.UserInfo.userLogin };
}
export default connect(mapStateToProps)(FuncComponent)