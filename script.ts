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
  console.log(dataCadastro);
});

class Actions {
  static AddVehicle() {}
  static Render() {}
  static Delete() {}
}
