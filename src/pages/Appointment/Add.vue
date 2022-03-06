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
                    type="string"
                    @keypress="onlyNumber"
                    maxlength="12"
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
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                    disabled-field="notEnabled"
                  ></b-form-select>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Product :"
                  label-for="input-1"
                >
                  <b-form-select
                    v-model="product"
                    :options="product_option"
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                    disabled-field="notEnabled"
                  ></b-form-select>
                </b-form-group>

                <b-row>
                  <b-col>
                    <b-form-group
                      id="input-group-1"
                      label="Appointment Date :"
                      label-for="input-1"
                    >
                      <datepicker
                        :placeholder="moment(new Date()).format('L')"
                        v-model="form.appointment_date"
                        name="uniquename"
                        :format="DatePickerFormat"
                        :open-date="new Date()"
                        :disabledDates="disabledDates"
                      >
                        ></datepicker
                      >
                    </b-form-group>
                  </b-col>
                </b-row>
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
import productApi from "@/api/productApi";
import "vue2-datepicker/index.css";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  components: {
    VueUploadMultipleImage,
    Datepicker,
  },
  data() {
    return {
      moment: moment,
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },
      DatePickerFormat: "dd/MM/yyyy",
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
      product: "",
      product_option: [],
      options_data: [],
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
    this.getProduct();
  },
  methods: {
    onlyNumber($event) {
      const keysAllowed = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
      ];
      const keyPressed = $event.key;
      if (!keysAllowed.includes(keyPressed)) {
        $event.preventDefault();
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
          // console.log(this.options);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getProduct() {
      try {
        const response = await productApi.Get();
        if (response.data.data.status === 200) {
          let data = [];
          response.data.data.data.map((product) => {
            data.push({ item: product._id, name: product.title });
          });

          this.product_option = data;
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
          product: this.product,
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
            path: "/admin/appointment",
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
