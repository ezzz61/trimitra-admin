<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="8" md="8" class="my-1">
          <card>
            <div>
              <h4 class="text-center font-weight-bold">Add Product</h4>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label="Title:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Article"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="input title"
                  ></b-form-input>
                </b-form-group>

                <b-row>
                  <b-col>
                    <b-form-group
                      id="input-group-1"
                      label="Bed Room"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.bed_room"
                        type="text"
                        required
                        placeholder="ex: 2"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                      id="input-group-1"
                      label="Bath Room"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.bath_room"
                        type="text"
                        required
                        placeholder="Ex: 2"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                      id="input-group-1"
                      label="Building Area"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.building_area"
                        type="text"
                        required
                        placeholder="Ex: 125"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                      id="input-group-1"
                      label="Carport"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="Article"
                        v-model="form.carport"
                        type="text"
                        required
                        placeholder="Ex: 1"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-form-group
                  id="input-group-1"
                  label="Maps Url"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Article"
                    v-model="form.maps"
                    type="text"
                    required
                    placeholder="google maps url"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Description"
                  label-for="input-1"
                >
                  <ckeditor
                    tag-name="textarea"
                    v-model="form.description"
                    :config="editorConfig"
                  ></ckeditor>
                </b-form-group>

                <b-row class="my-4">
                  <b-col class="text-danger">
                    <i
                      v-b-tooltip.hover
                      title="If you want to remove image or add image you need to
                    re-upload"
                      class="nc-icon nc-bulb-63"
                    ></i>
                    Hover this icon
                  </b-col>
                </b-row>

                <b-form-group
                  id="input-group-1"
                  label="image"
                  label-for="input-1"
                >
                  <b-form-file
                    multiple
                    @change="onFileChange"
                    accept="image/*"
                    v-model="files"
                    placeholder="choose image"
                    drop-placeholder="image only"
                  ></b-form-file>
                </b-form-group>

                <div class="text-center" v-if="urls">
                  <b-row>
                    <b-col cols="4" v-for="(url, index) in urls" :key="index">
                      <img
                        :src="url.url"
                        style="width: 100%"
                        height="300px"
                        alt="preview image"
                      />
                    </b-col>
                  </b-row>
                </div>

                <b-form-group
                  class="mt-2"
                  id="input-group-1"
                  label="Status:"
                  label-for="input-1"
                >
                  <b-form-checkbox v-model="form.is_active" switch size="md">{{
                    form.is_active ? "Active" : "Unactive"
                  }}</b-form-checkbox>
                </b-form-group>

                <b-row class="justify-content-center">
                  <b-col class="text-center">
                    <b-col class="text-center">
                      <div v-if="!isLoading">
                        <b-button
                          class="mr-1"
                          type="reset"
                          variant="danger"
                          @click="
                            $router.push({
                              path: '/admin/product',
                            })
                          "
                          >{{
                            this.form.status != "new" ? "back" : "cancel"
                          }}</b-button
                        >
                        <b-button
                          class="btn-fill"
                          type="submit"
                          variant="primary"
                          >save</b-button
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
import productApi from "@/api/productApi";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import BaseUrl from "../../api/BaseUrl";

export default {
  components: {
    VueUploadMultipleImage,
  },
  data() {
    return {
      baseurl: BaseUrl,
      editorConfig: {
        contentsCss:
          "https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400;1,500&family=Kiwi+Maru:wght@300;400;500&display=swap",
        font_names:
          "Arial/Arial, Helvetica, sans-serif;" +
          "Comic Sans MS/Comic Sans MS, cursive;" +
          "Courier New/Courier New, Courier, monospace;" +
          "Georgia/Georgia, serif;" +
          "Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;" +
          "Tahoma/Tahoma, Geneva, sans-serif;" +
          "Times New Roman/Times New Roman, Times, serif;" +
          "Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;" +
          "Verdana/Verdana, Geneva, sans-serif;" +
          "Kiwi_maru/Kiwi maru;" +
          "Karla/Karla",
        extraPlugins: "uploadimage,colorbutton, font,uicolor,colordialog ",
        filebrowserUploadUrl: "https://api.niagaplay.com/UploadStatic",
        colorButton_colors:
          "707070,121212,1D4B98,e06040,419f5a,79aacb,ffd44f,f5ede0",
        colorButton_enableMore: true,
      },
      urls: [],
      files: [],
      form: {
        title: "",
        description: "",
        bed_room: "",
        bath_room: "",
        building_area: "",
        carport: "",
        is_active: false,
        maps: "",
      },
      isLoading: false,
      show: true,
      messageError: "",
      showError: false,
    };
  },
  methods: {
    onFileChange(e) {
      const files = [...e.target.files];
      let urls = [];

      files.map((file) => {
        urls.push({
          url: URL.createObjectURL(file),
        });
      });

      this.urls = urls;
    },
    async onSubmit(evt) {
      evt.preventDefault();
      this.isLoading = true;

      try {
        const formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("description", this.form.description);
        formData.append("bed_room", this.form.bed_room);
        formData.append("bath_room", this.form.bath_room);
        formData.append("building_area", this.form.building_area);
        formData.append("carport", this.form.carport);
        formData.append("maps", this.form.maps);
        formData.append("is_active", this.form.is_active);

        if (this.files) {
          for (var i = 0; i < this.files.length; i++) {
            formData.append("images", this.files[i]);
          }
        }

        let res = await productApi.Update(this.$route.params.id, formData);
        console.log(res);
        if (res.data.status === 200) {
          this.success = true;
          this.$notify({
            message: "News Created!",
            icon: "fa fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "success",
          });
          this.$router.push({
            path: "/admin/product",
          });
          this.isLoading = false;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
    async getProductDetails() {
      try {
        const response = await productApi.Detail(this.$route.params.id);
        if (response.data.status === 200) {
          this.form = response.data.data;
          if (response.data.data.images.length) {
            let embedImagePath = [];
            response.data.data.images.map((image) => {
              embedImagePath.push({
                url: `${this.baseurl.baseURL}/${image.data}`,
              });
            });

            this.urls = embedImagePath;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    this.getProductDetails();
  },
};
</script>
