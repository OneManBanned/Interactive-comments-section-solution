import { createContext } from "react"
import data from '../../data.json'

export default function CommentsReducer(comments, action) {

    switch (action.type) {
        case 'newComment':
            return [...comments, action.draft]
            break;
        case 'deleteComment':
            return comments.filter(comment => comment.id !== action.id)
            break;
        case 'replyComment':
            return comments.map(comment => {
                if (comment.id === action.id) {
                    return { ...comment, replies: [...comment.replies, action.reply] }
                } else { return comment }
            })
            break;
        case 'deleteReply':
            return comments.map(comment => {
                if (comment.id === action.commentId) {
                    return { ...comment, replies: comment.replies.filter(reply => reply.id !== action.replyId) }
                } else { return comment }
            })
            break;
        case 'editComment':
            return comments.map(comment => {
                if (comment.id === action.edit.id) {
                    return action.edit
                } else { return comment }
            })
            break;
        case 'editReply':
            return comments.map(comment => {
                if (comment.id === action.id) {
                    return {
                        ...comment,
                        replies: comment.replies
                            .map(reply => reply.id === action.edit.id
                                ? action.edit
                                : reply)
                    }
                } else { return comment }
            })
            break;
        case 'commentVote':
            return comments.map(comment => {
                if (comment.id === action.commentId) {
                    return { ...comment, score: action.score }
                } else { return comment }
            })
            break;
        case 'replyVote':
            return comments.map(comment => {
                if (comment.id === action.commentId) {
                    return {
                        ...comment, replies: comment.replies
                            .map(reply => reply.id === action.replyId
                                ? { ...reply, score: action.score }
                                : reply)
                    }
                } else { return comment }
            })
            break;
        default: return
    }
}

export const userContext = createContext(data.currentUser)
