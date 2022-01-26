<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-grid-45"></i>
        <p>Home</p>
      </sidebar-link>

      <sidebar-link to="/admin/news">
        <i class="nc-icon nc-caps-small"></i>
        <p>News</p>
      </sidebar-link>

      <sidebar-link to="/admin/appointment">
        <i class="nc-icon nc-notes"></i>
        <p>Appointment</p>
      </sidebar-link>

      <sidebar-link to="/admin/product">
        <i class="nc-icon nc-bank"></i>
        <p>Product</p>
      </sidebar-link>

      <sidebar-link to="/admin/marketing">
        <i class="nc-icon nc-single-02"></i>
        <p>Marketing</p>
      </sidebar-link>

      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-single-02"></i>
        <p>User</p>
      </sidebar-link>

      <sidebar-link to="/admin/setup">
        <i class="nc-icon nc-settings-gear-64"></i>
        <p>Setup</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar :name="name"></top-navbar>

      <dashboard-content @click="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu.vue";
export default {
  data() {
    return {
      name: "",
      role: "",
      data: null,
    };
  },
  created() {
    let data = JSON.parse(localStorage.getItem("data_user"));
    // this.data = data;
    // if (localStorage.getItem("data_user") && localStorage.getItem("token")) {
    //   if (token !== null && data.role == "admin") {
    //     this.role = "admin";
    //   } else if (token !== null && data.role == "super admin") {
    //     this.role = "super admin";
    //   }
    // } else {
    //   this.$router.push({ path: "/login" });
    // }

    // if (data.username === null) {
    //   this.$notify({
    //     message: "please login again",
    //     icon: "fa fa-sign-in-alt",
    //     horizontalAlign: "right",
    //     verticalAlign: "top",
    //     type: "warning"
    //   });

    //   this.$router.push({ path: "/login" });
    // }
    this.name = data.email;
  },

  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
