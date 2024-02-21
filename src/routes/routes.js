import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Message from '~/pages/Message';
import Login from '~/pages/Login';
import Register, { VerifyRegister } from '~/pages/Register';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search },
    { path: config.routes.message, component: Message, layout: HeaderOnly },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.verifyRegister, component: VerifyRegister, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
