<template>
  <div class="login">
    <div class="login-card">
      <div class="title">
        <h2>Se connecter</h2>
      </div>
      <div class="form_group">
        <div class="form">
          <label for="user-surname" class="form_label">Email</label>
          <input
            type="email"
            autocomplete="false"
            class="form_input"
            name="user-email"
            v-model="user.email"
          />
          <span class="error" v-if="msg.email"
            >{{msg.email}}</span
          >
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
          <span class="error" v-if="msg.password"
            >{{msg.password}}</span
          >
        </div>
        <span class="error" v-if="msg.conn"
            >{{msg.conn}}</span
          >
      </div>
      <button class="validate-btn" v-on:click="logUser">Valider</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {},
      isLoading: false,
      msg: [],
      logInfo: {}
    };
  },
  methods: {
    validateEmail() {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
      this.msg['email'] = '';
        
    } else {
        this.msg['email'] = 'Veuillez rentrer une email valide';
    }
    },
  async logUser() {
      this.validateEmail();
      this.isLoading = true;
      if (
        this.user.email == null ||
        this.user.password == null
      ) {
        if (this.user.email == null) {
          this.msg['email'] = 'Veuillez rentrer une email';
          this.isLoading = false;
        }
        if (this.user.password == null) {
          this.msg['password'] = 'Veuillez rentrer un mot de passe';
          this.isLoading = false;
        }
      } else {
      axios
        .get("/login?email=" + this.user.email + "&password=" + this.user.password)
        .then((logInfo) => {
          this.logInfo = logInfo.data;
          if (this.logInfo[0] == null) {
            this.msg['conn'] = 'Compte utilisateur introuvable ou mot de passe incorrect'
          } else {
            localStorage.name = this.logInfo[0].name;
            localStorage.surname = this.logInfo[0].surname;
            this.$router.push({name: 'Home'});
          }
        })
        .catch((error) => console.error(error))
        .finally(() => (this.isLoading = false));
      }
  }
  },
  mounted() {
    if (localStorage.name != undefined) {
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style scoped>

.login {
  font-family: "Poppins", sans-serif;
  height: calc(100vh - 70px);
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: inherit;
}

.login-card {
  width: 100%;
}

.error {
  margin-top: 10px;
  color: rgb(173, 46, 46);
}

.title {
  margin-top: 20px;
  color: #11998e;
}

.form_group {
  position: relative;
  padding: 15px 0 0;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  height: 310px;
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

.form_input::placeholder {
  color: transparent;
}

.form_label {
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: gray;
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
</style>