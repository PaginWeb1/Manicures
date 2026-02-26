// Usuarios demo
const usuarios = [
  {usuario:"cliente", clave:"1234", rol:"cliente"},
  {usuario:"admin", clave:"1234", rol:"admin"}
];

let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

function login(){
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("clave").value;

  const encontrado = usuarios.find(u => u.usuario===user && u.clave===pass);

  if(!encontrado){
    alert("Credenciales incorrectas");
    return;
  }

  localStorage.setItem("sesion", JSON.stringify(encontrado));

  if(encontrado.rol==="cliente"){
    window.location="cliente.html";
  }else{
    window.location="admin.html";
  }
}

function logout(){
  localStorage.removeItem("sesion");
  window.location="login.html";
}

function verificarCliente(){
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  if(!sesion || sesion.rol!=="cliente"){
    window.location="login.html";
  }
}

function verificarAdmin(){
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  if(!sesion || sesion.rol!=="admin"){
    window.location="login.html";
  }
}

function cargarCalendario(){
  const hoy = new Date().toISOString().split("T")[0];
  document.getElementById("fechaSeleccionada").setAttribute("min", hoy);
}

function mostrarHoras(){
  const fecha = document.getElementById("fechaSeleccionada").value;
  const container = document.getElementById("horasContainer");
  container.innerHTML="";

  const horas = ["10:00","11:00","12:00","14:00","15:00","16:00"];

  horas.forEach(hora=>{
    const ocupado = reservas.find(r => r.fecha===fecha && r.hora===hora);

    const btn = document.createElement("button");
    btn.textContent = hora;
    btn.classList.add("hora-btn");

    if(ocupado){
      btn.classList.add("ocupado");
      btn.disabled=true;
    }else{
      btn.classList.add("disponible");
      btn.onclick=()=> reservar(fecha,hora);
    }

    container.appendChild(btn);
  });
}

function reservar(fecha,hora){
  const sesion = JSON.parse(localStorage.getItem("sesion"));

  reservas.push({
    cliente: sesion.usuario,
    fecha: fecha,
    hora: hora
  });

  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert("Reserva confirmada 🎉");
  mostrarHoras();
}

function mostrarReservasAdmin(){
  const lista = document.getElementById("listaAdmin");
  lista.innerHTML="";

  reservas.forEach(r=>{
    const li = document.createElement("li");
    li.textContent = `${r.cliente} - ${r.fecha} ${r.hora}`;
    lista.appendChild(li);
  });
}
