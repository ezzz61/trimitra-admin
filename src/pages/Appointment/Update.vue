<template>
  <div>
    <b-container fluid>
      <b-row class="mt-5 justify-content-center">
        <b-col cols="6" md="6" class="my-1">
          <card>
            <div>
              <h4 class="text-center">Add Appointment</h4>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label="Customer Name :"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="customer name"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="NO WA"
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
                  label="email :"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Event"
                    v-model="form.email"
                    type="text"
                    required
                    placeholder="enter email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Marketing Name:"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="selected"
                    :options="options"
                    :value="marketingName"
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                  >
                  </b-form-select>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Appointment Status :"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="selected_status"
                    :options="options_status"
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                    disabled-field="notEnabled"
                  ></b-form-select>
                </b-form-group>

                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Appointment Date :"
                    label-for="input-1"
                  >
                    <date-picker
                      v-model="form.appointment_date"
                      placeholder="18-06-1999"
                      format="DD-MM-YYYY"
                      valueType="format"
                      style="height: 40px"
                    ></date-picker>
                  </b-form-group>
                </b-col>

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
import appointmentApi from "@/api/appointmentApi";
import marketingApi from "@/api/marketingApi";
import "vue2-datepicker/index.css";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import DatePicker from "vue2-datepicker";

export default {
  components: {
    VueUploadMultipleImage,
    DatePicker,
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
      options_data: [],
      options_status: [
        { name: "success", item: "success" },
        { name: "pending", item: "pending" },
        { name: "failed", item: "failed" },
      ],
      marketingName: "",
      selected_status: null,
      images: [],
      allImage: [],
      url: null,
      file: null,
      angka: 2,
      form: {},
      selected: null,
      isLoading: false,
      options: [],
      show: true,
      messageError: "",
      showError: false,
    };
  },
  async mounted() {
    this.getMarketing();
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const response = await appointmentApi.Detail(this.$route.params.id);
        if (response.data.status === 200) {
          this.form = response.data.data;
          const marketing_name = this.options.filter(
            (marketing) => marketing.item === response.data.data.marketing_name
          );

          const appointment_status = this.options_status.filter(
            (status) => status.item === response.data.data.status
          );

          this.selected = marketing_name[0];
          console.log(this.selected);

          this.marketingName = this.selected.name;
          console.log(this.marketingName);
          this.selected_status = appointment_status[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getMarketing() {
      try {
        const response = await marketingApi.Get();
        if (response.data.data.status === 200) {
          let data = [];
          response.data.data.data.map((marketing) => {
            data.push({ item: marketing._id, name: marketing.name });
          });

          this.options = data;
          console.log(this.options);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onSubmit() {
      this.isLoading = true;
      let data = this.form;
      try {
        let res = await appointmentApi.Add({
          ...data,
          marketing_name: this.selected,
        });
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
            path: "/admin/user",
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
  },
};
</script>
