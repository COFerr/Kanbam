import styles from './Column.module.css'


type props = {
    children: JSX.Element;
}

function InputColumn(props: props): JSX.Element {
    
    return (
        <div className={styles.column}>
            <h2>Novo</h2>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default InputColumn