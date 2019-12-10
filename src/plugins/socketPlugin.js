import Vue from "vue";
import io from "socket.io-client";

const socket = io("https://dkzam-backend.herokuapp.com/");

const SocketPlugin = {
  install(vue) {
    vue.mixin({});

    // vue.prototype.$sendMessage = $payload => {
    //   socket.emit("processMessage", {
    //     msg: $payload.msg,
    //     name: $payload.name,
    //     userId: $payload.userId
    //   });
    // };

    // 인스턴스 메소드 추가
    vue.prototype.$socket = socket;
  }
};

Vue.use(SocketPlugin);
