import { useReducer, useContext, useMemo, useEffect } from 'react'
import commentsReducer from './data/CommentsContext'
import { userContext } from './data/CommentsContext'
import Form from './components/Form'
import Comment from './components/Comment'
import data from '../data.json'
import '../dist/css/app.css'

let storedData = localStorage.getItem('myData')
let usedData = storedData ? JSON.parse(storedData) : data.comments

function App() {

  const [comments, dispatch] = useReducer(commentsReducer, usedData)

  const user = useContext(userContext)

  useMemo(() => {
    comments.sort((a, b) => b.score - a.score)
  }, [comments])

  useEffect(() => {
    localStorage.setItem('myData', JSON.stringify(comments))
  }, [comments])

  return (
    <userContext.Provider value={user}>
      <main>
        <ul className='commentsContainer'>
          {comments.map(comment => {
            return <Comment
              key={comment.id}
              comment={comment}
              dispatch={dispatch}
            />
          })}
        </ul>
        <Form
          dispatch={dispatch}
          type='comment'
        />
      </main>
    </ userContext.Provider>
  )
}

export default App

