import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

jest.mock("./firebase", () => ({ auth: {}, db: {} }));
jest.mock("firebase/auth", () => ({
  onAuthStateChanged: (_auth, rappel) => {
    rappel(null);
    return () => {};
  },
}));
jest.mock("firebase/database", () => ({}));

const rendu = (route = "/") =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
});

test("affiche les sections principales", () => {
  rendu();
  expect(screen.getByRole("heading", { name: "Regarde-Moi" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Billetterie" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Boutique" })).toBeInTheDocument();
});

test("ajoute un album au panier et met à jour le total", () => {
  rendu();
  fireEvent.click(screen.getAllByRole("button", { name: "Ajouter au panier" })[0]);
  fireEvent.click(screen.getByRole("button", { name: /Ouvrir le panier, 1 article/ }));
  const panier = screen.getByRole("dialog", { name: "Ton panier" });
  expect(within(panier).getByText("Édition standard")).toBeInTheDocument();
  fireEvent.click(within(panier).getByRole("button", { name: "Augmenter" }));
  expect(within(panier).getByText(/29,98/)).toBeInTheDocument();
});

test("réserve des billets pour une date choisie", () => {
  rendu();
  fireEvent.click(screen.getByRole("radio", { name: /Paris/ }));
  fireEvent.click(screen.getByRole("button", { name: /Réserver/ }));
  expect(screen.getByRole("button", { name: /Ouvrir le panier, 1 article/ })).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem("pdm-panier"))[0].nom).toBe("Billet Paris");
});
