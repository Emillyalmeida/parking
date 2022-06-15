const form: HTMLFormElement | null = document.querySelector("form");
const modal = document.getElementById("delete");
const modalInfo = document.getElementById("info");

interface vehicle {
  name: string;
  placa: string;
  type: string;
  entrace: Date | string;
}

const btnClose = document
  .querySelector(".close")
  ?.addEventListener("click", () => {
    modal?.classList.add("not-modal");
    modal?.classList.remove("modal-delete");
  });

const btnInfo = document
  .getElementById("close-info")
  ?.addEventListener("click", () => {
    modalInfo?.classList.add("not-modal");
    modalInfo?.classList.remove("modal-info");
  });

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
  const placaIsRegister = Actions.getVehicle().some(
    (vehicle) => vehicle.placa === dataCadastro.placa
  );

  if (placaIsRegister) {
    modalInfo?.classList.add("modal-info");
    modalInfo?.classList.remove("not-modal");
    return;
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
       <td>${new Date(entrace).getHours()}hrs e ${new Date(
        entrace
      ).getMinutes()}min</td>
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
      modal?.classList.add("modal-delete");
      modal?.classList.remove("not-modal");
      const h3 = document.getElementById("text-info");

      h3!.innerText = "";
      h3!.innerText = `O veiculo ${find.name} ficou ficou por ${time}. Deseja encerar?`;

      const btnDelete = document
        .getElementById("btn-delete")
        ?.addEventListener("click", () => {
          const newList = this.getVehicle().filter(
            (vehicle) => vehicle.placa !== placa
          );
          localStorage.setItem("parking", JSON.stringify(newList));
          this.Render(newList);
          modal?.classList.add("not-modal");
          modal?.classList.remove("modal-delete");
        });
    }
  }

  static CalculateTime(time: number) {
    const hr = Math.floor(time / 3600000);
    const min = Math.floor((time % 3600000) / 60000);
    return `${hr}horas e ${min}minutos`;
  }
}

Actions.Render(Actions.getVehicle());
