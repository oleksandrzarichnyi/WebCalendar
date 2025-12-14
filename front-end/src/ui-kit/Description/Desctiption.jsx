import styles from './Description.module.scss'

export default function Description({ title, text, maxWidth, width, type }) {
  return (
    <>
      <div 
        className={styles['container']}
        style={{maxWidth: maxWidth, width: width}}
      >
        <h2 className={styles['title']}>
          {title}
        </h2>
        {type === 'static' ? 
          <p className={styles['text']}>
            {text}
          </p>
        : 
          <textarea className={styles['textarea']} ></textarea>
        }
        <div className={styles['underline']}></div>
      </div> 
    </>
  )
}