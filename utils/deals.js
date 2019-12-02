export const calculateScoreAndSortDesc = (deals) => {
    const dealsWithScore = deals.map((deal) => ({
        ...deal,
        score: deal.userDeals.reduce((acc, deal) => acc + (deal.upvoted ? 1 : -1), 0)
    }));

    return dealsWithScore.sort((a, b) => (a.score < b.score ? 1 : -1));
};
