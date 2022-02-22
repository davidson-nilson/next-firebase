import {app, signIn} from "../../services/firebase";
import {signInWithPopup, GoogleAuthProvider, getAuth, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
export default function Home() {
  var user;
  const db = getFirestore(app);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  function Logout(){
    var result_p = document.getElementById("resposta");
    signOut(auth).then(()=>{
      result_p.innerHTML = "Desconectado";
      user = null;
    }).catch((error)=>{
      console.log(error);
    })
  }
  function signInGoogle(){
    var result_p = document.getElementById("resposta");

    signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      user = result.user;
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
    signInWithEmailAndPassword(auth, email, password)
    .then((result)=>{
      user = result.user;
      result_p.innerHTML = result.user.displayName+"<br>"+result.user.email;
    })
    .catch((error)=>{
      console.log(error);
      result_p.innerHTML = "Erro no login";
    });
  }
  
  function writeText(){
    var spa = doc(db, user.uid+'/dados');
    const dada = {
      nome: user.displayName,
      idade: 20
    }
    
    setDoc(spa, dada, {merge: false}).then(()=>{
      console.log("Enviado");
    }).catch((error) =>{
      console.log(error);
    })
    
  }
  async function readText(){
    var spa = doc(db, user.uid+'/dados');
    var fav = getDoc(spa).then(result =>{
      
    })
    getDoc(spa).then((result)=>console.log(result.data()));

    var docRef = db.collection("cities").doc("SF");

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
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
      <button onClick={writeText}>Escrever</button>
      <button onClick={readText}>Ler</button>
    </div>

  );
}
