<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-5 justify-content-center">
        <b-col cols="8" md="8" class="my-1">
          <card>
            <div>
              <h4 class="text-center font-weight-bold">Edit News</h4>
              <b-alert :show="showError" variant="danger">{{
                messageError
              }}</b-alert>
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                  id="input-group-1"
                  label="Title:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="Article"
                    v-model="form.title"
                    type="text"
                    maxlength="100"
                    required
                    placeholder="input title"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label=" body:"
                  label-for="input-1"
                >
                  <ckeditor
                    tag-name="textarea"
                    v-model="form.body"
                    :config="editorConfig"
                  ></ckeditor>
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

                <b-form-group
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
                              path: '/admin/news',
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
import VueUploadMultipleImage from "vue-upload-multiple-image";
import newsApi from "@/api/newsApi";
import BaseUrl from "../../api/BaseUrl";

export default {
  components: {
    VueUploadMultipleImage,
  },
  data() {
    return {
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
      option_category: [
        { value: null, text: "Please select category", disabled: true },
      ],
      option_tag: [{ value: null, text: "Please select tag", disabled: true }],
      selected: null,

      base: BaseUrl.baseURL,
      url: null,
      angka: 2,
      file: null,
      form: {
        title: "",
        body: "",
        image: "",
        is_active: false,
      },
      isLoading: false,
      options: [],
      show: true,
      messageError: "",
      showError: false,
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    async onSubmit() {
      this.isLoading = true;
      try {
        const formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("is_active", this.form.is_active);
        formData.append("body", this.form.body);
        if (this.file) {
          formData.append("image", this.file);
        }
        let res = await newsApi.Update(this.$route.params.id, formData);
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
            path: "/admin/news",
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
  async created() {
    try {
      const newsDetails = await newsApi.Detail(this.$route.params.id);

      if (newsDetails.data.status === 200) {
        this.form = newsDetails.data.data;
        this.url = `${this.base}/${newsDetails.data.data.image}`;
      } else {
        this.$notify({
          message: "something went wrong",
          icon: "fa fa-times-circle",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger",
        });
      }
    } catch (error) {
      this.$notify({
        message: "something went wrong",
        icon: "fa fa-times-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger",
      });
    }
  },
};
</script>
