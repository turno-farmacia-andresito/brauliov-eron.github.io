const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTasNN3fvqils4m-YRo2ZEgkOPUT0PfwKd_Zq0JlYU_uoK7GeimiW6DBNc3mInQc83FysdoCT71k_Nl/pub?output=csv";

async function cargarTurno() {
  try {
    const response = await fetch(csvURL);
    const data = await response.text();
    const filas = data.split("\n").slice(1);

    const ahora = new Date();
    const horaActual = ahora.getHours();

    // Si es antes de las 08:00, restamos un día
    if (horaActual < 8) {
      ahora.setDate(ahora.getDate() - 1);
    }

    const fechaFormateada = ahora.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    document.getElementById("fecha").textContent = fechaFormateada;

    const fechaISO = ahora.toISOString().split("T")[0];

    const filaHoy = filas.find(fila => fila.includes(fechaISO));

    if (!filaHoy) {
      document.getElementById("farmacia").textContent = "No hay turno cargado.";
      return;
    }

    const columnas = filaHoy.split(",");

    const nombre = columnas[1];
    const maps = columnas[2];
    const wpp = columnas[3];

    document.getElementById("farmacia").textContent = nombre;

    document.getElementById("btn-maps").onclick = () => {
      window.open(maps, "_blank");
    };

    document.getElementById("btn-wpp").onclick = () => {
      window.open(wpp, "_blank");
    };

  } catch (error) {
    document.getElementById("farmacia").textContent = "Error cargando datos.";
    console.error(error);
  }
}

cargarTurno();
