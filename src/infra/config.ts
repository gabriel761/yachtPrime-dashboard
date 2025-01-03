
if (!process.env.FIREBASE_CREDENTIALS) {
    throw new Error('FIREBASE_CREDENTIALS is not defined in the environment variables.');
}

if (!process.env.BACKEND_URL) {
    throw new Error('BACKEND_URL is not defined in the environment variables.');
}

const config = {
    firebaseCredentials: JSON.parse(process.env.FIREBASE_CREDENTIALS ),
    backendUrl: process.env.BACKEND_URL
}

export default config