import styles from './Description.module.scss'

export default function Description({ title, text, maxWidth }) {
  return (
    <>
      <div 
        className={styles['container']}
        style={{maxWidth: maxWidth}}
      >
        <h2 className={styles['title']}>
          {title}
        </h2>
        <p className={styles['text']}>
          {text}
        </p>
        <div className={styles['underline']}></div>
      </div> 
    </>
  )
}