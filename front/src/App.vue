<template>
<div class="main">
  <nav v-if="this.$route.path == '/' || this.$route.path == '/reg'">
    <router-link to="/">Login</router-link> |
    <router-link to="/reg">Register</router-link>
  </nav>
  <router-view/>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background-image: linear-gradient(to right, #11998e, #38ef7d);
}

.main {
    background-color: #222222;
    height: 750px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 80%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
