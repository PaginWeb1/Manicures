let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

function abrirModal(){
  document.getElementById("modal").style.display = "flex";
}

function cerrarModal(){
  document.getElementById("modal").style.display = "none";
}

function guardarReserva(){
  const nombre = document.getElementById("nombre").value.trim();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  if(!nombre || !fecha || !hora){
    alert("Completa todos los campos");
    return;
  }

  const nuevaReserva = {
    nombre,
    fecha,
    hora
  };

  reservas.push(nuevaReserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  cerrarModal();
  mostrarReservas();
}

function mostrarReservas(){
  const lista = document.getElementById("listaReservas");
  lista.innerHTML = "";

  reservas.forEach(reserva=>{
    const li = document.createElement("li");
    li.textContent = `${reserva.nombre} - ${reserva.fecha} a las ${reserva.hora}`;
    lista.appendChild(li);
  });
}

mostrarReservas();
