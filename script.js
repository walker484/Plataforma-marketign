
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  getCountFromServer
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// CONFIGURAÇÃO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDsZUHfZ7EBatnMwwR4FKgPWLjZybIm9KI",
  authDomain: "walker-midia.firebaseapp.com",
  databaseURL: "https://walker-midia-default-rtdb.firebaseio.com",
  projectId: "walker-midia",
  storageBucket: "walker-midia.firebasestorage.app",
  messagingSenderId: "223143706690",
  appId: "1:223143706690:web:3c9e81a0d21173a59caddb"
};

// INICIAR FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// UID DO ADMINISTRADOR
const ADMIN_UID = "7TAC1PMMwAMyrL3LUcboCHKjWJq2";

// LOGIN
const formulario = document.getElementById("formLogin");

if (formulario) {
  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    try {
      mensagem.textContent = "Entrando...";

      const resultado = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      if (resultado.user.uid === ADMIN_UID) {
        window.location.href = "./admin.html";
      } else {
        window.location.href = "./cliente.html";
      }

    } catch (erro) {
      console.error(erro);
      mensagem.textContent = "E-mail ou senha incorretos.";
    }
  });
}

// CONTADOR DE USUÁRIOS
async function atualizarContador() {
  const elemento = document.getElementById("contadorUsuarios");

  if (!elemento) return;

  try {
    const resultado = await getCountFromServer(
      collection(db, "usuarios")
    );

    elemento.textContent = resultado.data().count;

  } catch (erro) {
    console.error("Erro no contador:", erro);
    elemento.textContent = "—";
  }
}

atualizarContador();
