<template>
  <div class="cat-main">
    <div v-if="isLoading" class="loading">
      <font-awesome-icon icon="fa-circle-notch" class="fa-spin" />
      <h2>Chargement...</h2>
    </div>
    <div v-if="msg.info" class="notification">
      <button v-on:click="msg.info = null" class="close-modal">
        <font-awesome-icon icon="fa-solid fa-xmark" class="fa-xl" />
      </button>
      {{ msg.info }}
    </div>
    <div class="user">
      <div class="name">
        Bonjour {{ localStorage.name }} {{ localStorage.surname }}
      </div>
      <div v-on:click="disconnectUser()" class="deco">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="fa-xl" />
      </div>
    </div>
    <div v-if="showModalAdd" class="add-modal">
      <div class="add-card">
        <h2 class="add-title">Ajouter un chat</h2>
        <div class="add-body">
          <div class="form">
            <label for="cat-race" class="form_label">Race</label>
            <input
              type="text"
              autocomplete="false"
              maxlength="50"
              name="cat-race"
              v-model="addcat.race"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-color" class="form_label">Couleurs</label>
            <input
              type="text"
              name="cat-color"
              maxlength="255"
              autocomplete="false"
              v-model="addcat.color"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-life" class="form_label">Durée de vie</label>
            <input
              type="number"
              name="cat-life"
              v-model="addcat.life"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-origin" class="form_label">Origines</label>
            <input
              type="text"
              name="cat-origin"
              maxlength="255"
              autocomplete="false"
              v-model="addcat.origin"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-stat" class="form_label">Caractéristiques</label>
            <input
              type="text"
              autocomplete="false"
              name="cat-stat"
              maxlength="255"
              v-model="addcat.stat"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-img" class="form_label">Url de l'image</label>
            <input
              type="text"
              autocomplete="false"
              maxlength="255"
              name="cat-img"
              v-model="addcat.img"
              class="form_input"
            />
          </div>
        </div>
        <span v-if="msg.alreadyExist" class="error-msg">{{
          msg.alreadyExist
        }}</span>
        <span v-if="msg.emptyInput" class="error-msg">{{
          msg.emptyInput
        }}</span>
        <div class="add-footer">
          <button id="btn" v-on:click="addCat()" class="add-btn">
            Valider
          </button>
          <button id="btn" v-on:click="closeModalAdd()" class="add-btn">
            <span>Annuler</span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="showModalEdit" class="add-modal">
      <div class="add-card">
        <h2 class="add-title">Modifier un chat</h2>
        <div class="add-body">
          <div class="form">
            <label for="cat-race" class="form_label">Race</label>
            <input
              type="text"
              autocomplete="false"
              maxlength="50"
              name="cat-race"
              v-model="editcat.race"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-color" class="form_label">Couleurs</label>
            <input
              type="text"
              name="cat-color"
              maxlength="255"
              autocomplete="false"
              v-model="editcat.color"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-life" class="form_label">Durée de vie</label>
            <input
              type="number"
              name="cat-life"
              v-model="editcat.life"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-origin" class="form_label">Origines</label>
            <input
              type="text"
              name="cat-origin"
              maxlength="255"
              autocomplete="false"
              v-model="editcat.origin"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-stat" class="form_label">Caractéristiques</label>
            <input
              type="text"
              autocomplete="false"
              name="cat-stat"
              maxlength="255"
              v-model="editcat.stat"
              class="form_input"
            />
          </div>
          <div class="form">
            <label for="cat-img" class="form_label">Url de l'image</label>
            <input
              type="text"
              autocomplete="false"
              maxlength="255"
              name="cat-img"
              v-model="editcat.img"
              class="form_input"
            />
          </div>
        </div>
        <span v-if="msg.emptyInput" class="error-msg">{{
          msg.emptyInput
        }}</span>
        <div class="add-footer">
          <button id="btn" v-on:click="modifyCat()" class="add-btn">
            Modifier
          </button>
          <button id="btn" v-on:click="closeModalEdit()" class="add-btn">
            <span>Annuler</span>
          </button>
        </div>
      </div>
    </div>
    <div class="header">
      <h2>API for Cats</h2>
      <button id="btn" v-on:click="showModalAdd = true" class="add-btn">
        Ajouter un chat
      </button>
    </div>
    <div class="ascenseur">
      <h1 class="error" v-if="msg.nocat">{{ msg.nocat }}</h1>
      <!-- pour le scroll -->
      <div class="cat-card" v-for="cat in cats" :key="cat.id_cat">
        <img class="cat-img" :src="cat.img" />
        <div class="col">
          <span class="cat-race"><b>Race:</b> {{ cat.race }}</span>
          <span class="cat-color"><b>Couleurs:</b> {{ cat.color }}</span>
          <span class="cat-life"><b>Durée de vie:</b> {{ cat.life }} ans</span>
        </div>
        <div class="col">
          <span class="cat-origin"><b>Origines:</b> {{ cat.origin }}</span>
          <span class="cat-stat"><b>Caractéristiques:</b> {{ cat.stat }}</span>
        </div>
        <div class="div-btn">
          <button
            v-on:click="
              (showModalEdit = true),
                (editcat = {
                  id: cat.id_cat,
                  img: cat.img,
                  race: cat.race,
                  color: cat.color,
                  life: cat.life,
                  origin: cat.origin,
                  stat: cat.stat,
                })
            "
            id="btn"
            class="edit-btn"
          >
            <font-awesome-icon icon="fa-solid fa-pen" />
          </button>
          <button
            v-on:click="deleteCat(cat.id_cat)"
            id="btn"
            class="delete-btn"
          >
            <font-awesome-icon class="icon" icon="fa-solid fa-dumpster" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CatMain",
  data() {
    return {
      cats: {},
      addcat: {},
      editcat: {},
      isLoading: false,
      showModalAdd: false,
      showModalEdit: false,
      localStorage: localStorage,
      msg: [],
    };
  },
  methods: {
    toggleLoading() {
      this.isLoading = !this.isLoading;
    },
    closeModalAdd() {
      this.showModalAdd = false;
      this.addcat = {};
      this.msg = [];
    },
    closeModalEdit() {
      this.showModalEdit = false;
      this.addcat = {};
      this.msg = [];
    },
    loadCat() {
      if (this.localStorage.name === undefined) {
        this.$router.push({ name: "Login" });
      }
      this.isLoading = true;
      axios
        .get("/cat")
        .then((cats) => {
          this.cats = cats.data;
          if (this.cats[0] === undefined) {
            this.msg["nocat"] = "Aucun chat disponible en base !";
          } else {
            this.msg["nocat"] = "";
          }
        })
        .catch((error) => console.error(error))
        .finally(() => (this.isLoading = false));
    },
    deleteCat(id_cat) {
      this.isLoading = true;
      try {
        axios.delete("/delete", { data: { id: id_cat } });
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      } finally {
        this.isLoading = false;
        this.loadCat();
      }
    },
    verifyInput() {
      if (
        this.addcat.race === undefined ||
        this.addcat.color === undefined ||
        this.addcat.life === undefined ||
        this.addcat.origin === undefined ||
        this.addcat.stat === undefined ||
        this.addcat.img === undefined
      ) {
        this.msg["emptyInput"] = "Veuillez remplir tout les champs";
        this.isLoading = false;
        return false;
      } else {
        return true;
      }
    },
    verifyInputEdit() {
      if (
        this.editcat.race === undefined ||
        this.editcat.color === undefined ||
        this.editcat.life === undefined ||
        this.editcat.origin === undefined ||
        this.editcat.stat === undefined ||
        this.editcat.img === undefined
      ) {
        this.msg["emptyInput"] = "Veuillez remplir tout les champs";
        this.isLoading = false;
        return false;
      } else {
        return true;
      }
    },
    async addCat() {
      this.isLoading = true;
      const result = this.verifyInput();
      if (result === true) {
        await axios
          .get("/cat_from_race", { params: { race: this.addcat.race } })
          .then((catFound) => {
            if (!catFound.data[0]) {
              try {
                axios.post("/add_cat", this.addcat);
              } catch (error) {
                console.error(error);
              } finally {
                this.msg["info"] = "Chat ajouté avec succès";
                this.showModalAdd = false;
                this.isLoading = false;
                this.loadCat();
              }
            } else {
              this.isLoading = false;
              this.msg = [];
              this.msg["alreadyExist"] =
                "Le chat que vous essayez d'ajouter existe déjà";
            }
          });
      }
    },
    async modifyCat() {
      this.isLoading = true;
      const result = this.verifyInputEdit();
      if (result === true) {
        try {
          await axios.put("/edit_cat", { data: this.editcat });
        } catch (error) {
          this.isLoading = false;
          console.error(error);
        } finally {
          this.isLoading = false;
          this.showModalEdit = false;
          this.msg["info"] = "Chat modifié avec succès";
          this.loadCat();
        }
      }
    },
    disconnectUser() {
      localStorage.removeItem('name');
      localStorage.removeItem('surname');
      this.loadCat();
    }
  },
  mounted() {
    this.loadCat();
  },
};
</script>

<style>
#app {
  height: inherit;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 40px;
  text-align: initial;
  margin-top: 10px;
  margin-bottom: 10px;
}

.header {
  height: 185px;
}

#btn {
  width: 150px;
  height: 40px;
  padding: 10px 25px;
  border: 2px solid #11998e;
  color: #11998e;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

#btn + .icon {
  transition: all 0.3s ease;
}

#btn:hover {
  box-shadow: -7px -7px 12px 0px #11998e, -4px -4px 5px 0px #11998e8f,
    7px 7px 12px 0px #11998e4b, 4px 4px 5px 0px #11998e25;
}

.delete-btn {
  width: auto !important;
  padding: 12px 12px !important;
  margin-top: 10px;
  margin-right: 10px;
}

.delete-btn:hover > .icon {
  color: #8f1a16 !important;
}

.delete-btn:hover {
  border: 2px solid #8f1a16 !important;
  box-shadow: none !important;
}

.cat-main {
  color: #11998e;
  display: flex;
  flex-direction: column;
  height: 90%;
  justify-content: flex-start;
}

.error-msg {
  color: rgb(204, 28, 28);
}

.ascenseur {
  overflow-y: auto;
  overflow-x: hidden;
}

.cat-card {
  display: flex;
  justify-content: space-between;
  border: 2px solid #11998e;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.cat-img {
  width: 16%;
}

.div-btn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

body {
  margin: 0;
  height: 100vh;
}

.main {
  height: 100vh;
}

.edit-btn {
  margin: 10px;
  padding: 12px 12px !important;
  width: auto !important;
  box-shadow: none !important;
}

.edit-btn:hover {
  color: #11998e8f !important;
  border-color: #11998e8f !important;
}

.add-modal {
  background-color: rgba(153, 153, 160, 0.7);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  left: 0;
  z-index: 10;
}

.add-card {
  z-index: 1000;
  background: #222222;
  border-radius: 0.5em;
  box-shadow: 0 10px 20px rgb(71, 69, 69);
  opacity: 1;
  width: 700px;
  height: 700px;
  max-height: 100%;
}

.add-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 70%;
}

.add-footer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-left: 50px;
  margin-right: 50px;
  height: 15%;
}

.form_label {
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #11998e;
  font-weight: 700;
}

.form_input {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid gray;
  outline: 0;
  font-size: 1.3rem;
  color: white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.add-title {
  margin-top: 40px;
}

.form_input::placeholder {
  color: transparent;
}

.form_input:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #11998e, #38ef7d);
  border-image-slice: 1;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"] {
  text-align: center;
}

.fa-spin {
  height: 100px;
}

.loading {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  left: 0;
  background-color: rgba(105, 105, 117, 0.8);
  z-index: 10000000;
}

.notification {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 10px 20px rgb(26 25 25 / 72%);
  border-radius: 7px;
  width: auto;
  height: 60px;
  margin: 34px;
  padding: 8px;
  padding-left: 20px;
  padding-right: 20px;
  font-style: oblique;
}

.close-modal {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #11998e;
  position: absolute;
  top: 0;
  right: 0;
  margin: 3px;
}

.user {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  /* margin-bottom: 150px; */
}

.deco:hover {
  cursor: pointer;
}
</style>