import { ACCESS_TOKEN, PASSWORD, URL_SERVER, USERNAME } from '../config'
import { MessageBuilder } from '../shared/message-side'

const messageBuilder = new MessageBuilder()

// // Simulating an asynchronous network request using Promise
// const mockAPI = async () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         body: {
//           data: {
//             text: 'HELLO ZEPPOS'
//           }
//         }
//       })
//     }, 1000)
//   })
// }

const fetchData = async (ctx) => {
  try {
    // Requesting network data using the fetch API
    // The sample program is for simulation only and does not request real network data, so it is commented here
    // Example of a GET method request
    // const { body: { data = {} } = {} } = await fetch({
    //   url: 'https://xxx.com/api/xxx',
    //   method: 'GET'
    // })
    const data = await fetch({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET'
    })
    // Example of a POST method request
    // const { body: { data = {} } = {} } = await fetch({
    //   url: 'https://xxx.com/api/xxx',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     text: 'Hello Zepp OS'
    //   })
    // })

    // A network request is simulated here
    // const { body: { data = {} } = {} } = await mockAPI()

    ctx.response({
      data: { result: data },
    })

  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}

const apiLogin = async (ctx) => {
  try {
    const data = await fetch({
      url: URL_SERVER + '/api/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userinfo_id: USERNAME,
        password: PASSWORD,
      })
    })

    if (data.status == 200) {
      const token = data.body.token
      // Save token
    }

    ctx.response({
      data: { result: data },
    })
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}

const apiPresensiList = async (ctx) => {
  
  try {
    const data = await fetch({
      url: URL_SERVER + '/api/checkin-today',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + ACCESS_TOKEN,
      }
    })

    const data_json = data.body
    // const data_json = JSON.parse(data.body)
    let i = 0
    let data_send = []

    if (data_json.status) {
      // Token failed
      ctx.response({
        data: { result: 'TOKEN_FAILED' },
      })
    } else {
      data_json.forEach(val => {
        console.log(val);
        if (Object.keys(data_send).length < 10 && (Object.keys(data_send).length < 1 || data_send[Object.keys(data_send).length - 1].tanggal != val.tgl)) {
          if (val.checktype == "Masuk") {
            data_send.push({
              tanggal: val.tgl,
              time_1: val.checktime.slice(11),
              time_4: ""
            })
          } else if (val.checktype == "Pulang") {
            data_send.push({
              tanggal: val.tgl,
              time_1: "",
              time_4: val.checktime.slice(11),
            })
          }
        } else {
          if (data_send[Object.keys(data_send).length - 1].tanggal == val.tgl) {
            if (val.checktype == "Masuk") {
              data_send[Object.keys(data_send).length - 1].time_1 = val.checktime.slice(11)
            } else if (val.checktype == "Pulang") {
              data_send[Object.keys(data_send).length - 1].time_4 = val.checktime.slice(11)
            }
          }
        }
        i++
      });

      ctx.response({
        data: {
          result: {
            body: data_send,
            status: data.status
          }
        },
      })
    }


  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}

AppSideService({
  onInit() {
    console.log("AppSideService onInit")
    messageBuilder.listen(() => { })
    messageBuilder.on('request', (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      switch (jsonRpc.method) {
        case 'GET_DATA':
          return fetchData(ctx);
        case 'POST_LOGIN':
          return apiLogin(ctx)
        case 'GET_PRESENSI_LIST':
          return apiPresensiList(ctx)
      }
    })
  },

  onRun() {
    console.log("AppSideService onRun")
  },

  onDestroy() {
    console.log("AppSideService onDestroy")
  }
})