const socket = io();

socket.on("nuevoTurno", (turno) => {
  const lista = document.getElementById("lista-turnos");
  const li = document.createElement("li");
  li.textContent = `Mascota: ${turno.mascota} - Servicio: ${turno.servicio} - Fecha: ${turno.fecha} - Hora: ${turno.hora}`;
  lista.appendChild(li);
});
