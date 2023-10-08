import { gettext } from 'i18n'

AppSettingsPage({
    state: {
        username: '',
        password: '',
        access_token: '',
        props: {},
    },
    setState(props) {
        this.state.props = props
        this.state.access_token = 'TOKEN'
        // this.state.access_token = props.settingsStorage.getItem('access_token')
    },
    handleLogout(){
        // props.settingsStorage.setItem('access_token', null)
        this.state.access_token = ''
    },
    build(props) {
        this.setState(props)
        const btnUsername = View(
            {
                style: {
                    fontSize: '12px',
                    lineHeight: '30px',
                    borderRadius: '30px',
                    background: '#409EFF',
                    color: 'white',
                    textAlign: 'center',
                    padding: '0 15px',
                    width: '30%',
                },
            },
            [
                TextInput({
                    label: 'Username',
                    onChange: (val) => {
                        // this.addTodoList(val)
                    },
                }),
            ],
        )
        const btnPassword = View(
            {
                style: {
                    fontSize: '12px',
                    lineHeight: '30px',
                    borderRadius: '30px',
                    background: '#409EFF',
                    color: 'white',
                    textAlign: 'center',
                    padding: '0 15px',
                    width: '30%',
                },
            },
            [
                TextInput({
                    label: 'Password',
                    onChange: (val) => {
                        // this.addTodoList(val)
                    },
                }),
            ],
        )

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

                        height: 'auto',
                        width: '100px',
                        borderRadius: '50%',
                        marginBottom:'15px',
                    },
                    src: 'http://devpresensi.bukittinggikota.go.id/storage/foto-profil/1375030604950001_profil_.gif'
                }),
                Text({
                    style:{
                        
                    },
                    align: 'center',
                    bold:'true',
                },'Harlan Setia Rahendra'),
                Text({
                    style:{

                    },
                    align: 'center'
                },'harlan.setia@gmail.com'),
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

        const pageShow = (this.state.access_token)?viewProfile:loginInfoText

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