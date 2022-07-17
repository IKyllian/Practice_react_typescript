import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function ModalAddProject() {
    const [projectName, setProjectName] = useState('');
    return (
        <div className='modal-project-container'>
          <form>
            <label htmlFor="name">
              Project Name :
            </label>
            <input id="name" type='text' placeholder='Name....' value={projectName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)} />
            <form className='invite-form'>
              <label htmlFor="invite">
                Invite people to your project
              </label>
              <input id="invite" type='text' placeholder='Username ...' value={projectName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)} />
            </form>

            <div className='buttons-container'>
              <a className='modal-button'>Cancel</a>
              <a className='modal-button'>Save</a>
            </div>
          </form>
        </div>
    );
}

export default ModalAddProject;