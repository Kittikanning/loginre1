import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg"; // ปรับเส้นทางให้ถูกต้อง
import viteLogo from "/vite.svg"; // ตรวจสอบเส้นทางให้ถูกต้อง
import "../App.css"; 


// โค้ดอื่น ๆ ในไฟล์

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function Login() {
  const clientId =
    "8418327083-p7tn24iohhc2f0m1k444dqp3go9clma4.apps.googleusercontent.com";
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    console.log("success", res);
  };

  const onFailure = (res) => {
    console.log("failed", res);
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
    <>
      <h2>Google Login</h2>
      <br></br>
      {profile ? (
        <div>
          <img src={profile.imageUrl} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name : {profile.name}</p>
          <p>Email : {profile.email}</p>
          <br />
          <br />
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