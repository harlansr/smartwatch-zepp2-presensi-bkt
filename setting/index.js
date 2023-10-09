import { gettext } from 'i18n'
import { ACCESS_TOKEN, URL_SERVER } from '../config'
// const { messageBuilder} = getApp()._options.globalData

AppSettingsPage({
    state: {
        username: '',
        password: '',
        access_token: null,
        name:'',
        email:'',
        photo:'http://devpresensi.bukittinggikota.go.id/logo/avatar-male.jpg',
        props: {},
    },
    
    handleLogout(){
        this.state.props.settingsStorage.setItem('access_token', '')
        this.state.name = ''
        this.state.email = ''
    },
    async getUserInfo(){
        const data = await fetch(URL_SERVER + '/api/user',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+this.state.access_token
            },
        })
        if(data.status == 200){
            const response = await data.json()
            if(response.status){
                console.log('Response Error:',response.status)
            }else{
                this.state.name = response.name
                this.state.email = response.userinfo_id
                this.state.photo = (response.photo)?'http://devpresensi.bukittinggikota.go.id/storage/foto-profil/'+response.photo:'http://devpresensi.bukittinggikota.go.id/logo/avatar-male.jpg'
                this.state.props.settingsStorage.setItem('username',response.userinfo_id)
            }
            return
        }
        this.handleLogout()
    },
    async setState(props) {
        // const username = props.settingsStorage?.getItem('username')||''

        this.state.props = props
        this.state.username = props.settingsStorage?.getItem('username')||''
        // this.state.name = 'Harlan Setia R'
        // this.state.email = 'harlan@gmail.com'
        this.state.access_token = props.settingsStorage?.getItem('access_token')||''
        if(this.state.access_token && !this.state.name){
            this.getUserInfo()
        }
    },
    handleUsernameChange(val){
        this.state.username = val
        this.state.props.settingsStorage.setItem('username',val)
    },
    handlePasswordChange(val){
        this.state.password = val
    },
    

    async handleLogin(){
        console.log("Login:", this.state.username)
        // const data = await fetch(URL_SERVER + '/api/user');
        const data = await fetch(URL_SERVER + '/api/login',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userinfo_id: this.state.username,
              password: this.state.password,
            })
        })
        if(data.status == 200){
            const response = await data.json()
            // this.state.props.settingsStorage.setItem('username', response.data.token)
            this.state.props.settingsStorage.setItem('access_token', response.token)
            this.state.password = ''
        }
        console.log("Login Result", data.status)
        // this.state.props.settingsStorage.setItem('access_token', data.body.token)
    },
    
    build(props) {
        console.log("Open Setting")
        this.setState(props)

        const loginInfoText = Text({
            style:{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            },
            align: 'center'
        },'Silakan masukkan informasi login Anda');

        const viewProfile = View(
            {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }
            },[
                Image({
                    style:{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',

                        height: '100px',
                        width: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginBottom:'15px',
                    },
                    src: this.state.photo
                }),
                Text({
                    style:{
                        
                    },
                    align: 'center',
                    bold:'true',
                },this.state.name),
                Text({
                    style:{

                    },
                    align: 'center'
                },this.state.email),
                Button({
                    label: 'Logout',
                    style: {
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',

                        fontSize: '12px',
                        borderRadius: '8px',
                        width:'150px',
                        marginTop: '20px',
                        // background: '#D85E33',
                        // background:'#00000000',
                        // color: 'white',
                        borderWidth: 'thin',
                        borderColor: '#3944bc'
                    },
                    onClick: () => {
                        this.handleLogout()
                        // this.deleteTodoList(index)
                    },
                }),
                
            ]
        )

        const viewLogin = View(
            {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }
            },[
                loginInfoText,
                View(
                    {
                        style:{
                            background:'#808080',
                            color: 'white',
                            width:'240px',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            borderRadius: '5px',

                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',

                            marginTop: '20px',
                            marginBottom: '6px',
                        }
                    },[
                        TextInput({
                            label: 'Username',
                            placeholder: 'NIP/NIK',
                            value:this.state.username,
                            onChange: (val)=>this.handleUsernameChange(val)
                        }),
                    ]
                ),
                View(
                    {
                        style:{
                            background:'#808080',
                            color: 'white',
                            width:'240px',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            borderRadius: '5px',

                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',

                            marginBottom: '8px',
                        }
                    },[
                        TextInput({
                            label: 'Password',
                            placeholder: 'Password',
                            onChange: (val)=>this.handlePasswordChange(val)
                        }),
                    ]
                ),
                Button({
                    label: 'Login',
                    style: {
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',

                        fontSize: '12px',
                        borderRadius: '8px',
                        width:'150px',
                        background: '#3944bc',
                        // background:'#00000000',
                        color: 'white',
                        borderWidth: 'thin',
                        borderColor: '#3944bc'
                    },
                    onClick: () => {
                        this.handleLogin()
                        // this.deleteTodoList(index)
                    },
                }),
            ]
        )

        const pageShow = (this.state.access_token)?viewProfile:viewLogin

        return View(
            {
                style: {
                    padding: '12px 20px',
                },
            },
            [
                pageShow
                // [
                //     loginInfoText,
                //     btnUsername,
                //     btnPassword,
                // ]
            ],
        )
    }
})