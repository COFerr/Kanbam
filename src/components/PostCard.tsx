import styles from './PostForm.module.css'
import { useState } from 'react'
import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
import { FaTrash, FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa'
import { TbEdit } from 'react-icons/tb'
import { GiSave } from 'react-icons/gi'

type postCard = {
    id: string;
    title: string;
    content: string;
    status: 'toDo' | 'doing' | 'done';
}

type propsType = {
    card: postCard;
    handleOnClick: (newCard: postCard, oldCard: postCard, setCard: (newCard: postCard) => void, setBoolean: () => void) => void;
    deleteTask: (newCard: postCard) => void;
}


function PostCard(props: propsType): JSX.Element {
    const [isEditForm, setIsEditForm] = useState(false)
    const [card, setCard] = useState(props.card)
    const [updatedCard, setUpdatedCard] = useState(props.card)
    function shiftExibition(): void {
        setIsEditForm(!isEditForm)
    }

    function rightClick() {
        if (card.status === 'toDo') {
            updatedCard.status = 'doing'
            card.status = 'doing'
        }
        else if (card.status === 'doing') {
            updatedCard.status = 'done'
            card.status = 'done'
        }
        setCard(updatedCard)
        props.handleOnClick(updatedCard, card, setCard, () => true)
    }

    function leftClick() {
        if (card.status === 'done') {
            updatedCard.status = 'doing'
            card.status = 'doing'
        }
        else if (card.status === 'doing') {
            updatedCard.status = 'toDo'
            card.status = 'toDo'
        }
        setCard({ id: '', title: '', content: '', status: 'toDo' })
        props.handleOnClick(updatedCard, card, setCard, () => true)
    }
    return (
        <>
            {!isEditForm ?
                <div className={styles.card}>
                    <div className={styles.between}>
                        <span>{card.title}</span><p onClick={shiftExibition}><TbEdit color='#3A72F8'/></p>
                    </div>
                    <p>
                        {card.content}
                    </p>
                    <div className={styles.between}>
                        {card.status !== 'toDo' ? <p onClick={leftClick}><FaArrowCircleLeft fill="#3A72F8"/></p> : <div></div>}
                        <p onClick={() => props.deleteTask(card)}><FaTrash fill="#3A72F8"/></p>
                        {card.status !== 'done' ? <p onClick={rightClick}><FaArrowCircleRight fill="#3A72F8"/></p> : <div></div>}
                    </div>
                </div>
                : <div className={styles.card}>
                    <input type='text' name='title' id='name' value={updatedCard.title}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { setUpdatedCard({ ...updatedCard, [event.target.name]: event.target?.value }) }} /><br />
                    <textarea typeof='string' name="content" id='content' rows={5} value={updatedCard.content}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => { setUpdatedCard({ ...updatedCard, [event.target.name]: event.target?.value }) }} /><br />
                    <div className={styles.between}>
                        <button onClick={shiftExibition}><AiFillCloseCircle fill="red" /></button>
                        <button onClick={() => props.handleOnClick(updatedCard, card, setCard, shiftExibition)}><GiSave fill="#3A72F8" /></button>
                    </div>
                </div>
            }
        </>
    )
}

export default PostCard