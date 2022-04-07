import { Doughnut } from "vue-chartjs";

export default {
    extends: Doughnut,
    props: ["doughnutData", "doughnutOptions"],
    mounted() {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderChart(this.doughnutData, this.doughnutOptions);
    }
};
