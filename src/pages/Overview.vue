<template>
  <div class="content">
    <div class="container-fluid">
      <!-- widget -->
      <div class="row">
        <!-- Product -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-bank text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Products</p>
              <h4 class="card-title">{{ data.product.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-single-copy-04 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Appointment</p>
              <h4 class="card-title">{{ data.appointment.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-single-02 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Marketing</p>
              <h4 class="card-title">{{ data.marketing.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-caps-small text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">News</p>
              <h4 class="card-title">{{ data.news.total }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>until now</div>
          </stats-card>
        </div>
      </div>

      <!-- calon siswa -->
      <div class="row">
        <div class="col-md-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Appointment Data</h4>
            </template>
            <l-table
              :data="data.appointment.data"
              :columns="[
                'Full Name',
                'Email',
                'No Wa',
                'appointment created',
                'status',
              ]"
            >
              <template slot-scope="{ row }">
                <td>
                  {{ row.name }}
                </td>
                <td>
                  {{ row.email }}
                </td>
                <td>
                  {{ row.no_whatsapp }}
                </td>
                <td>
                  {{ row.email }}
                </td>
                <td>
                  {{ row.status }}
                </td>
                <td class="text-muted">
                  {{
                    new Date(row.createdAt).getDate().toString() +
                    " " +
                    month_name[new Date(row.createdAt).getMonth()] +
                    " " +
                    new Date(row.createdAt).getFullYear().toString().substr(-2)
                  }}
                </td>
              </template>
            </l-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartCard from "src/components/Cards/ChartCard.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";
import Dashboard from "@/api/DashboardApi";

export default {
  components: {
    LTable,
    ChartCard,
    StatsCard,
  },
  data() {
    return {
      month_name: [
        "jan",
        "feb",
        "mar",
        "apr",
        "mei",
        "jun",
        "jul",
        "aug",
        "sept",
        "okt",
        "nov",
        "des",
      ],
      editTooltip: "Edit Task",
      deleteTooltip: "Remove",
      data: {
        product: { data: [], total: "" },
        appointment: { data: [], total: "" },
        marketing: { data: [], total: "" },
        news: { data: [], total: "" },
      },
      isLoading: false,
      tableData: {
        data: [
          {
            title:
              'Sign contract for "What are conference organizers afraid of?"',
            checked: false,
          },
          {
            title:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            checked: true,
          },
          {
            title:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            checked: true,
          },
          {
            title: "Create 4 Invisible User Experiences you Never Knew About",
            checked: false,
          },
          { title: 'Read "Following makes Medium better"', checked: false },
          { title: "Unfollow 5 enemies from twitter", checked: false },
        ],
      },
    };
  },
  async created() {
    try {
      this.isLoading = true;
      let res = await Dashboard.Get();

      if (res.data.data.status === 200) {
        console.log(res.data.data);
        const { appointment, marketing, news, product } = res.data.data.data;
        this.data.product = product;
        this.data.appointment = appointment;
        this.data.marketing = marketing;
        this.data.news = news;
      }
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.$notify({
        message: "somehting went wrong",
        icon: "fa  fa-exclamation-circle",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger",
      });
    }
  },
};
</script>
<style></style>
