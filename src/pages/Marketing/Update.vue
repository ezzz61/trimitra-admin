<template>
  <div>
    <b-container fluid>
      <b-row class="mt-5 justify-content-center">
        <b-col cols="6" md="6" class="my-1">
          <card>
            <div>
              <h4 class="text-center">Update Marketing</h4>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label="Nik :"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.nik"
                    type="number"
                    required
                    placeholder="enter marketing nik"
                  ></b-form-input>
                </b-form-group>

                <b-row>
                  <b-col>
                    <b-form-group
                      id="input-group-1"
                      label="Full Name :"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Event"
                        v-model="form.name"
                        type="text"
                        required
                        placeholder="enter full name"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                      id="input-group-1"
                      label="Tanggal Lahir :"
                      label-for="input-1"
                    >
                      <date-picker
                        v-model="form.ttl"
                        placeholder="18-06-1999"
                        format="DD-MM-YYYY"
                        valueType="format"
                        style="height: 40px"
                      ></date-picker>
                    </b-form-group>
                  </b-col>
                </b-row>

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
                  label="Whatsapp Number:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.no_whatsapp"
                    type="number"
                    required
                    placeholder="enter whatsapp number"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Marketing Address :"
                  label-for="input-1"
                >
                  <b-form-textarea
                    id="Event"
                    v-model="form.alamat"
                    type="text"
                    required
                    placeholder="enter marketing address"
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
import VueUploadMultipleImage from "vue-upload-multiple-image";
import marketingApi from "@/api/marketingApi";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import BaseUrl from "../../api/BaseUrl";

export default {
  components: {
    VueUploadMultipleImage,
    DatePicker,
  },
  data() {
    return {
      base: BaseUrl.baseURL,
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
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    async onSubmit() {
      this.isLoading = true;
      const formData = new FormData();
      if (this.file) {
        formData.append("image", this.file);
      }
      formData.append("nik", this.form.nik);
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("alamat", this.form.alamat);
      formData.append("no_whatsapp", this.form.no_whatsapp);
      formData.append("ttl", this.form.ttl);
      try {
        let res = await marketingApi.Update(this.$route.params.id, formData);
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
            path: "/admin/marketing",
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
      let getdetail = await marketingApi.Detail(this.$route.params.id);
      this.form = getdetail.data.data;
      if (getdetail.data.data.image) {
        this.url = `${this.base}/${getdetail.data.data.image}`;
      }
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
