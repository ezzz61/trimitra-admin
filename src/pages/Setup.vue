<template>
  <section class="container h-screen pt-4">
    <b-tabs content-class="mt-3">
      <b-tab title="Home Top">
        <b-row class="mt-5">
          <b-col cols="6" md="6" class="my-1">
            <div>
              <b-form-group
                id="input-group-1"
                label="Home Title :"
                label-for="input-1"
              >
                <b-form-input
                  id="Event"
                  v-model="homeTitle"
                  type="text"
                  required
                  placeholder="DESIGNER HOMES IN A BEAUTIFUL AND"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Home Overview"
                label-for="input-1"
              >
                <b-form-textarea
                  id="Event"
                  v-model="homeOverview"
                  type="string"
                  required
                  placeholder="we offers you the best place"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group
                id="input-group-1"
                label="Banner Images"
                label-for="input-1"
              >
                <b-form-file
                  multiple
                  @change="onFileChangeHomeImage"
                  accept="image/*"
                  v-model="homeImage"
                  placeholder="choose image"
                  drop-placeholder="image only"
                ></b-form-file>
              </b-form-group>
              <p class="mt-4">Preview / Current Banner</p>
              <!-- preview Banner -->
              <div class="text-center mt-2" v-if="previewHomeImage">
                <b-row class="">
                  <b-col class="mt-4" cols="8">
                    <img
                      style="width: 100%; height: 100%"
                      :src="previewHomeImage"
                      alt=""
                    />
                  </b-col>
                </b-row>
              </div>

              <p v-else>No Images</p>

              <b-btn @click="saveHome" class="btn-primary mt-4">SAVE</b-btn>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Banner">
        <div>
          <b-form-group
            id="input-group-1"
            label="Home Title :"
            label-for="input-1"
          >
            <b-form-input
              id="Event"
              v-model="bannerTitle"
              type="text"
              required
              placeholder="Our Best product"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Banner overview"
            label-for="input-1"
          >
            <b-form-textarea
              id="Event"
              v-model="bannerOverview"
              type="string"
              required
              placeholder="we offers you the best place"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Banner Images"
            label-for="input-1"
          >
            <b-form-file
              multiple
              @change="onFileChangeBanner"
              accept="image/*"
              v-model="bannerImages"
              placeholder="choose image"
              drop-placeholder="image only"
            ></b-form-file>
          </b-form-group>
          <span class="mt-4">Preview / Current Banner</span>
          <!-- preview Banner -->
          <div class="text-center mt-2" v-if="bannerPreviewImage">
            <b-row class="">
              <b-col
                class="mt-4"
                cols="3"
                v-for="(banner, index) in bannerPreviewImage"
                :key="index"
              >
                <img
                  style="width: 100%; height: 100%"
                  :src="banner.data"
                  alt=""
                />
              </b-col>
            </b-row>
          </div>

          <b-btn @click="saveBanners" class="btn-primary mt-4">SAVE</b-btn>
        </div>
      </b-tab>
      <b-tab title="Video Url">
        <div>
          <b-form-group
            id="input-group-1"
            label="Video Url"
            label-for="input-1"
          >
            <b-form-input
              id="Event"
              v-model="urls.url"
              type="text"
              required
              placeholder="https://youtube..."
            ></b-form-input>
          </b-form-group>

          <b-form-checkbox v-model="urls.isActive" switch size="md">{{
            urls.isActive ? "Active" : "Unactive"
          }}</b-form-checkbox>

          <b-btn @click="saveUrl" class="btn-primary mt-4">SAVE</b-btn>
        </div>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import bannerApi from "../api/BannerApi";
import homeApi from "../api/homeApi";
import BaseUrl from "../api/BaseUrl";

