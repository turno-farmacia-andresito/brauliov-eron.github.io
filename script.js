const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTasNN3fvqils4m-YRo2ZEgkOPUT0PfwKd_Zq0JlYU_uoK7GeimiW6DBNc3mInQc83FysdoCT71k_Nl/pub?output=csv";

async function cargarTurno() {
  try {
    const response = await fetch(csvURL);
    const data = await response.text();

    const filas = data.split("\n").map(f => f.split(","));

    const ahora = new Date();
    let fechaTurno = new Date(ahora);

    if (ahora.getHours() < 8) {
      fechaTurno.setDate(fechaTurno.getDate() - 1);
    }

    const fechaTexto = fechaTurno.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    document.getElementById("fecha").innerText = fechaTexto;

    const fechaBuscada = fechaTurno.toISOString().split("T")[0];

    const filaTurno = filas.find(f => f[0] === fechaBuscada);

    if (filaTurno) {
      document.getElementById("farmacia").innerText = filaTurno[1];

      document.getElementById("btn-maps").onclick = () => {
        window.open(filaTurno[2], "_blank");
      };

      document.getElementById("btn-wpp").onclick = () => {
        window.open(filaTurno[3], "_blank");
      };

    } else {
      document.getElementById("farmacia").innerText = "No hay turno cargado.";
    }

  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}

cargarTurno();
