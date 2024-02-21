import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import Form from '~/components/Form';
import Button from '~/components/Button';
import { useState, useRef } from 'react';
import { login } from '~/services/loginService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusePassword, setIsFocusedPassword] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    let history = useNavigate();

    //onclick login
    function handleLogin() {
        if (!email && !password) {
            emailRef.current.focus();
            toast.error('You must enter your email and password');
            return;
        }
        if (!email) {
            switch ('') {
                case email:
                    emailRef.current.focus();
                    toast.error('You must fill in your email');
                    break;
                case password:
                    passwordRef.current.focus();
                    toast.error('You must fill in your password');
                    break;
                default:
                    break;
            }
            return;
        }
        const fetchApi = async () => {
            const res = await login(email, password);
            if (res.statusCode === 200) {
                history('/');
                window.location.reload();
                toast.success(res.message);
            } else {
                toast.error(res.message);
                setPassword('');
                passwordRef.current.focus();
            }
        };
        fetchApi();
    }

    //xử lý nút enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            switch (event.target.name) {
                case 'email':
                    if (!email.trim()) {
                        emailRef.current.focus();
                        toast.error('you need to enter data');
                        break;
                    }
                    passwordRef.current.focus();
                    break;
                case 'password':
                    handleLogin();
                    break;
                default:
                    break;
            }
        }
    };

    //focused
    function handleFocusEmail() {
        setIsFocusedEmail(true);
    }

    function handleBlurEmail() {
        setIsFocusedEmail(false);
    }

    function handleFocusPassword() {
        setIsFocusedPassword(true);
    }

    function handleBlurPassword() {
        setIsFocusedPassword(false);
    }
    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <Form title="Login">
                <div className={cx('form-row')}>
                    <span className={cx('label')}>Email:</span>
                    <input
                        ref={emailRef}
                        className={cx('intput', isFocusedEmail ? 'focused' : 'unfocused')}
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onFocus={handleFocusEmail}
                        onBlur={handleBlurEmail}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('form-row')}>
                    <span className={cx('label')}>Password:</span>
                    <input
                        ref={passwordRef}
                        className={cx('intput', isFocusePassword ? 'focused' : 'unfocused')}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onFocus={handleFocusPassword}
                        onBlur={handleBlurPassword}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={cx('button')}>
                    <Button onClick={handleLogin} className={cx('button-login')} primary>
                        Login
                    </Button>
                    <div className={cx('form-footer')}>
                        <Button to={'/register'} className={cx('button-register')} outline>
                            Register
                        </Button>
                        <Button className={cx('button-register')} outline>
                            Forgot password?
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Login;
