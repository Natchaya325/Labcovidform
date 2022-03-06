<template>
  <div class="container">
    <h1>Covid-19</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="20"
              label="Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="tel"
              :rules="telRules"
              :counter="10"
              label="Phone number"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="items" label="ATK" dense v-model="atk"></v-select>
          </v-col>

          <div class="col">
            <div class="mb-3">
              <label for="startDate" class="form-label">Date</label>
              <input
                id="startDate"
                class="form-control"
                type="date"
                v-model="date"
                required
              />
            </div>
          </div>
        </v-row>
      </v-container>

      <v-btn elevation="2" large @click="addData" color="pink">Add</v-btn>
    </v-form>
    <h1>ตารางรายชื่อผู้บันทึกข้อมูล Covid-19</h1>
    <div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">ATK</th>
              <th scope="col">Phone number</th>
              <th scope="col">E-mail</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in csDoc" :key="i" align="center">
              <td>{{ i + 1 }}</td>
              <td>{{ item.data.sdate }}</td>
              <td>{{ item.data.sname }}</td>
              <td>{{ item.data.satk }}</td>
              <td>{{ item.data.stel }}</td>
              <td>{{ item.data.semail }}</td>
              <td>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="red"
                  @click="Del(item.id)"
                >
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>
<script type="text/javascript">
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../plugins/firebaseInit";
export default {
  data() {
    return {
      csDoc: [],
      name: "",
      email: "",
      atk: "",
      tel: "",
      date: "",
      items: ["+", "-"],
    };
  },
  beforeMount() {
    this.readData();
  },
  methods: {
    async addData() {
      try {
        this.csDoc = [];
        const docRef = await addDoc(collection(db, "userdata"), {
          sname: this.name,
          semail: this.email,
          satk: this.atk,
          stel: this.tel,
          sdate: this.date,
        });
        this.name = "";
        this.email = "";
        this.atk = "";
        this.tel = "";
        this.date = "";
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    readData() {
      this.csDoc = [];
      const q = query(collection(db, "userdata"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.csDoc.push({ id: doc.id, data: doc.data() });
        });
      });
    },
    async Del(id) {
      this.csDoc = [];
      console.log("Delete" + id);
      try {
        await deleteDoc(doc(db, "userdata", id));
        window.location.reload(false);
      } catch (e) {
        console.log("delete" + e);
      }
    },
  },
};
</script>