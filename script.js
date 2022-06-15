"use strict";
var _a, _b;
const form = document.querySelector("form");
const modal = document.getElementById("delete");
const modalInfo = document.getElementById("info");
const btnClose = (_a = document
    .querySelector(".close")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    modal === null || modal === void 0 ? void 0 : modal.classList.add("not-modal");
    modal === null || modal === void 0 ? void 0 : modal.classList.remove("modal-delete");
});
const btnInfo = (_b = document
    .getElementById("close-info")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    modalInfo === null || modalInfo === void 0 ? void 0 : modalInfo.classList.add("not-modal");
    modalInfo === null || modalInfo === void 0 ? void 0 : modalInfo.classList.remove("modal-info");
});
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => {
    event.preventDefault();
    const dataCadastro = {
        name: "",
        placa: "",
        type: "",
        entrace: new Date().toISOString(),
    };
    const inputs = event.target;
    for (let i = 0; i < (inputs === null || inputs === void 0 ? void 0 : inputs.length); i++) {
        const { name, value } = inputs[i];
        if (name) {
            name === "name"
                ? (dataCadastro.name = value)
                : name === "type"
                    ? (dataCadastro.type = value)
                    : (dataCadastro.placa = value);
        }
    }
    const placaIsRegister = Actions.getVehicle().some((vehicle) => vehicle.placa === dataCadastro.placa);
    if (placaIsRegister) {
        modalInfo === null || modalInfo === void 0 ? void 0 : modalInfo.classList.add("modal-info");
        modalInfo === null || modalInfo === void 0 ? void 0 : modalInfo.classList.remove("not-modal");
        return;
    }
    Actions.AddVehicle(dataCadastro);
});
class Actions {
    static AddVehicle(vehicle) {
        const listVehicles = this.getVehicle();
        const update = [...listVehicles, vehicle];
        localStorage.setItem("parking", JSON.stringify(update));
        this.Render(update);
    }
    static getVehicle() {
        return localStorage.parking ? JSON.parse(localStorage.parking) : [];
    }
    static Render(vehicles) {
        const tbody = document.getElementById("vehicles");
        tbody.innerHTML = "";
        vehicles.map((vehicle) => {
            var _a;
            const { name, placa, entrace, type } = vehicle;
            const row = document.createElement("tr");
            row.innerHTML = `
       <td>${name}</td>
       <td>${placa}</td>
       <td>${type}</td>
       <td>${new Date(entrace).getHours()}hrs e ${new Date(entrace).getMinutes()}min</td>
       <td>
          <button class='delete' id=${placa}>X</button>
       </td>
    `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
                const btn = e.target;
                this.Delete(btn);
            });
            tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(row);
        });
    }
    static Delete(btn) {
        var _a;
        const placa = btn.id;
        const find = this.getVehicle().find((vehicle) => vehicle.placa === placa);
        if (find) {
            const time = this.CalculateTime(new Date().getTime() - new Date(find.entrace).getTime());
            modal === null || modal === void 0 ? void 0 : modal.classList.add("modal-delete");
            modal === null || modal === void 0 ? void 0 : modal.classList.remove("not-modal");
            const h3 = document.getElementById("text-info");
            h3.innerText = "";
            h3.innerText = `O veiculo ${find.name} ficou ficou por ${time}. Deseja encerar?`;
            const btnDelete = (_a = document
                .getElementById("btn-delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                const newList = this.getVehicle().filter((vehicle) => vehicle.placa !== placa);
                localStorage.setItem("parking", JSON.stringify(newList));
                this.Render(newList);
                modal === null || modal === void 0 ? void 0 : modal.classList.add("not-modal");
                modal === null || modal === void 0 ? void 0 : modal.classList.remove("modal-delete");
            });
        }
    }
    static CalculateTime(time) {
        const hr = Math.floor(time / 3600000);
        const min = Math.floor((time % 3600000) / 60000);
        return `${hr}horas e ${min}minutos`;
    }
}
Actions.Render(Actions.getVehicle());
