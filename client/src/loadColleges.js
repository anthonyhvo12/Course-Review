const loadColleges = async () => {
    try {
        const colleges = await fetch('http://localhost:9000/colleges',
        {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        })
        return await colleges.json()
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = loadColleges