export default {
  data() {
    return {
      baseUrl: BaseUrl.baseURL,
      bannerPreviewImage: [],
      bannerImages: [],
      bannerTitle: "",
      bannerOverview: "",
      homeImage: null,
      previewHomeImage: null,
      homeTitle: "",
      homeOverview: "",
      urls: {
        url: "",
        isActive: true,
      },
    };
  },
  async mounted() {
    await this.getBanners();
    await this.getHome();
    await this.getUrl();
  },
  methods: {
    onFileChangeBanner(e) {
      const files = [...e.target.files];
      let urls = [];

      files.map((file) => {
        urls.push({
          data: URL.createObjectURL(file),
        });
      });

      this.bannerPreviewImage = urls;
    },

    async saveBanners() {
      try {
        const isUpdateImages = await bannerApi.Get();
        const formData = new FormData();
        if (this.bannerImages) {
          for (var i = 0; i < this.bannerImages.length; i++) {
            formData.append("images", this.bannerImages[i]);
          }
        }
        formData.append("title", this.bannerTitle);
        formData.append("body", this.bannerOverview);

        if (
          isUpdateImages.data.data.status === 200 &&
          isUpdateImages.data.data.data &&
          isUpdateImages.data.data.data.images.length
        ) {
          const response = await bannerApi.Update(
            isUpdateImages.data.data.data._id,
            formData
          );

          if (response.data.status === 200) {
            this.$notify({
              message: "Banners Updated!",
              icon: "fa fa-check-circle",
              horizontalAlign: "right",
              verticalAlign: "top",
              type: "success",
            });
          }
        } else {
          const response = await bannerApi.Add(formData);
          if (response.data.status === 200) {
            this.$notify({
              message: "New Banners Saved!",
              icon: "fa fa-check-circle",
              horizontalAlign: "right",
              verticalAlign: "top",
              type: "success",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getBanners() {
      try {
        const response = await bannerApi.Get();
        if (
          response.data.data.status === 200 &&
          response.data.data.data.images.length
        ) {
          const { images, title, body } = response.data.data.data;
          let imagesUrl = [];

          images.map((img) => {
            imagesUrl.push({ data: `${this.baseUrl}/${img.data}` });
          });

          this.bannerTitle = title;
          this.bannerOverview = body;
          this.bannerPreviewImage = imagesUrl;
        } else {
          this.$notify({
            message: "Something went wrong while fetch Banners!",
            icon: "fa fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "failed",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    onFileChangeHomeImage(e) {
      const files = e.target.files;
      const url = URL.createObjectURL(files[0]);

      this.previewHomeImage = url;
    },

    async saveHome() {
      try {
        const isUpdateImage = await homeApi.Get();
        const formData = new FormData();

        console.log(isUpdateImage);

        if (this.homeImage) {
          formData.append("image", this.homeImage[0]);
        }
        formData.append("title", this.homeTitle);
        formData.append("body", this.homeOverview);

        if (
          isUpdateImage.data.data.status === 200 &&
          isUpdateImage.data.data.data
        ) {
          const response = await homeApi.Update(
            isUpdateImage.data.data.data._id,
            formData
          );

          if (response.data.status === 200) {
            this.$notify({
              message: "Content Updated!",
              icon: "fa fa-check-circle",
              horizontalAlign: "right",
              verticalAlign: "top",
              type: "success",
            });
          }
        } else {
          const response = await homeApi.Add(formData);
          if (response.data.status === 200) {
            this.$notify({
              message: "New Home Content Saved!",
              icon: "fa fa-check-circle",
              horizontalAlign: "right",
              verticalAlign: "top",
              type: "success",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getHome() {
      try {
        const response = await homeApi.Get();

        if (
          response.data.data.status === 200 &&
          response.data.data.data.image
        ) {
          const { title, body, image } = response.data.data.data;
          let imagesUrl = `${this.baseUrl}/${image}`;

          this.homeTitle = title;
          this.homeOverview = body;
          this.previewHomeImage = imagesUrl;
        } else {
          this.$notify({
            message: "Something went wrong while fetch Banners!",
            icon: "fa fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "failed",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async saveUrl() {
      try {
        const isUrls = await homeApi.GetUrl();

        if (isUrls.data.data.status === 200 && isUrls.data.data.data !== null) {
          const response = await homeApi.UpdateUrl(
            isUrls.data.data.data._id,
            this.urls
          );

          if (response.data.status === 200) {
            this.$notify({
              message: "Url Updated!",
              icon: "fa fa-check-circle",
              horizontalAlign: "right",
              verticalAlign: "top",
              type: "success",
            });
          }
        } else {
          const response = await homeApi.AddUrl(this.urls);
          if (response.data.status === 200) {
            this.$notify({
              message: "New Url Saved!",
              icon: "fa fa-check-circle",
              horizontalAlign: "right",
              verticalAlign: "top",
              type: "success",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUrl() {
      try {
        const response = await homeApi.GetUrl();

        if (
          response.data.data.status === 200 &&
          response.data.data.data !== null
        ) {
          this.urls = {
            url: response.data.data.data.url,
            isActive: response.data.data.data.isActive,
          };
        } else {
          this.$notify({
            message: "Something went wrong while fetch Banners!",
            icon: "fa fa-check-circle",
            horizontalAlign: "right",
            verticalAlign: "top",
            type: "failed",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.h-screen {
  min-height: 100vh;
}
</style>