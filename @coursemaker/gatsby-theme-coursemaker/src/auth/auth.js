import auth0 from 'auth0-js';
import { navigate } from 'gatsby';
import jwtDecode from 'jwt-decode';

const isBrowser = typeof window !== 'undefined';

const auth = isBrowser
    ? new auth0.WebAuth({
        domain: process.env.GATSBY_AUTH0_DOMAIN || '',
        clientID: process.env.GATSBY_AUTH0_CLIENTID || '',
        redirectUri: process.env.GATSBY_AUTH0_CALLBACK || '',
        responseType: 'token id_token',
        scope: 'openid profile email',
    })
    : {};

// insert after auth const
const tokens = {
    accessToken: false,
    idToken: false,
    expiresAt: false,
};

export const login = () => {
    if (!isBrowser) return;
    auth.authorize();
};

const setSession = (cb = () => {}) => (err, authResult) => {
    if (err) {
        navigate('/');
        cb();
        return;
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
        const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        tokens.accessToken = authResult.accessToken;
        tokens.idToken = authResult.idToken;
        tokens.expiresAt = expiresAt;
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/account');
        cb();
    }
};

export const handleAuthentication = () => {
    if (!isBrowser) return;
    auth.parseHash(setSession());
};

export const silentAuth = (callback) => {
    if (!isAuthenticated()) return callback();
    auth.checkSession({}, setSession(callback));
};

export const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    auth.logout();
};

export const isAuthenticated = () => {
    if (!isBrowser) {
        return;
    }

    if (process.env.GATSBY_ENABLE_AUTH !== 'true') {
        return true;
    }

    return localStorage.getItem('user') !== null;
};

export const coursesFromJWT = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
        const token = JSON.parse(tokenString);
        const decodedAccessToken = jwtDecode(token.access_token);
        return decodedAccessToken.courses;
    }
};

export const isAuthorized = (courseID) => {
    if (!isBrowser) return;

    if (!process.env.GATSBY_ENABLE_AUTH !== 'true') {
        return true;
    }

    if (!isAuthenticated()) {
        navigate('/login');
    }

    const allowedCourses = coursesFromJWT();
    if (allowedCourses.includes(parseInt(courseID))) {
        return true;
    }
};
