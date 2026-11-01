
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  getCountFromServer
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDsZUHfZ7EBatnMwwR4FKgPWLjZybIm9KI",
  authDomain: "walker-midia.firebaseapp.com",
  databaseURL: "https://walker-midia-default-rtdb.firebaseio.com",
  projectId: "walker-midia",
  storageBucket: "walker-midia.firebasestorage.app",
  messagingSenderId: "223143706690",
  appId: "1:223143706690:web:3c9e81a0d21173a59caddb"
};

// ADMINISTRADOR
const ADMIN_UID = "7TAC1PMMwAMyrL3LUcboCHKjWJq2";

// INICIALIZAÇÃO
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ELEMENTOS
const form = document.getElementById("form-login");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const botao = document.getElementById("btn-entrar");
const erro = document.getElementById("erro");

// LOGIN
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  erro.textContent = "";
  erro.classList.remove("visivel");

  botao.disabled = true;
  botao.textContent = "Verificando...";

  try {
    const credencial = await signInWithEmailAndPassword(
      auth,
      campoEmail.value.trim(),
      campoSenha.value
    );

    const usuario = credencial.user;

    if (usuario.uid === ADMIN_UID) {
      window.location.href = "./admin.html";
    } else {
      window.location.href = "./cliente.html";
    }

  } catch (error) {
    console.error(error);

    erro.textContent =
      "Não foi possível entrar. Confira seu e-mail e senha.";

    erro.classList.add("visivel");

    botao.disabled = false;
    botao.textContent = "Entrar";
  }
});

// CONTADOR DE USUÁRIOS
async function carregarContador() {
  const numero = document.getElementById("total-usuarios");

  try {
    const resultado = await getCountFromServer(
      collection(db, "usuarios")
    );

    numero.textContent =
      resultado.data().count.toLocaleString("pt-BR");

  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    numero.textContent = "—";
  }
}

carregarContador();
