import React from 'react';
// import logo from './logo.png';

const Navigation = ({ isSignedIn }) => {
  return (
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3">
    <h5 class="my-0 mr-md-auto font-weight-normal">kdpmfss Logo</h5>
    <nav id="navlinks" class="my-2 my-md-0 mr-md-4">
      <a class="p-2 text-white px-4" href="/jobs/">Find Jobs</a>
      <a class="p-2 text-white" href="/jobs/new">Post a Job</a>
    </nav>
    {isSignedIn ? 
      (<a id="login" class="btn btn-outline-primary mr-3" href='/users/sign_out'>Logout</a>) :
      <>
      <a id="login" class="btn btn-outline-primary mr-3" href='/users/sign_in'>Login</a>
      <a id="signup" class="btn btn-primary" href='/users/sign_up'>Sign up</a>
      </>
    }  
    </div>
  );
};


export default Navigation;