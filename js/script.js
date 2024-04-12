const firebaseConfig = {
  apiKey: "AIzaSyC3WxyMcWz0zCfd7nkp1ybWoIvVl-AawQU",
  authDomain: "proyectotest-33116.firebaseapp.com",
  projectId: "proyectotest-33116",
  storageBucket: "proyectotest-33116.appspot.com",
  messagingSenderId: "1030512349335",
};

firebase.initializeApp(firebaseConfig);


// Connect application with firebase
const form = document.forms['loginForm'];
firebase.auth().onAuthStateChanged(handleAuthState);
form.addEventListener('submit', handleFormSubmit);


// Application defs
function handleAuthState(user) {
  if (user) {
    showPrivateInfo()
    return console.log('hay usuario uwu');
  }

  showLoginForm()
  return console.log('No hay usuario unu');
}

function handleFormSubmit(event) {
  event.preventDefault();

  const email = form['email'].value;
  const password = form['password'].value;
  const isLoginOrSignup = form['isLoginOrSignup'].value;

  if (isLoginOrSignup === 'isLogin') {
    return loginUser({ email, password });
  }

  return createUser({ email, password });
}


// Application Utils
function showPrivateInfo(user) {
  const loginForm = document.getElementById('loginFormUI');
  loginForm.style.display = 'none';

  const hiddenPrivateInfo = document.getElementById('hiddenPrivateInfo');
  hiddenPrivateInfo.style.display = 'block';
  hiddenPrivateInfo.innerHTML = `
    <p> Joa mani ya entraste, ahora te puedes ir</p>
    <button id="btnLogout" class="button">Logout</button>
  `;

  const btnLogout = document.getElementById('btnLogout');
  btnLogout.addEventListener('click', signoutUser);
}

function showLoginForm() {
  const loginForm = document.getElementById('loginFormUI');
  loginForm.style.display = 'block';

  const hiddenPrivateInfo = document.getElementById('hiddenPrivateInfo');
  hiddenPrivateInfo.style.display = 'none';
  hiddenPrivateInfo.innerHTML = `
    <p>Nada que mostrar</p>
  `;
}


// Firebase defs
function createUser({ email, password }) {
  console.log('Creating user ' + email);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log('Usuario creado');
    })
    .catch(function (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Ya existe el usuario');
        const soLogin = confirm(
          `Este usuario ya existe.
          ¿Quieres iniciar sesión?`
        );
        return !!soLogin ? loginUser({ email, password }) : alertTryAgain(error);;
      }

      return alertTryAgain(error);
    });
}

function loginUser({ email, password }) {
  console.log('Loging user ' + email);

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log('Bienvenido');
    })
    .catch(function (error) {
      console.log(error);
      alertTryAgain(error);
    });
}

function signoutUser() {
  firebase.auth().signOut();
}


// General Utils
function alertTryAgain(error) {
  console.log(error);
  return alert('Error, intenta de nuevo');
}