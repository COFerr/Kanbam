import { ChangeEventHandler, ReactEventHandler, useState } from "react"
import styles from "./PostForm.module.css"
import { AiFillPlusCircle } from "react-icons/ai";
import PostCard from "./PostCard";

type postCard = {
    id:string;
    title: string;
    content: string;
    status: 'toDo' | 'doing' | 'done';
}

type props = {
    handleOnClick: (card: postCard, setState:(card:postCard)=>void) => void;
}

function PostForm({ handleOnClick }: props) {

    let initialCard:postCard = {id:'', title:'', content:'', status:'toDo'}
    const [card, setCard] = useState(initialCard)

    return (
        <div className={styles.card}>
            <input type='text' name='title' id='name' value={card.title}
             onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {setCard({...card, [event.target.name]: event.target?.value}) }} /><br/>
            <textarea name="content" id='content' rows={5} value={card.content}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => { setCard({...card, [event.target.name]:event.target?.value}) }} /><br/>
            <button onClick={() => handleOnClick(card, setCard)}><AiFillPlusCircle fill="#3A72F8"/></button>
        </div>
    )

}

export default PostForm