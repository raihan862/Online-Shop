import React from 'react';
import Signup from '../../Authentication/Signup/Signup';

const AddUser = (params) => {
    
    return (
        <div className="auth-form" style={{marginTop:'20px'}}>
    
              <Signup from="admin"/>

        </div>
    );
};

export default AddUser;