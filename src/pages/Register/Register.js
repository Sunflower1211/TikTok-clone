import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import Form from '~/components/Form';
import { useState, useRef } from 'react';
import Button from '~/components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { register } from '~/services/registerService';

const cx = classNames.bind(styles);

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [account, setAccount] = useState('');
    const [nickName, setNickname] = useState('');
    // const [sex, setSex] = useState('');
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusePassword, setIsFocusedPassword] = useState(false);
    const [isFocuseConfirmPassword, setIsFocusedConfirmPassword] = useState(false);
    const [isFocusedAccount, setIsFocusedAccount] = useState(false);
    const [isFocusedNickName, setIsFocusedNickName] = useState(false);
    const [checked, setChecked] = useState('other');

    let history = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const accountRef = useRef();
    const nickNameRef = useRef();

    //api
    function handleRegister() {
        if (!email && !password && !confirmPassword && !account && !nickName) {
            emailRef.current.focus();
            toast.error('You need to enter all information to register');
            return;
        }
        if (!email || !password || !confirmPassword || !account || !nickName) {
            switch ('') {
                case email:
                    emailRef.current.focus();
                    toast.error('you need to enter data for email');
                    break;
                case password:
                    passwordRef.current.focus();
                    toast.error('you need to enter data for password');
                    break;
                case confirmPassword:
                    confirmPasswordRef.current.focus();
                    toast.error('you need to enter data for confirm password');
                    break;
                case account:
                    accountRef.current.focus();
                    toast.error('you need to enter data for account');
                    break;
                case nickName:
                    nickNameRef.current.focus();
                    toast.error('you need to enter data for nick name');
                    break;
                default:
                    break;
            }
            return;
        }

        if (password.length < 8) {
            confirmPasswordRef.current.focus();
            toast.error('Password must be longer than 8 characters');
            setPassword('');
            return;
        }

        if (password !== confirmPassword) {
            confirmPasswordRef.current.focus();
            toast.error('you need to enter data for confirm password');
            setConfirmPassword('');
            return;
        }

        const fetchApi = async () => {
            const res = await register(email, password, account, nickName, checked);
            if (res.statusCode === 201) {
                history(`/verifyRegister/${email}`);
                toast.success(res.message);
            } else {
                toast.error(res.data.message);
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
                    if (!password.trim()) {
                        passwordRef.current.focus();
                        toast.error('you need to enter data');
                        break;
                    }
                    confirmPasswordRef.current.focus();
                    break;
                case 'confirm-password':
                    if (!confirmPassword.trim()) {
                        confirmPasswordRef.current.focus();
                        toast.error('you need to enter data');
                        break;
                    }
                    accountRef.current.focus();
                    break;
                case 'account':
                    if (!confirmPassword.trim()) {
                        accountRef.current.focus();
                        toast.error('you need to enter data');
                        break;
                    }
                    nickNameRef.current.focus();
                    break;
                case 'nick-name':
                    handleRegister();
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
    function handleFocusConfirmPassword() {
        setIsFocusedConfirmPassword(true);
    }

    function handleBlurConfirmPassword() {
        setIsFocusedConfirmPassword(false);
    }
    function handleFocusAccount() {
        setIsFocusedAccount(true);
    }

    function handleBlurAccount() {
        setIsFocusedAccount(false);
    }
    function handleFocusNickName() {
        setIsFocusedNickName(true);
    }

    function handleBlurNickName() {
        setIsFocusedNickName(false);
    }

    //
    const sex = [
        {
            id: 1,
            name: 'male',
        },
        {
            id: 2,
            name: 'female',
        },
        {
            id: 3,
            name: 'other',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <Form title="Register">
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
                        placeholder="Password"
                        name="password"
                        value={password}
                        onFocus={handleFocusPassword}
                        onBlur={handleBlurPassword}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={cx('form-row')}>
                    <span className={cx('label')}>Confirm Password:</span>
                    <input
                        ref={confirmPasswordRef}
                        className={cx('intput', isFocuseConfirmPassword ? 'focused' : 'unfocused')}
                        type="password"
                        placeholder="confirm-password"
                        name="confirm-password"
                        value={confirmPassword}
                        onFocus={handleFocusConfirmPassword}
                        onBlur={handleBlurConfirmPassword}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className={cx('form-row')}>
                    <span className={cx('label')}>Account:</span>
                    <input
                        ref={accountRef}
                        className={cx('intput', isFocusedAccount ? 'focused' : 'unfocused')}
                        type="text"
                        placeholder="Account"
                        value={account}
                        name="account"
                        onFocus={handleFocusAccount}
                        onBlur={handleBlurAccount}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setAccount(e.target.value)}
                    />
                </div>
                <div className={cx('form-row')}>
                    <span className={cx('label')}>Nick Name:</span>
                    <input
                        ref={nickNameRef}
                        className={cx('intput', isFocusedNickName ? 'focused' : 'unfocused')}
                        type="text"
                        placeholder="nick-name"
                        value={nickName}
                        name="nick-name"
                        onFocus={handleFocusNickName}
                        onBlur={handleBlurNickName}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div>
                    {sex.map((sex) => (
                        <div className={cx('sex')} key={sex.id}>
                            <input
                                onChange={() => setChecked(sex.name)}
                                checked={checked === sex.name}
                                className={cx('ip-sex')}
                                type="radio"
                            />
                            <span className={cx('span-sex')}>{sex.name}</span>
                        </div>
                    ))}
                </div>
                <div className={cx('button')}>
                    <Button onClick={handleRegister} className={cx('button-register')} primary>
                        Register
                    </Button>
                    <div className={cx('form-footer')}>
                        <Button to={'/login'} className={cx('button-login')} outline>
                            Login
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Register;
