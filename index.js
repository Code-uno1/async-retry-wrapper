// Example async function that sometimes fails
async function fetchData() {
    if (Math.random() < 0.7) {
        // 70% chance to fail
        throw new Error("Network error");
    }
    return "Data received";
}


function retry(fn, retries, delay) {
    return fn().catch(err => {
        if (retries <= 0) {
            throw err; // stop retrying
        }
        return new Promise(res => setTimeout(res, delay))
        .then(() => retry(fn, retries - 1, delay * 2));
    });
}

// Use the retry function
retry(fetchData, 3, 100)
.then(result => console.log("Success:", result))
.catch(err => console.error("Failed after retries:", err.message));