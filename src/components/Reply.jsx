import { useState, useContext } from "react"
import { userContext } from "../data/CommentsContext"
import { closeReply } from "../components/Comment"
import Likes from "./Likes"
import Buttons from "./Buttons"
import Form from './Form'
import Timestamp from 'react-timestamp'

function Reply({ dispatch, reply, commentId }) {

    // Destructured reply props
    const { id, user, content, score, createdAt, replyingTo } = reply

    // image src
    const webpImg = user.image.webp

    const { username } = useContext(userContext)

    // Status tracks if currentUser is replying or editing to a reply
    const [status, setStatus] = useState('')

    return (
        <li onKeyDown={(e) => closeReply(e)}>
            <section className="grid bg-wht comment">
                <Likes
                    score={score}
                    commentId={commentId}
                    reply={reply}
                    dispatch={dispatch}
                />
                <div className="flex comment-user">
                    <img title={user.username} src={webpImg} alt="" />
                    <p className='clr-db fw-bold'>{user.username}</p>
                    {user.username === username
                        ? <span className="bg-mb clr-wht fw-med">you</span> : null}
                    <Timestamp
                        relative
                        className='clr-gb'
                        date={createdAt}
                        autoUpdate />
                </div>
                <div>
                    <Buttons
                        id={id}
                        user={user}
                        status={status}
                        setStatus={setStatus}
                        commentId={commentId}
                        dispatch={dispatch}
                        component='reply'
                    />
                </div>
                {status === 'edit'
                    ? <Form
                        type={status}
                        commentId={commentId}
                        dispatch={dispatch}
                        setStatus={setStatus}
                        reply={reply}
                    />
                    : <p className='clr-gb fw-lit comment-content'>
                        <strong className="clr-mb fw-bold">
                            @{replyingTo}
                        </strong> {content}</p>
                }
            </section>
            {status === 'reply'
                ? <Form
                    type={status}
                    commentId={commentId}
                    dispatch={dispatch}
                    setStatus={setStatus}
                    reply={reply}
                />
                : null
            }
        </li >
    )

    function closeReply(e) {
        e.keyCode === 27 && status === 'reply' ? setStatus('') : null
    }
}

export default Reply
