<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns">
            </paper-table>
            
          </div>
        </card>
      </div>
      

      <!-- <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                         :columns="table2.columns">

            </paper-table>
          </div>
        </card>
      </div> -->

    </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Id", "Name", "Summary"];
const tableData = [
  {
    id: 1,
    name: "Machine Learn",
    summary: "summary about this card",
  },
  {
    id: 2,
    name: "Fce detection",
    summary: "summary about face detect",
  },
  {
    id: 3,
    name: "Big Data",
    summary: "about big data",
  },
  {
    id: 4,
    name: "Spark",
    summary: "some about spark",
  },
  {
    id: 5,
    name: "Emotion recog.",
    summary: "get recognized",
  }
];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "Use Case Table",
        subTitle: "verify and delete use cases",
        columns: [...tableColumns],
        data: [...tableData]
      },
    //   table2: {
    //     title: "Table on Plain Background",
    //     subTitle: "Here is a subtitle for this table",
    //     columns: [...tableColumns],
    //     data: [...tableData]
    //   }
    };
  }
};
</script>
<style>
</style>
