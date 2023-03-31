import { useContext } from "react"
import { userContext } from '../data/CommentsContext'
import uuid from "react-uuid"

function Form({ dispatch, type, setStatus, commentId, comment, reply }) {

    const currentUser = useContext(userContext)

    const editDraft = comment ? comment : reply

    const commentDraft = {
        id: uuid(),
        content: '',
        createdAt: '',
        score: 0,
        user: currentUser,
        replies: []
    }

    let replyDraft = {
        id: uuid(),
        content: "",
        createdAt: '',
        score: 0,
        replyingTo: "maxblagun",
        user: currentUser
    }

    switch (type) {
        case 'comment':
            return (
                <form
                    className="bg-wht comment-form"
                    onSubmit={(e) => handleAddComment(e)}
                    noValidate>
                    <label htmlFor="addComment"></label>
                    <textarea
                        aria-label="Add a comment"
                        placeholder="Add a comment..."
                        className="clr-db"
                        name='addComment'
                        onChange={(e) => handleChange(e, type)}
                        type="text"
                        required
                    />
                    <img src={currentUser.image.png} alt="" />
                    <button className="bg-mb clr-wht uppercase fw-med">Send</button>
                </form>
            )
            break;
        case 'reply':
            return (
                <form
                    className="bg-wht comment-form"
                    onSubmit={(e) => handleReplyComment(e)}
                    noValidate>
                    <label htmlFor="addReply"></label>
                    <textarea
                        aria-label="Add a reply"
                        placeholder="Add a reply..."
                        autoFocus
                        className="clr-db"
                        name='addReply'
                        type='text'
                        onChange={(e) => handleChange(e, type)}
                        required>
                    </textarea>
                    <img src={currentUser.image.png} alt="" />
                    <button className="bg-mb clr-wht uppercase fw-med">Reply</button>
                </form>
            )
            break;
        case 'edit':
            return (
                <form
                    className="bg-wht comment-form comment-form__edit"
                    onSubmit={(e) => handleEditReply(e)}
                    noValidate>
                    <label htmlFor="edit"></label>
                    <textarea
                        autoFocus
                        className="clr-db"
                        name='edit'
                        type='text'
                        onChange={(e) => handleChange(e, 'editing')}
                        defaultValue={editDraft.content}
                        required
                    ></textarea>
                    <button className="bg-mb clr-wht uppercase fw-med">Update</button>
                </form>
            )
            break;
        default:
            return
    }

    // Functions for adding - for delete see Buttons
    function handleAddComment(e) {
        e.preventDefault()
        while (commentDraft.content === '') { return }
        e.target.children[1].value = ''
        commentDraft.createdAt = new Date
        return dispatch({
            type: 'newComment',
            draft: commentDraft
        })
    }

    function handleReplyComment(e) {
        e.preventDefault()
        while (replyDraft.content === '') { return }
        setStatus('')
        replyDraft.createdAt = new Date
        return dispatch({
            type: 'replyComment',
            id: commentId,
            reply: replyDraft
        })
    }

    function handleChange(e, action) {
        switch (action) {
            case 'comment':
                commentDraft.content = e.target.value
                break;
            case 'reply':
                replyDraft.content = e.target.value
                break;
            case 'editing':
                editDraft.content = e.target.value
                break;
            default:
                return
        }
    }


    function handleEditReply(e) {
        e.preventDefault()
        setStatus('')
        editDraft.createdAt = new Date
        if (editDraft.replies) {
            return dispatch({
                type: 'editReply',
                id: commentId,
                edit: editDraft.content
            })
        } else {
            return dispatch({
                type: 'editComment',
                edit: editDraft.content
            })
        }
    }

}

export default Form
