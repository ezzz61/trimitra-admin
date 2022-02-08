<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="6" md="6" class="my-1">
          <card>
            <div>
              <h4 class="text-center">Add Feature</h4>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label="Title :"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="enter title"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="body:"
                  label-for="input-1"
                >
                  <b-form-textarea
                    id="Event"
                    v-model="form.body"
                    type="string"
                    required
                    placeholder="we offers you the best place"
                  ></b-form-textarea>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="image"
                  label-for="input-1"
                >
                  <b-form-file
                    @change="onFileChange"
                    accept="image/*"
                    v-model="file"
                    placeholder="choose image"
                    drop-placeholder="image only"
                  ></b-form-file>
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
import featureApi from "../../api/featureApi";
import baseUrl from "../../api/BaseUrl";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import VueUploadMultipleImage from "vue-upload-multiple-image";

export default {
  components: {
    VueUploadMultipleImage,
    DatePicker,
  },
  data() {
    return {
      base: baseUrl.baseURL,
      url: null,
      file: null,
      form: {},
      isLoading: false,
      show: true,
      messageError: "",
      showError: false,
    };
  },
  async mounted() {
    await this.getFeatureDetails();
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    async onSubmit() {
      this.isLoading = true;

      const formData = new FormData();
      if (this.file) {
        formData.append("icon", this.file);
      }
      formData.append("title", this.form.title);
      formData.append("body", this.form.body);

      try {
        let res = await featureApi.Update(this.$route.params.id, formData);

        if (res.data.status === 200) {
          this.success = true;
          this.$notify({
            message: "success",
            icon: "fa fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success",
          });
          this.$router.push({
            path: "/admin/features",
          });
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.showError = true;
          this.messageError = res.data.data;
          this.$notify({
            message: res.data.data,
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
    async getFeatureDetails() {
      try {
        const response = await featureApi.Detail(this.$route.params.id);
        if (response.data.status === 200) {
          this.url = `${this.base}/${response.data.data.icon}`;
          this.form = response.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
