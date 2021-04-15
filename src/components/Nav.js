import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav (props) {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink to='/' exact activeClassName='active' className="nav-link">
            Dashboad
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/new' activeClassName='active' className="nav-link">
            New Poll
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/leaderboard' activeClassName='active' className="nav-link">
            Leaderboard
          </NavLink>
        </li>
      </ul>
      <span className="navbar-text text-light">
        Welcome, {props.authedUserName}
        <img
          src={props.avatar}
          alt={`Avatar of ${props.authedUserName}`}
          className='small-avatar ml-1'
        />
        <button type="button" className="btn btn-sm btn-outline-danger ml-4" onClick={props.handleLogOut}>Log Out</button>
      </span>
      </div>
      </nav>
  )
}