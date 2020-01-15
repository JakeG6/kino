//add commas to movie's budget
const budgetCommas = (budget) => {
    return budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default budgetCommas