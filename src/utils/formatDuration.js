export const formatTrackDuration = (duration) => {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}
export const formatTotalDuration = (duration) => {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    return ` ${hours ? hours == 1 ? '1hr' : ` ${hours}hrs` : ''}  ${minutes == 1 ? '1min' : `${minutes} mins`} `
}
export const formatPeriod = (date) => {
    const now = new Date();
    const otherDate = new Date(date);
    const diffTime = Math.abs(now - otherDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays / 30);
    return years ? `${years} ${years == 1 ? 'year' : 'years'} ago` : months ? `${months} ${months == 1 ? 'month' : 'months'} ago` : `${diffDays} days ago`
}