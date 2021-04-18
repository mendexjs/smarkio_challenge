module.exports = {
    environment: {
        database: {
            user: "root",
            password: "root",
            database_name: "matheus_smarkio_watson",
            host: "localhost",
            engine: "mysql",
            port: "3306"
        },
        ibm: {
            api_key: "YOUR_API_KEY_HERE",
            urls: {
                text_to_speech: "https://api.us-south.text-to-speech.watson.cloud.ibm.com"
            }
        }
    }
}
