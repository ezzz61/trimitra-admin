<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row class="mt-5 justify-content-center">
        <b-col cols="6" md="6" class="my-1">
          <card>
            <div>
              <h1 class="text-center">Add User</h1>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label=" email*:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.email"
                    type="text"
                    required
                    placeholder=" email ex: andimalaran@mail.com"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label=" password*:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.password"
                    type="password"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="username:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.username"
                    type="text"
                    required
                    placeholder="full name , ex: doni wihaya"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Role*:"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="form.role"
                    :options="['admin', 'user']"
                    size="l"
                    class="mt-2"
                  ></b-form-select>
                </b-form-group>

                <div class="text-center" v-if="url">
                  <img
                    :src="url"
                    width="300"
                    height="300"
                    alt="preview image"
                  />
                </div>
                <b-row class="justify-content-center">
                  <b-col class="text-center">
                    <b-col class="text-center">
                      <div v-if="!isLoading">
                        <b-button
                          class="mr-1"
                          type="reset"
                          variant="danger"
                          @click="$router.go(-1)"
                          >cancel</b-button
                        >
                        <b-button type="submit" variant="primary"
                          >Submit</b-button
                        >
                      </div>
                      <div v-if="isLoading">
                        <b-button disabled variant="primary"
                          >loading...</b-button
                        >
                      </div>
                    </b-col>
                  </b-col>
                </b-row>
              </b-form>
            </div>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import VueUploadMultipleImage from "vue-upload-multiple-image";
import User from "@/api/UserApi";

export default {
  components: {
    VueUploadMultipleImage,
  },
  data() {
    return {
      options_floor: [{ value: null, text: "Please select an floor" }],
      options_category: [{ value: null, text: "Please select an floor" }],
      selected: null,
      arr_criteria: [
        {
          name: "input criteria name ex: Gaji",
          point: 100,
          type: null,
        },
      ],
      options_data: [
        { value: null, text: "Please select type", disabled: true },
        { value: "up", text: "Upper is Better" },
        { value: "down", text: "Lower is Better" },
      ],
      images: [],
      allImage: [],

      angka: 2,
      form: {
        name: "",
        content: null,
        start_date: null,
        end_time: null,
      },
      isLoading: false,
      options: [],
      show: true,
      messageError: "",
      showError: false,
      file: null,
      url: null,
    };
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      let data = this.form;
      try {
        let res = await User.Update(this.$route.params.id, data);
        if (res.data.success) {
          this.success = true;
          this.$notify({
            message: "success",
            icon: "fa fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success",
          });
          this.$router.push({
            path: "/admin/user",
          });
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.showError = true;
          this.messageError = res.data.message;
          this.$notify({
            message: res.data.message,
            icon: "fa fa-times-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "danger",
          });
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
  async created() {
    try {
      let getdetail = await User.Detail(this.$route.params.id);
      this.form = getdetail.data.data;
    } catch (error) {
      console.log(error);
      this.$notify({
        message: "failed get data from backend",
        icon: "fa fa-times-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger",
      });
    }

    // console.log(vendor_data[0]._id);
    // this.items = res.data.data;
  },
};
</script>
