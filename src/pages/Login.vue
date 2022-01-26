<template>
  <div class="wrapper login bg-dark">
    <b-container>
      <b-row class="justify-content-center mt-5">
        <b-col md="4" class="text-center">
          <b-card-group deck>
            <b-card header-tag="header" footer="Welcome" footer-tag="footer">
              <b-alert
                v-if="error.length > 0"
                show
                variant="danger"
                dismissible
              >
                {{ error[0] }}
              </b-alert>
              <b-form @submit.prevent="onSubmit">
                <img
                  class="my-4"
                  src="../assets/logo.jpg"
                  width="100%"
                  alt=""
                />

                <b-form-group id="input-group-1" label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="text"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label-for="input-2">
                  <b-form-input
                    type="password"
                    id="input-2"
                    v-model="form.password"
                    required
                    placeholder="enter password"
                  ></b-form-input>
                </b-form-group>
                <b-button
                  class="btn-fill"
                  v-if="!isLoading"
                  type="submit"
                  variant="primary"
                  >Submit</b-button
                >
                <b-button
                  v-if="isLoading"
                  class="btn-fill"
                  disabled
                  variant="primary"
                  >loading...</b-button
                >
              </b-form>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Login from "@/api/UserApi";

export default {
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
      },
      isLoading: false,
      error: [],
      show: true,
    };
  },
  methods: {
    async onSubmit() {
      this.error = [];
      this.isLoading = true;
      try {
        let res = await Login.Login({
          email: this.form.email,
          password: this.form.password,
        });

        if (res.data.data.token) {
          try {
            var expired = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            let data_user = await this.$jwtDec.decode(res.data.data.token);
            if (data_user.role != "admin") {
              return this.error.push("Unautorize");
            }

            this.$cookie.set("token", res.data.data.token, {
              expires: expired,
            });
            this.$cookie.set("data_user", JSON.stringify(data_user), {
              expires: expired,
            });
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("data_user", JSON.stringify(data_user));
            this.$notify({
              message: "success login",
              icon: "fa fa-check-circle",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "success",
            });
            this.$router.push({ path: "/admin" });
          } catch (err) {
            console.log(err);
          }
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error.push(res.data.message);
        }
      } catch (error) {
        this.isLoading = false;
        this.error.push("something went wrong");
      }
    },
  },
  created() {
    let token = localStorage.getItem("token");
    let data = localStorage.getItem("data_user");

    if (token !== null && data !== null) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 90vh !important;
  padding-top: 10vh;
  background-color: #50483b !important;
}

.card {
  background-color: #f7f7f7 !important;
}
</style>