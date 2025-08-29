export function getApiHeaders() {
    const token = localStorage.getItem("hey-token");
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
    };
}
