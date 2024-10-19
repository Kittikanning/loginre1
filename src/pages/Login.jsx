import { useEffect, useState } from "react";
import "../App.css"; 
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function Login() {
  const clientId = "8418327083-p7tn24iohhc2f0m1k444dqp3go9clma4.apps.googleusercontent.com";
  const [profile, setProfile] = useState(null);
  const allowedDomain = "@lamduan.mfu.ac.th"; 

  const responseGoogle = (response) => {
    const profile = response.profileObj;
    const name = profile.name;
    const email = profile.email;

    if (email.endsWith(allowedDomain)) {
      axios.post('http://localhost:8000/api/user', { name, email })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log("Error during API call:", err);
        });
    } else {
      alert("You can only login with @lamduan.mfu.ac.th email");
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "email profile",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res) => {
    const email = res.profileObj.email;

    if (email.endsWith(allowedDomain)) {
      setProfile(res.profileObj);
      responseGoogle(res);
    } else {
      alert("You can only login with @lamduan.mfu.ac.th email");
    }
  };

  const onFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
    <>
      <h5>PROFILE</h5>
      <br />
      {profile ? (
        <div className="profile-container">
          <img src={profile.imageUrl} alt="user image" />
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </>
  );
}

export default Login;
