import { useEffect, useState } from "react";
import "../App.css"; 
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function Login() {
  const clientId = "8418327083-p7tn24iohhc2f0m1k444dqp3go9clma4.apps.googleusercontent.com";
  const [profile, setProfile] = useState(null);
  const allowedDomain = "@lamduan.mfu.ac.th"; // โดเมนที่อนุญาต

  // ฟังก์ชันที่จะถูกเรียกเมื่อ Google Login สำเร็จ
  const responseGoogle = (response) => {
    console.log(response);
    const profile = response.profileObj;
    const name = profile.name;
    const email = profile.email;

    // ตรวจสอบว่าอีเมลอยู่ในโดเมนที่อนุญาต
    if (email.endsWith(allowedDomain)) {
        // ส่งข้อมูลไปยัง backend
        axios.post('http://localhost:8000/api/user', { name, email }) // ส่งทั้ง name และ email
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log("Error during API call:", err);
            });
    } else {
        console.log("Email domain not allowed");
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

  // ฟังก์ชันเมื่อ login สำเร็จ
  const onSuccess = (res) => {
    const email = res.profileObj.email;
    
    // ตรวจสอบว่าอีเมลลงท้ายด้วย @lamduan.mfu.ac.th
    if (email.endsWith(allowedDomain)) {
        setProfile(res.profileObj);
        console.log("Login Success:", res);
        responseGoogle(res); // เรียกใช้ responseGoogle เพื่อส่งข้อมูลไปยัง backend
    } else {
        console.log("Unauthorized domain");
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
      <h2>Google Login</h2>
      <br />
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
