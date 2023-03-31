import { useState, useContext } from 'react'
import { userContext } from '../data/CommentsContext'
import Buttons from './Buttons'
import Form from './Form'
import Reply from './Reply'
import Likes from './Likes'
import Timestamp from 'react-timestamp'

function Comment({ dispatch, comment }) {

    // Destructured comment props
    const { id, user, content, replies, score, createdAt } = comment

    // image src
    const webpImg = user.image.webp

    const { username } = useContext(userContext)

    // Status tracks if currentUser is replying or editing to a comment
    const [status, setStatus] = useState('')

    return (
        <li onKeyDown={(e) => closeReply(e)}>
            <section className='grid bg-wht comment'>
                <Likes
                    score={score}
                    comment={comment}
                    dispatch={dispatch}
                />
                <div className='flex comment-user'>
                    <img src={webpImg} alt="" title={user.username} />
                    <p className='clr-db fw-bold'>{user.username}</p>
                    {user.username === username
                        ? <span className='bg-mb clr-wht'>you</span> : null}
                    <Timestamp relative
                        className='clr-gb'
                        date={createdAt}
                        autoUpdate />
                </div>
                <div>
                    <Buttons
                        user={user}
                        dispatch={dispatch}
                        id={id}
                        status={status}
                        setStatus={setStatus}
                        component='comment'
                    />
                </div>
                {status === 'edit'
                    ? <Form
                        dispatch={dispatch}
                        type={status}
                        setStatus={setStatus}
                        commentId={id}
                        comment={comment}
                    />
                    : <p className='clr-gb fw-lit comment-content'>{content}</p>
                }
            </section>
            {status === 'reply'
                ? <Form
                    dispatch={dispatch}
                    type={status}
                    setStatus={setStatus}
                    commentId={id}
                    comment={comment}
                /> : null
            }
            {replies.length > 0
                ? <ul className='repliesContainer'>
                    {replies.map(reply => {
                        return <Reply
                            reply={reply}
                            dispatch={dispatch}
                            commentId={id}
                            key={reply.id}
                        />
                    })}
                </ul> : null}
        </li >
    )

    function closeReply(e) {
        e.keyCode === 27 && status === 'reply' ? setStatus('') : null
    }
}

export default Comment
