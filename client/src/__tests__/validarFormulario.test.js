
import { validarFormulario } from "../utils/FormUtils";
const USERNAME_VALIDO = "user";
const USERNAME_VACIO = "";
const USERNAME_BLANCO = "    ";
const PASS_VALIDO = "pass";
const PASS_VACIO = "";
const PASS_BLANCO = "    ";

describe("#validarFormulario", () => {

  it("Devuelve False si no se rellena ningún campo", () => {
    expect(validarFormulario()).toBeFalsy();
  });
  it("Devuelve False si no se rellena ningún campo", () => {
    expect(validarFormulario(USERNAME_VACIO,PASS_VACIO)).toBeFalsy();
  });
  it("Devuelve False si alguno de los campos es todo espacios", () => {
    expect(validarFormulario(USERNAME_BLANCO,PASS_BLANCO)).toBeFalsy();
  });
  it("Devuelve True si se rellenan todos los campo", () => {
    expect(validarFormulario(USERNAME_VALIDO,PASS_VALIDO)).toBeTruthy();
  });

  it("Devuelve False si no se rellenan todos los campos", () => {
    expect(validarFormulario(USERNAME_VACIO,PASS_VALIDO)).toBeFalsy();
  });
  it("Devuelve False si el campo usuario es todo espacios en blanco", () => {
    expect(validarFormulario(USERNAME_BLANCO,PASS_VALIDO)).toBeFalsy();
  });
  it("Devuelve False si cualquiera de los campos están vacíos o son todo espacios en blanco", () => {
    expect(validarFormulario(USERNAME_VACIO,PASS_BLANCO)).toBeFalsy();
  });
  it("Devuelve False si la password es todo blancos", () => {
    expect(validarFormulario(USERNAME_VALIDO,PASS_BLANCO)).toBeFalsy();
  });
  it("Devuelve False si la password está vacía", () => {
    expect(validarFormulario(USERNAME_BLANCO,PASS_VACIO)).toBeFalsy();
  });
  it("Devuelve False si el campo password está vacio", () => {
    expect(validarFormulario(USERNAME_VALIDO,PASS_VACIO)).toBeFalsy();
  });
});
