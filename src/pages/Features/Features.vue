<template>
  <b-container fluid>
    <notifications> </notifications>

    <b-row class="mt-5">
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select
              v-model="sortBy"
              id="sortBySelect"
              :options="sortOptions"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6" class="my-1">
        <div class="row justify-content-center">
          <div class="col-6">
            <button
              class="btn btn-icon btn-primary btn-fill"
              @click="$router.push({ name: 'Features_add' })"
            >
              Add Features
            </button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button class="btn btn-secondary" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <div class="row justify-content-center">
      <div class="col-12">
        <card
          class="strpied-tabled-with-hover"
          body-classes="table-full-width table-responsive"
        >
          <LoadingTable v-if="isLoading" />
          <b-table
            v-if="!isLoading"
            show-empty
            class="ml-2"
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
          >
            <!-- <template v-slot:cell(category)="row">
              {{ row.item.category_id[0].name }}
            </template> -->
            <!-- <template v-slot:cell(floor)="row">
              {{ row.item.floor_id[0].name }}
            </template> -->
            <template #cell(actions)="row">
              <button
                class="btn btn-icon btn-info mx-1"
                @click="
                  $router.push({
                    name: 'Features_update',
                    params: { id: row.item._id },
                  })
                "
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                class="btn btn-icon btn-danger mx-1"
                @click="info(row.item, row.index, $event.target)"
              >
                <i class="fa fa-trash"></i>
              </button>
            </template>
          </b-table>
        </card>
      </div>
    </div>
    <div class="row justify-content-between">
      <b-col sm="5" md="3" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </div>
    <!-- Info modal -->
    <b-modal
      @ok="handleOk(infoModal.content)"
      :id="infoModal.id"
      :title="'Delete ' + infoModal.name"
      @hide="resetInfoModal"
    >
      <pre>
are you sure want to delete <strong>{{ infoModal.title }} </strong>from Features list ?</pre>
    </b-modal>
  </b-container>
</template>

<script>
import Card from "src/components/Cards/Card.vue";
import LoadingTable from "src/components/LoadingTable.vue";
import featureApi from "../../api/featureApi";
import baseUrl from "../../api/BaseUrl";

export default {
  components: {
    Card,
    LoadingTable,
  },
  data() {
    return {
      success: false,
      items: [],
      baseUrl: baseUrl.baseURL,
      isLoading: false,
      failed: false,
      type: ["success", "danger"],
      notifications: {
        topCenter: false,
      },

      fields: [
        {
          key: "title",
          label: "Feature Title",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "createdAt",
          label: "Bergabung Pada",
          sortable: true,
          sortDirection: "desc",
        },

        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    notifyVue() {
      const notification = {
        template: `<span>Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.</span>`,
      };
      this.$notify({
        message: "success",
        icon: "fa fa-check-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "success",
      });
    },
    async handleOk(id) {
      this.success = false;
      this.failed = false;

      try {
        let res = await featureApi.Delete(id);
        if (res.data.status === 200) {
          this.success = true;
          this.notifyVue();
          this.loadStart();
        } else {
          this.failed = true;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
    handleEdit(row) {
      alert(`You want to edit row with id: ${row.item._id}`);
    },
    handleDelete(row) {
      alert(`You want to delete row with id: ${row.item._id}`);
    },
    info(item, index, button) {
      this.infoModal.title = `${item.email}`;
      this.infoModal.content = item._id;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async loadStart() {
      try {
        this.isLoading = true;
        let res = await featureApi.Get();
        const feature = res.data.data.data;
        this.items = feature;
        this.totalRows = this.items.length;
        this.isLoading = false;
      } catch (error) {
        this.$notify({
          message: "failed get data from server",
          icon: "fa fa-times",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "danger",
        });
        console.log(error);
      }
    },
  },
  created() {
    this.loadStart();
  },
};
</script>
<style lang="scss">
.vue-notifyjs.notifications {
  .alert {
    z-index: 100;
  }
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
