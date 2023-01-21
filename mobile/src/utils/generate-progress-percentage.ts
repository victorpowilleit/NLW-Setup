export function generateProgressPercentage(total: number, completed: number) {
    const percentage = total>0?Math.floor((completed / total) * 100):0
    return percentage
}