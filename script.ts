const form: HTMLFormElement | null = document.querySelector("form");

interface vehicle {
  name: string;
  placa: string;
  type: string;
  entrace: Date;
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const dataCadastro: vehicle = {
    name: "",
    placa: "",
    type: "",
    entrace: new Date(),
  };
  const inputs = event.target as HTMLFormElement;

  for (let i = 0; i < inputs?.length; i++) {
    const { name, value } = inputs[i] as HTMLInputElement;
    if (name) {
      name === "name"
        ? (dataCadastro.name = value)
        : name === "type"
        ? (dataCadastro.type = value)
        : (dataCadastro.placa = value);
    }
  }
  Actions.AddVehicle(dataCadastro);
});

class Actions {
  static AddVehicle(vehicle: vehicle) {
    const listVehicles = this.getVehicle();
    const update = [...listVehicles, vehicle];
    localStorage.setItem("parking", JSON.stringify(update));

    this.Render(update);
  }
  static getVehicle() {
    return localStorage.parking ? JSON.parse(localStorage.parking) : [];
  }
  static Render(vehicles: vehicle[]) {
    const tbody: HTMLElement | null = document.getElementById("vehicles");
    tbody!.innerHTML = "";

    vehicles.map((vehicle) => {
      const { name, placa, entrace, type } = vehicle;
      const row = document.createElement("tr");

      row.innerHTML = `
       <td>${name}</td>
       <td>${placa}</td>
       <td>${type}</td>
       <td>${entrace}</td>
       <td>
          <button class='delete' id=${placa}>X</button>
       </td>
    `;
      tbody?.appendChild(row);
    });
  }
  static Delete() {}
}
