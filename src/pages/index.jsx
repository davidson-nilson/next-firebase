import {app, signIn} from "../../services/firebase";
import {signInWithPopup, GoogleAuthProvider, getAuth, signOut, signInWithEmailAndPassword} from "firebase/auth";
export default function Home() {

  function Logout(){
    var result_p = document.getElementById("resposta");
    const auth = getAuth();
    signOut(auth).then((result)=>{
      console.log("FOI");
      result_p.innerHTML = "Desconectado";
    }).catch((error)=>{
      console.log(error);
    })
  }
  function signInGoogle(){
    var result_p = document.getElementById("resposta");
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      result_p.innerHTML = user.displayName+"<br>"+user.email;
      // ...
    }).catch((error) => {
     
      console.log(error);
      result_p.innerHTML = "Erro no login";
      // ...
    });
  }
  function signInEmail(){
    var result_p = document.getElementById("resposta");
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((result)=>{
      result_p.innerHTML = result.user.displayName+"<br>"+result.user.email;
    })
    .catch((error)=>{
      console.log(error);
      result_p.innerHTML = "Erro no login";
    });
  }
  return (
    <div>
      <input type="email" name="" id="email" />
      <input type="password" name="" id="password" />
      <button onClick={signInEmail}>Login</button>
      <button
        onClick={signInGoogle}>Login Google</button>
      <p id="resposta"></p>
      <button
        onClick={Logout}>Logout</button>
    </div>

  );
}
