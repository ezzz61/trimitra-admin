<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      Welcome back
      <span class="font-weight-bold mx-1 mb-"> {{ " " + name }}!</span>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <!-- <li class="nav-item">
            <button
              @click="$router.push({ path: '/admin/user' })"
              class="btn btn-secondary btn-simple"
            >
              Account
            </button>
          </li> -->
          <li class="nav-item">
            <button @click="handlelogout" class="btn btn-primary">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    name: String
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  methods: {
    handlelogout() {
      this.$cookie.delete("token");
      this.$cookie.delete("data_user");
      localStorage.removeItem("token");
      localStorage.removeItem("data_user");

      this.$router.push({ path: "/login" });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }
  }
};
</script>
<style></style>
