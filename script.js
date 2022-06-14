"use strict";
const form = document.querySelector("form");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => {
    event.preventDefault();
    const dataCadastro = {
        name: "",
        placa: "",
        type: "",
        entrace: new Date(),
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
    console.log(dataCadastro);
});
