import React from 'react'
import { Link } from 'react-router-dom';

function HomeRightModal() {
    return (
        <div className='home-right-modal-container' >
            <Link to="/">
                <svg className='right-modal-cross' xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </Link>
            <h3> Your invitations </h3>
            <div className='invites-container'>
                <div className='invite-element'>
                    <div className='invite-element-content'>
                        <p> From: Jean </p>
                        <p> Into: Todo </p>
                    </div>
                    <div className='invite-element-buttons'>
                        <a className='modal-button'>Reject</a>
                        <a className='modal-button'>Accept</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeRightModal;