<template>
  <div class="register">
    <div class="register-card">
      <div v-if="isLoading" class="loading">
      <font-awesome-icon icon="fa-circle-notch" class="fa-spin" />
      <h2> Chargement... </h2>
      </div>
      <div v-if="msg.info" class="notification">
      <button v-on:click="msg.info = null" class="close-modal">
          <font-awesome-icon icon="fa-solid fa-xmark" class="fa-xl"/>
        </button>
      {{ msg.info }}
    </div>
      <div class="title">
        <h2>S'enregistrer</h2>
      </div>
      <div class="form_group">
        <div class="form">
          <label for="user-name" class="form_label">Prénom</label>
          <input
            type="text"
            autocomplete="false"
            class="form_input"
            name="user-name"
            v-model="user.name"
          />
          <span class="error" v-if="msg.name">{{ msg.name }}</span>
        </div>
        <div class="form">
          <label for="user-surname" class="form_label">Nom</label>
          <input
            type="text"
            autocomplete="false"
            class="form_input"
            name="user-surname"
            v-model="user.surname"
          />
          <span class="error" v-if="msg.surname">{{ msg.surname }}</span>
        </div>
        <div class="form">
          <label for="user-email" class="form_label">Email</label>
          <input
            type="email"
            autocomplete="false"
            class="form_input"
            name="user-email"
            v-model="user.email"
          />
          <span class="error" v-if="msg.email">{{ msg.email }}</span>
        </div>
        <div class="form">
          <label for="user-password" class="form_label">Mot de passe</label>
          <input
            type="password"
            autocomplete="false"
            class="form_input"
            name="user-password"
            v-model="user.password"
          />
          <span class="error" v-if="msg.password">{{ msg.password }}</span>
        </div>
        <span style="color: rgb(204, 28, 28)" v-if="msg.error">{{
          msg.error
        }}</span>
      </div>

      <button class="validate-btn" v-on:click="addUser">Valider</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterPage",
  data() {
    return {
      user: {},
      isLoading: false,
      msg: [],
      url: process.env.VUE_APP_API_URL
    };
  },
  methods: {
    toggleLoading() {
      this.isLoading = !this.isLoading;
    },
    validateEmail() {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
        this.msg["email"] = "";
        return true;
      } else {
        this.msg["email"] = "Veuillez rentrer une email valide";
        return false;
      }
    },
    verifyInput() {
      if (
        this.user.name === undefined ||
        this.user.surname === undefined ||
        this.user.password === undefined
      ) {
        if (this.user.name === undefined) {
          this.msg["name"] = "Veuillez rentrer un prénom";
        }
        if (this.user.surname === undefined) {
          this.msg["surname"] = "Veuillez rentrer un nom";
        }
        if (this.user.password === undefined) {
          this.msg["password"] = "Veuillez rentrer un mot de passe";
        }
        this.isLoading = false;
        return false;
      } else {
        return true;
      }
    },
    userAlreadyExist() {
      axios
        .get(this.url + "/user_exist?email=" + this.user.email)
        .then((regInfo) => {
          this.regInfo = regInfo.data;
          if (!this.regInfo[0]) {
            return false;
          } else {
            this.isLoading = false;
            this.msg["error"] = "L'utilisateur existe déjà";
            return true;
          }
        })
        .catch((error) => console.error(error))
        .finally(() => (this.isLoading = false));
    },
    async addUser() {
      this.isLoading = true;
      const email = this.validateEmail();
      const result = this.verifyInput();
      const userExist = this.userAlreadyExist();
      if (result === true && email === true && userExist === false) {
        try {
          await axios.post(this.url + "/register", this.user);
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
          this.msg["info"] = "Utilisateur ajouté avec succès";
        }
      } else {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    if (localStorage.name != undefined) {
      this.$router.push({name: 'Home'});
    }
  }
};
</script>

<style scoped>
.register {
  font-family: "Poppins", sans-serif;
  height: calc(100vh - 70px);
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: inherit;
}

.register-card {
  width: 100%;
}

.title {
  color: #11998e;
}

.form_group {
  position: relative;
  padding: 15px 0 0;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.form {
  margin-top: 40px;
  margin-bottom: 10px;
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

.error {
  margin-top: 10px;
  color: rgb(173, 46, 46);
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

.form_label {
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #11998e;
  font-weight: 700;
}

.loading {
  top: 0;
  color: #11998e;
}

.validate-btn {
  margin-top: 50px;
  width: 130px;
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

.validate-btn {
  transition: all 0.3s ease;
}
.validate-btn:hover {
  box-shadow: -7px -7px 20px 0px #11998e, -4px -4px 5px 0px #11998e8f,
    7px 7px 20px 0px #11998e4b, 4px 4px 5px 0px #11998e25;
}

.notification {
  color: #11998e;
}
</style>
