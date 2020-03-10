export function getStarsFromVotes(votes) {
    const sum = votes.reduce((a, b) => {
        return a + b;
    }, 0);

    return sum > 0 ? Math.round(sum / votes.length) : 0;
}