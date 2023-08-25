const hoursAgo = (pastTimestamp) => {
    const currentTimeStamp = new Date().getTime()
    const diff = currentTimeStamp - pastTimestamp;
    const hourspast = Math.floor(diff / 1000 / 60 / 60);
    return hourspast;
}
export { hoursAgo }