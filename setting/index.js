import { gettext } from 'i18n'

AppSettingsPage({
    state: {
        username: '',
        password: '',
        props: {},
    },
    build(props) {
        // this.setState(props)
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

        return View(
            {
                style: {
                    padding: '12px 20px',
                },
            },
            [
                loginInfoText,
                btnUsername,
                btnPassword,
                // contentItems.length > 0 &&
                // View(
                //     {
                //     style: {
                //         marginTop: '12px',
                //         padding: '10px',
                //         border: '1px solid #eaeaea',
                //         borderRadius: '6px',
                //         backgroundColor: 'white',
                //     },
                //     },
                //     [...contentItems],
                // ),
            ],
        )
    }
})