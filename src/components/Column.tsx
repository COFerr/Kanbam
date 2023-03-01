import styles from './Column.module.css'
import PostCard from './PostCard';
import {useState} from 'react'


type postCard = {
    id: string;
    title: string;
    content: string;
    status: 'toDo' | 'doing' | 'done';
}

type propsType = {
    title: string;
    children: postCard[];
    status: string;
    handleOnClick: (newCard: postCard, oldCard:postCard, setCard: (newCard:postCard) => void, setBoolean:()=>void) => void;
    deleteTask: (newCard: postCard) => void;
}

function Column(props: propsType): JSX.Element {

    function isRightPlace(): postCard[] {
        let isMyPlace = props.children.filter((task) => {
            return (task.status === props.status)
        })
        return isMyPlace;
    }

    return (
        <div className={styles.column}>
            <h2>{props.title}</h2>
            <div>
                {isRightPlace().map((task, id) => (
                    <PostCard card={task} handleOnClick={props.handleOnClick} key={task.id} deleteTask={props.deleteTask}/>
                ))}
            </div>
        </div>
    )
}

export default Column