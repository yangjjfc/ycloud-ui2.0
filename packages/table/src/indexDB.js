/*
 * @Author: yangjj
 * @Date: 2020-02-05 14:02:23
 * @LastEditors  : yangjj
 * @LastEditTime : 2020-02-05 20:35:14
 * @Description: file content
 */
const DATABASE = 'table_set';
const VERSION = 1;
const DATABASETABLE = 'table';
export default {
  data () {
    return {
      db: {},
      isGetData: false // 是否能查到数据
    };
  },
  methods: {
    // 创建数据库
    initIndexDB () {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexDB; // webkit是chrome
        }
        let request = indexedDB.open(DATABASE, VERSION);
        request.onerror = (event) => {
          console.log('打开数据库失败:' + event.target);
        };
        request.onsuccess = (event) => {
          // console.log('打开数据库成功!');
          this.db = event.target.result;
          if (this.db) {
            this.getDataDB().then(_ => {
              resolve();
            });
          }
        };
        request.onupgradeneeded = function (event) {
          console.log('版本变化！');
          this.db = event.target.result;
          if (!this.db.objectStoreNames.contains(DATABASETABLE)) {
            this.db.createObjectStore(DATABASETABLE, {
              keyPath: 'id',
              autoIncrement: true
            });
          }
        };
      });
    },
    // 创建事务
    createTransaction () {
      return this.db.transaction(DATABASETABLE, 'readwrite').objectStore(DATABASETABLE);
    },
    // 查
    getDataDB () {
      return new Promise(resolve => {
        let objectStore = this.createTransaction();
        let request = objectStore.get(this.pageKey);
        request.onsuccess = (e) => {
          let result = e.target.result;
          if (result) {
            this.isGetData = true; // 判断是否到获取数据
            this.storeConfig = result;
            this.getConfig(result);
          }
          resolve();
        };
        request.onerror = function (e) {
          console.log('数据检索失败！');
        };
      });
    },
    // 增
    addDataDB (config) {
      let objectStore = this.createTransaction();
      objectStore.add(config);
      objectStore.onsuccess = function (event) {
        // console.log('数据写入成功');
      };
      objectStore.onerror = function (event) {
        console.log('数据写入失败');
      };
    },
    // 改
    updateDataDB: function (config) {
      let objectStore = this.createTransaction();
      objectStore.put(config);
      objectStore.onsuccess = function (event) {
        // console.log('数据更新成功');
      };
      objectStore.onerror = function (event) {
        console.log('数据更新失败');
      };
    },
    // 删
    removeDataDB: function (userId) {
      let objectStore = this.createTransaction();
      objectStore.delete(this.pageKey);
      objectStore.onsuccess = function (event) {
        console.log('删除成功');
      };
    }
  }
};
