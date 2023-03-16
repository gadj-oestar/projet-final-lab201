import { async } from "@firebase/util";
import {
  getDatabase,
  ref,
  get,
  update,
  set,
  child,
  remove,
  push,
} from "firebase/database";
import { useState } from "react";

// const DataBase = () => {
export const db = getDatabase();

const AddData = () => {
  const [salle, setSalle] = useState("");
  const [ville, setVille] = useState("");
  const [date, setDate] = useState("");
  const [calendrier, setCalendrier] = useState("");

  const onValide = async (e) => {
    e.preventDefault();
    const dataRef = ref(db, "concert/");
    const newDataRef = push(dataRef);
    set(newDataRef, {
      ville: ville,
      date: date,
      salle: salle,
      calendrier: calendrier,
    });
    console.log("sucess");
  };

  const selection = (e) => {
    e.preventDefault();
    const dbrefe = ref(db);
    get(child(dbrefe, "concert/")).then((snapshot) => {
      if (snapshot.exists()) {
        ville = snapshot.val().ville;
        date = snapshot.val().date;
        salle = snapshot.val().salle;
        calendrier = snapshot.val().calendrier;
      }
      console.log(ville);
      console.log(date);
    });

    console.log(ville);
    console.log(date);
  };
  const updating = async () => {
    await update(ref(db, "concert/"), {
      ville: ville,
      date: date,
      salle: salle,
      calendrier: calendrier,
    });
    console.log("succes");
  };

  const removing = async () => {
    await remove(ref(db, "concert/"), {
      ville: ville,
      date: date,
      salle: salle,
    });

    console.log("sucess");
  };

  return (
    <div>
      <section>
        <h1> selection de jour de la date</h1>
        <form onSubmit={onValide} className="validation">
          <input
            type="date"
            onChange={(e) => {
              setCalendrier(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="ville"
            onChange={(e) => {
              setVille(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="salle"
            onChange={(e) => {
              setSalle(e.target.value);
            }}
          />
          <button> validez pour envoyez envoyer dans la database</button>
          <button onClick={removing}> supprimez</button>
          <button onClick={selection}> selectionnez</button>
          <button onClick={updating}>mettre à jour</button>
        </form>
      </section>
    </div>
  );

  // console.log(ville);
  // console.log(date);
};
export default AddData;
