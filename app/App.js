function Form() {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        pswCheck: '',
        newsLetter: false
    });

    const [status, setStatus] = React.useState({
        error: '',
        news: ''
    });

    function inputsHandler(event) {
        const {type, name, value, checked} = event.target;
        setData(prevData => {
            return {
                ...prevData,
                [name]: (type === 'checkbox') ? checked : value
            }
        });
    }

    function updateStatus(string, success) {
        setStatus(prevStatus => {
            return {
                ...prevStatus,
                error: string,
                news: (success === 1 && data.newsLetter)
                    ? 'Thanks for signin up for our news letter!'
                    : ''
            };
        });
    }

    function sendData(event) {
        event.preventDefault();
        if (data.password === '' || data.pswCheck === '') {
            console.log('Password fields are not allowed to be empty!');
            updateStatus('Password fields are not allowed to be empty!', 0);
        }
        else {
            if (data.password.length > 7 && data.pswCheck.length > 7) {
                if (data.password === data.pswCheck) {
                    if (data.email !== '') {
                        console.log('Succesfully signed up!');
                        updateStatus('Succesfully signed up!', 1);
                        if (data.newsLetter) console.log('Thanks for signin up for our news letter!');
                    }
                    else {
                        console.log('Error! You must insert a valid email!');
                        updateStatus('Error! You must insert a valid email!', 0);
                    }
                }
                else {
                    console.log('Error! Passwords does not match.');
                    updateStatus('Error! Passwords does not match.', 0);
                }
            }
            else {
                console.log('Password length must be at least 8 characters!');
                updateStatus('Password length must be at least 8 characters!', 0);
            } 

        }
        console.log(data);
    }

    return(
        <form
            className='form'
            onSubmit={sendData}
        >
            <input
                className='input'
                type='email'
                placeholder='Insert email'
                name='email'
                value={data.email}
                onChange={inputsHandler}
            />
            <input
                className='input'
                type='password'
                placeholder='Insert password'
                name='password'
                value={data.password}
                onChange={inputsHandler}
            />
            <input
                className='input'
                type='password'
                placeholder='Confirm password'
                name='pswCheck'
                value={data.pswCheck}
                onChange={inputsHandler}
            />
            <div className='checkbox-container'>
                <input
                    id='newsLetter'
                    type='checkbox'
                    name='newsLetter'
                    checked={data.newsLetter}
                    onChange={inputsHandler}
                />
                <label htmlFor='newsLetter'>Join the News Letter</label>
            </div>
            <div className='status'>
                <span>{status.error}</span>
                <span>{status.news}</span>
            </div>
            <button className='submit-button'>Sign up</button>
        </form>
    );
}

function Main() {
    return (
        <div className='form-container'>
            <Form />
        </div>
    );
}

function App() {
    return (
        <div className='main'>
            <Main />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));