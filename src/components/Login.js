import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleLogging } from '../actions/shared'

class Login extends Component {
    state = {
        selectedUser: 0
      }

      handleChange = (e) => {
        const selectedUser = e.target.value
    
        this.setState(() => ({
            selectedUser
        }))
      }

      handleLogIn = (e) => {
        e.preventDefault()
        const { selectedUser } = this.state
        const { dispatch } = this.props  
        dispatch(handleLogging(selectedUser))
        this.setState(() => ({
            selectedUser: "0"
        }))
      }

    render() {
        const { selectedUser } = this.state
        return (
        <div className="login">
            <div className="col-md-12 mt-3 mb-3"> 
                <h3 className='text-center'>Login</h3>
            </div>

            <div className='col-md-8 offset-md-2'>
                <div className="card bg-dark text-light">
                    <div className="card-header">Would You Rather App</div>
                    <div className="card-body">
                        <form onSubmit={this.handleLogIn}>
                            <div className="form-group row">
                                <label className="col-form-label col-md-4 offset-md-2">Please select user to Log in</label>
                                <div className="col-md-4">
                                    <select
                                    placeholder="Select a user to Login"
                                    value={selectedUser}
                                    onChange={this.handleChange}
                                    className='form-control form-control-sm'                                
                                    >
                                        <option value="0">-</option>
                                    {this.props.usersIds.map((id) => (
                                        <option value={id} key={id}>{this.props.users[id].name}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                            <label className="col-form-label offset-md-2"></label>
                            <div className="col-md-8">
                                <button
                                    className='btn btn-sm btn-primary  btn-block'
                                    type='submit'
                                    disabled={selectedUser === "0" || selectedUser === 0}>
                                    Login
                                </button>
                             </div>   
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
      usersIds: Object.keys(users).sort(),
      users: users ? users : null
    }
  }

export default connect(mapStateToProps)(Login)