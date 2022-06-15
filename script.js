"use strict";
const form = document.querySelector("form");
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
       <td>${entrace}</td>
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
        const placa = btn.id;
        const find = this.getVehicle().find((vehicle) => vehicle.placa === placa);
        if (find) {
            const time = this.CalculateTime(new Date().getTime() - new Date(find.entrace).getTime());
            if (!confirm(`O veiculo ${find.name} ficou ficou por ${time}. Deseja encerar?`))
                return;
            const newList = this.getVehicle().filter((vehicle) => vehicle.placa !== placa);
            localStorage.setItem("parking", JSON.stringify(newList));
            this.Render(newList);
        }
    }
    static CalculateTime(time) {
        const hr = Math.floor(time / 3600000);
        const min = Math.floor((time % 3600000) / 60000);
        return `${hr}horas e ${min}minutos`;
    }
}
Actions.Render(Actions.getVehicle());
