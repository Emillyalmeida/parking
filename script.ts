const form: HTMLFormElement | null = document.querySelector("form");

interface vehicle {
  name: string;
  placa: string;
  type: string;
  entrace: Date | string;
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const dataCadastro: vehicle = {
    name: "",
    placa: "",
    type: "",
    entrace: new Date().toISOString(),
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

  static getVehicle(): vehicle[] {
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
      row.querySelector(".delete")?.addEventListener("click", (e) => {
        const btn = e.target as HTMLButtonElement;
        this.Delete(btn);
      });
      tbody?.appendChild(row);
    });
  }
  static Delete(btn: HTMLButtonElement) {
    const placa = btn.id;

    const find = this.getVehicle().find((vehicle) => vehicle.placa === placa);

    if (find) {
      const time = this.CalculateTime(
        new Date().getTime() - new Date(find!.entrace).getTime()
      );

      if (
        !confirm(
          `O veiculo ${find.name} ficou ficou por ${time}. Deseja encerar?`
        )
      )
        return;

      const newList = this.getVehicle().filter(
        (vehicle) => vehicle.placa !== placa
      );
      localStorage.setItem("parking", JSON.stringify(newList));
      this.Render(newList);
    }
  }

  static CalculateTime(time: number) {
    const hr = Math.floor(time / 3600000);
    const min = Math.floor((time % 3600000) / 60000);
    return `${hr}horas e ${min}minutos`;
  }
}

Actions.Render(Actions.getVehicle());
