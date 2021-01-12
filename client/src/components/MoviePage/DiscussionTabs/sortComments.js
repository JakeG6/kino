const sortComments = (comments, order) => {

    let sortedComments;

    //sort comments by upvotes
    if (order === "patrician") {
        sortedComments = comments.sort((a, b) => {
        
            return b.points - a.points;
        })
    }

    //sort comments by downvotes
    if (order === "plebian") {
        sortedComments = comments.sort((a, b) => {
            return a.points - b.points;
        })
    }

    //sort comments by newest
    if (order === "newest") {
        sortedComments = comments.sort((a, b) => {
            let x = a.date.seconds, y = b.date.seconds
            
            if (x < y)
            return 1;

            if (x > y)
                return -1;
            return 0;
        })
    }

    //sort comments by oldest
    if (order === "oldest") {
        sortedComments = comments.sort((a, b) => {
            let x = a.date.seconds, y = b.date.seconds
            
            if (x > y)
                return 1;

            if (x < y)
                return -1;
            return 0;
        })
    }

    return sortedComments

}

export default sortComments;