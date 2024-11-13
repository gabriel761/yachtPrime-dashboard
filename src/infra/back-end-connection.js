const env = process.env.NODE_ENV
let baseUrl = ''
if (env == "development") {
    baseUrl = 'http://localhost:5000'
}
else if (env == "production") {
    baseUrl = ''
}

export default baseUrl