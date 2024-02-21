import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import Form from '~/components/Form';
import { useState, useRef } from 'react';
import Button from '~/components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { verifyRegister } from '~/services/registerService';

const cx = classNames.bind(styles);

function VerifyRegister() {
    const [otp, setOtp] = useState('');
    const [isFocusedOtp, setIsFocusedOtp] = useState(false);

    const { email } = useParams();

    let history = useNavigate();

    const otpRef = useRef();

    //
    function handleVerifyOTP() {
        if (!/^\d*$/.test(otp)) {
            toast.error('you can only enter numbers');
            setOtp('');
            otpRef.current.focus();
            return;
        }

        const fetchApi = async () => {
            const res = await verifyRegister(email, otp);
            if (res.statusCodeUser === 201) {
                history('/login');
                toast.success(res.messageUser);
            } else {
                toast.error(res.data.message);
                setOtp('');
                otpRef.current.focus();
            }
        };
        fetchApi();
    }

    //xử lý nút enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleVerifyOTP();
        }
    };

    //focused
    function handleFocusOtp() {
        setIsFocusedOtp(true);
    }

    function handleBlurOtp() {
        setIsFocusedOtp(false);
    }
    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <Form title="OTP verification">
                <div className={cx('form-row')}>
                    <span className={cx('label')}>Otp:</span>
                    <input
                        ref={otpRef}
                        className={cx('intput', isFocusedOtp ? 'focused' : 'unfocused')}
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={otp}
                        onFocus={handleFocusOtp}
                        onBlur={handleBlurOtp}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <div className={cx('button')}>
                    <Button onClick={handleVerifyOTP} className={cx('button-send-otp')} primary>
                        Send OTP
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default VerifyRegister;
